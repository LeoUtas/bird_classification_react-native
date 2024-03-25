import React, { useState, useEffect } from "react";
import { View, StatusBar, Image, Pressable, Modal, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

import BackgroundImage from "../../assets/BackgroundImage.png";
import HeaderPanel from "../components/HeaderPanel";
import RegularButton from "../components/RegularButton";
import { fetchExamplesFromFirebase } from "../components/utils/fetchExamplesFromFirebase";
import { ExampleFrameStyle } from "../styles/Styles";

export default function ExampleScreen() {
    const navigation = useNavigation();
    const [images, setImages] = useState([]);
    const [fullscreenImage, setFullscreenImage] = useState(null);

    useEffect(() => {
        const loadExamples = async () => {
            const urls = await fetchExamplesFromFirebase("Examples");
            setImages(urls);
        };

        loadExamples();
    }, []);

    const downloadExamples = async (imageUrl, imageName) => {
        try {
            const { permission } = await MediaLibrary.requestPermissionsAsync();

            if (permission !== "granted") {
                Alert.alert("Permission needed");
                return;
            }

            const imageUri = FileSystem.cacheDirectory + imageName;
            console.log("start downloading");

            const downloadExample = FileSystem.createDownloadResumable(
                imageUrl,
                imageUri,
                {},
                false
            );

            const { downloadedUri } = await downloadExample.downloadAsync(
                null,
                { shouldCache: false }
            );
            console.log("finish downloading: ", downloadedUri);

            const asset = await MediaLibrary.createAssetAsync(downloadedUri);
            console.log("asset created at ", asset);
        } catch (error) {
            console.error("Error in downloadExamples(): ", error);
        }
    };

    const onImagePress = (imageUrl) => {
        setFullscreenImage(imageUrl);
    };

    // Function to close fullscreen view
    const closeFullscreen = () => {
        setFullscreenImage(null);
    };

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <View style={{ marginTop: 120 }}>
                <HeaderPanel text={"Example photos"} />
            </View>

            <View style={{ ...ExampleFrameStyle, marginTop: 50 }}>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}
                >
                    {images.map((url, index) => (
                        <Pressable
                            key={index}
                            onPress={() => onImagePress(url)}
                            style={{ width: 124.5 }}
                        >
                            <Image
                                source={{ uri: url }}
                                style={{
                                    width: "100%",
                                    height: 124.5,
                                }}
                            />
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* Fullscreen Modal for Image */}
            <Modal
                visible={!!fullscreenImage}
                transparent={true}
                onRequestClose={closeFullscreen}
            >
                <Pressable
                    onPress={closeFullscreen}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(43, 58, 0, .5)",
                    }}
                >
                    <Image
                        source={{ uri: fullscreenImage }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                    />
                </Pressable>
            </Modal>

            <View
                style={{
                    position: "absolute",
                    bottom: 40,
                    alignSelf: "center",
                }}
            >
                <Pressable
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.2 : 1,
                    })}
                >
                    <RegularButton text={"Home"} width={100} />
                </Pressable>
            </View>
        </View>
    );
}
