import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, Pressable, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Chase } from "react-native-animated-spinkit";
import { useNavigation } from "@react-navigation/native";

import { auth } from "../../../Firebase/firebase";
import { useBirdInfoLoaded } from "../context/BirdInfoLoadedContext";
import toggleChosenBirdInfoID from "../utils/toggleChosenBirdInfoID";
import fetchBirdInfoFromFirestore from "../utils/fetchBirdInfoFromFirebase";
import fetchDeleteBirdInfoFromFirebase from "../utils/fetchDeleteBirdInfoFromFirebase";
import { CollectionFrameStyle } from "../../styles/Styles";
import { TextStyles } from "../../styles/FontStyles";

export default function CollectionFrame() {
    const navigation = useNavigation();

    const { birdInfosLoaded, setBirdInfosLoaded } = useBirdInfoLoaded();

    const [isLoading, setIsLoading] = useState(false);

    // Code for chosen images for deleting from Firebase
    const [isSelectOn, setIsSelectOn] = useState(false);

    const toggleSelectButton = () => {
        setIsSelectOn(!isSelectOn);
    };

    // Arrange chosenBirdInfoIDs and chosenBirdInfos states
    const [chosenBirdInfoIDs, setChosenBirdInfoIDs] = useState([]);
    const [chosenBirdInfos, setChosenBirdInfos] = useState([]);

    // Update the chosenBirdInfos according to chosenBirdInfoIDs
    useEffect(() => {
        const filteredBirdInfos = birdInfosLoaded.filter((item) =>
            chosenBirdInfoIDs.includes(item.ID)
        );

        setChosenBirdInfos(filteredBirdInfos);
    }, [chosenBirdInfoIDs, birdInfosLoaded]);

    // handle deleting chosenBirdInfo from server
    const handleDeleteChosenBirdInfo = async () => {
        setIsLoading(true);
        try {
            for (const item of chosenBirdInfos) {
                const ID = item.ID;
                const path = item.imageUri;

                await fetchDeleteBirdInfoFromFirebase(ID, path);
            }
        } catch (error) {
            console.error("Error fetching delete BirdInfo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // code to reload the frame image after deleting
    const [userUid, setUserUid] = useState("");
    const collectionName = "birdInfo";

    useEffect(() => {
        setUserUid(auth.currentUser.uid);
    }, []);

    const handleLoadBirdInfo = async () => {
        try {
            setIsLoading(true);

            const birdInfoFromFirebase = await fetchBirdInfoFromFirestore(
                collectionName,
                userUid
            );

            // Update birdInfosLoaded with the new data fetched
            setBirdInfosLoaded(birdInfoFromFirebase);

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching birdInfo from Firestore: ", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ ...CollectionFrameStyle }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {birdInfosLoaded.map((item, index) => (
                    <View
                        key={index}
                        style={{ margin: 0, position: "relative" }}
                    >
                        <Pressable
                            onPress={() => {
                                // navigate to CollectionShowCase screen and send data along
                                navigation.navigate("CollectionShowCase", {
                                    ID: item.ID,
                                    imageUri: item.imageUri,
                                    predicted_label: item.predicted_label,
                                    predicted_scientific_name:
                                        item.predicted_scientific_name,
                                    funFact: item.funFact,
                                });
                            }}
                        >
                            <Image
                                source={{ uri: item.imageUri }}
                                style={{ width: 93.5, height: 93.5 }}
                            />
                        </Pressable>

                        {isSelectOn && (
                            <Pressable
                                onPress={() => {
                                    toggleChosenBirdInfoID(
                                        item.ID,
                                        chosenBirdInfoIDs,
                                        setChosenBirdInfoIDs
                                    );
                                }}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="bookmark-remove"
                                    size={24}
                                    color={
                                        chosenBirdInfoIDs.includes(item.ID)
                                            ? "#c11e38"
                                            : "white"
                                    }
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                    }}
                                />
                            </Pressable>
                        )}
                    </View>
                ))}
            </View>

            {/* select to delete && delete buttons */}
            <View
                style={{
                    position: "absolute",
                    top: 560,
                    left: 15,
                    right: 10,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <Pressable
                    onPress={toggleSelectButton}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.2 : 1,
                    })}
                >
                    <View style={{ flexDirection: "row", marginRight: 20 }}>
                        <Text
                            style={[TextStyles.RegularText, { marginRight: 5 }]}
                        >
                            Select
                        </Text>
                        <MaterialCommunityIcons
                            name="arrow-right-thin"
                            size={24}
                            color="white"
                        />
                    </View>
                </Pressable>

                <Pressable
                    onPress={async () => {
                        await handleDeleteChosenBirdInfo();
                        handleLoadBirdInfo();
                    }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.2 : 1,
                    })}
                >
                    {isLoading ? (
                        <Chase size={38} color="rgba(255, 255, 255, 1)" />
                    ) : (
                        <MaterialCommunityIcons
                            name="delete-variant"
                            size={32}
                            color="white"
                        />
                    )}
                </Pressable>
            </View>
        </ScrollView>
    );
}
