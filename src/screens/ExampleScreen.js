import React, { useState, useEffect } from "react";
import { View, StatusBar, Image, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

import BackgroundImage from "../../assets/BackgroundImage.png";
import HeaderPanel from "../components/HeaderPanel";
import RegularButton from "../components/RegularButton";
import { fetchExamplesFromFirebase } from "../apis/fetchExamplesFromFirebase";
import { ExampleFrameStyle } from "../styles/Styles";

export default function ExampleScreen() {
    const navigation = useNavigation();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadExamples = async () => {
            const urls = await fetchExamplesFromFirebase("Examples");
            setImages(urls);
        };

        loadExamples();
    }, []);

    const downloadExample = async (imageUrl) => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();

            if (status !== "granted") {
                Alert.alert(
                    "Permission needed",
                    "Please grant permission to save the image."
                );
                return;
            }

            const fileName = imageUrl.split("/").pop();
            const fileUri = FileSystem.documentDirectory + fileName;

            const downloadResumable = FileSystem.createDownloadResumable(
                imageUrl,
                fileUri,
                {},
                null
            );

            const { uri } = await downloadResumable.downloadAsync();
            // console.log("Finished downloading to ", uri);

            // by convention the uri is saved like
            // file:/// ... Documents/Examples%2F012.jpeg?alt=media&tok ... 9130-eb2662b
            // we need to cut off the part after the ? to avoid a misleading error alert
            const asset = await MediaLibrary.createAssetAsync(
                uri.split("?")[0]
            );
            await MediaLibrary.createAlbumAsync("Camera Roll", asset, true);

            Alert.alert(
                "Download complete",
                "The example image has been saved to your gallery.",
                "You can start testing the app using the example image."
            );
        } catch (error) {
            console.error("Error downloading image: ", error);
        }
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
                            onPress={() => downloadExample(url)}
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
