import { View, StatusBar, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { Circle } from "react-native-animated-spinkit";
import { Ionicons } from "@expo/vector-icons";

import BackgroundImage from "../../assets/BackgroundImage.png";
import HeaderPanel from "../components/HeaderPanel";
import ImageFrame from "../components/ImageFrame";
import MainButton from "../components/MainButton";
import RegularButton from "../components/RegularButton";
import HelloUser from "../auth/HelloUser";
import BirdInfoCard from "../components/BirdInfoCard";
import { auth } from "../../Firebase/firebase";
import AddCollectionButton from "../components/AddCollectionButton";
import fetchImageToServer from "../components/utils/fetchImageToServer";
import fetchSpeciesToServer from "../components/utils/fetchSpeciesToServer";
import { useBirdInfo } from "../components/context/BirdInfoContext";

export default function HomeScreen() {
    const navigation = useNavigation();

    // Code to handle the Select/Submit Button:
    // 1) Make use of auth;
    // 2) Pick an image;
    // 3) fetch the Image to server to use as the input of classification model

    // const [userName, setUserName] = useState("");
    const [userUid, setUserUid] = useState("");

    useEffect(() => {
        // setUserName(auth.currentUser.displayName);
        setUserUid(auth.currentUser.uid);
    }, [userUid]);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingShowCase, setIsLoadingShowCase] = useState(false);
    const [imageUri, setImageUri] = useState("");
    const { birdInfo, setBirdInfo } = useBirdInfo();

    const handlePickAnImage = async () => {
        let response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        const imageID = uuid.v4();

        try {
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
                        userUid: userUid,
                        funFact: "",
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching Image to server:", error);
        }
    };

    // Def a handleSubmit() for the Submit/Select Button
    const handleSubmitButton = async () => {
        setIsLoading(true);
        await handlePickAnImage();
        setIsLoading(false);
    };

    // Code to handle the FunFact Button:
    // 1) Fetch the species name to server to use as the input prompt for requesting a response from an ai service
    // 2) Add the funFact (i.e., ai_response) to birdInfo (API context)
    // 3) Update the birdInfo on Firebase (i.e., adding the funFact)

    const handleFetchFunFactFromServer = async () => {
        try {
            const response = await fetchSpeciesToServer(
                birdInfo.predicted_label
            );

            const currentUserUid = auth.currentUser.uid;

            setBirdInfo({
                ...birdInfo,
                funFact: response,
                userUid: currentUserUid,
            });
        } catch (error) {
            console.error("Error fetching species to server:", error);
        }
    };

    // Def a function to handle FunFact Button
    const handleFunFactButton = async () => {
        try {
            if (birdInfo.predicted_label === "") {
                return;
            } else {
                if (birdInfo.funFact) {
                    navigation.navigate("ShowCase");
                } else {
                    setIsLoadingShowCase(true);

                    await handleFetchFunFactFromServer();

                    setIsLoadingShowCase(false);
                    navigation.navigate("ShowCase");
                }
            }
        } catch (error) {
            console.error("Error in FunFact Button:", error);
        }
    };

    useEffect(() => {
        birdInfo.userUid; // This is for whenever birdInfo changes
    }, [birdInfo]);

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <View
                style={{ flexDirection: "row", alignContent: "space-between" }}
            >
                <Pressable
                    style={{
                        alignSelf: "flex-start",
                        marginTop: 45,
                        marginHorizontal: 15,
                    }}
                    onPress={() => {
                        navigation.navigate("UpdatePassword");
                    }}
                >
                    <Ionicons name="settings-sharp" size={28} color="grey" />
                </Pressable>
                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: 125,
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
                        onPress={handleSubmitButton}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                        })}
                    >
                        <MainButton text={"Select"} />
                    </Pressable>
                </View>
            </View>

            <BirdInfoCard isLoading={isLoading} />

            {/* Fun fact Button */}
            <View
                style={{
                    flex: 1,
                    alignItems: "flex-start",
                    position: "absolute",
                    marginLeft: 20,
                    bottom: 42,
                }}
            >
                {isLoadingShowCase ? (
                    <View
                        style={{
                            // position: "absolute",
                            alignSelf: "center",
                            marginLeft: 40,
                            bottom: 6,
                        }}
                    >
                        <Circle size={28} color="rgba(255, 255, 255, 1)" />
                    </View>
                ) : (
                    <Pressable
                        onPress={handleFunFactButton}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.2 : 1,
                        })}
                    >
                        <RegularButton text={"Fun fact"} width={100} />
                    </Pressable>
                )}
            </View>

            {/* Add and Collection Buttons */}
            <View
                style={{
                    flexDirection: "row",
                    position: "absolute",
                    alignSelf: "flex-end",
                    bottom: 42,
                }}
            >
                <AddCollectionButton text={"Collection"} width={180} />
            </View>
        </View>
    );
}
