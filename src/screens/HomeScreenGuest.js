import { View, Text, Image, StatusBar, Pressable } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import BackgroundImage from "../../assets/BackgroundImage.png";
import HeaderPanel from "../components/HeaderPanel";
import ImageFrame from "../components/ImageFrame";
import ToSignInButton from "../auth/ToSignInButton";
import RegularButton from "../components/RegularButton";
import HelloUser from "../auth/HelloUser";
import MainButton from "../components/MainButton";
import BirdInfoCard from "../components/BirdInfoCard";
import fetchImageToServer from "../components/utils/fetchImageToServer";
import { useBirdInfo } from "../components/context/BirdInfoContext";
import { TextStyles } from "../styles/FontStyles";

export default function HomeScreenGuest() {
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [imageUri, setImageUri] = useState("");
    const { setBirdInfo } = useBirdInfo();

    const handlePickAnImage = async () => {
        let response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        const imageID = uuid.v4();

        if (!response.canceled) {
            setImageUri(response.assets[0].uri);
            const birdInfoData = await fetchImageToServer(
                response.assets[0].uri
            );
            if (birdInfoData) {
                setBirdInfo({
                    ...birdInfoData,
                    imageUri: response.assets[0].uri,
                    ID: imageID,
                    userUid: "Guest",
                });
            }
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        await handlePickAnImage();
        setIsLoading(false);
    };

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />
            <View
                style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    marginTop: 40,
                    marginRight: 10,
                }}
            >
                <Pressable
                    onPress={() => {
                        navigation.navigate("SpeciesList");
                    }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.2 : 1,
                    })}
                >
                    <RegularButton text={"Species"} width={100} />
                </Pressable>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Examples");
                    }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.2 : 1,
                    })}
                >
                    <RegularButton text={"Examples"} width={100} />
                </Pressable>
            </View>

            <View>
                <HelloUser userName={null} />
            </View>

            <View style={{ marginTop: 25 }}>
                <HeaderPanel text={"Bird Classification"} />
            </View>

            <View
                style={{
                    marginTop: 48,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <ImageFrame isLoading={isLoading} />

                <View
                    style={{
                        position: "absolute",
                        top: "87.5%",
                        left: "61.5%",
                    }}
                >
                    <Pressable
                        onPress={handleSubmit}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                        })}
                    >
                        <MainButton text={"Select"} />
                    </Pressable>
                </View>
            </View>

            <BirdInfoCard isLoading={isLoading} />

            {/* To SignIn Button */}
            <View
                style={{
                    position: "absolute",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 20,
                    bottom: 40,
                }}
            >
                <Text style={TextStyles.RegularText}>
                    Consider sign in to use collection
                </Text>
                <View style={{ paddingLeft: 10 }}>
                    <ToSignInButton text={"to Sign In"} />
                </View>
            </View>
        </View>
    );
}
