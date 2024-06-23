import { View, Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Chase } from "react-native-animated-spinkit";

import { auth } from "../../Firebase/firebase";
import fetchBirdInfoFromFirestore from "../apis/fetchBirdInfoFromFirebase";
import { fetchBirdInfoToFirebase } from "../apis/fetchBirdInfoToFirebase";
import { useBirdInfo } from "./context/BirdInfoContext";
import { useBirdInfoLoaded } from "./context/BirdInfoLoadedContext";
import { RegularButtonStyle, RegularButtonGradient } from "../styles/Styles";
import { TextStyles } from "../styles/FontStyles";

export default function AddCollectionButton({ text, width }) {
    const navigation = useNavigation();
    const { birdInfo } = useBirdInfo();

    const [isLoading, setIsLoading] = useState(false);
    const [userUid, setUserUid] = useState("");
    const collectionName = "birdInfo";

    const handleAdd = async () => {
        try {
            setIsLoading(true);

            await fetchBirdInfoToFirebase(birdInfo.imageUri, birdInfo, userUid);

            setIsLoading(false);
        } catch (error) {
            console.error("Error in handleAdd(): ", error);
        }
    };

    useEffect(() => {
        setUserUid(auth.currentUser.uid);
    }, []);

    const { birdInfosLoaded, setBirdInfosLoaded } = useBirdInfoLoaded();

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

    const handleCollectionButton = async () => {
        try {
            if (birdInfosLoaded.length === 0) {
                await handleLoadBirdInfo();
                navigation.navigate("CollectionShow");
            } else {
                navigation.navigate("CollectionShow");
            }
        } catch (error) {
            console.error("Error handling Collection Button: ", error);
        }
    };

    return (
        <View style={{ flexDirection: "row", marginRight: 20 }}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={RegularButtonGradient}
                style={{ ...RegularButtonStyle, width: width }}
            >
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Pressable
                        onPress={handleAdd}
                        style={({ pressed }) => ({
                            justifyContent: "center",
                            paddingHorizontal: 20,
                            opacity: pressed ? 0.2 : 1,
                        })}
                    >
                        {isLoading ? (
                            <Chase size={38} color="rgba(255, 255, 255, 1)" />
                        ) : (
                            <MaterialIcons name="add" size={24} color="white" />
                        )}
                    </Pressable>

                    <Pressable
                        onPress={async () => {
                            await handleCollectionButton();
                        }}
                        style={({ pressed }) => ({
                            flex: 1,
                            justifyContent: "center",
                            marginRight: 5,
                            opacity: pressed ? 0.2 : 1,
                        })}
                    >
                        <Text style={TextStyles.RegularText}>{text}</Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </View>
    );
}
