import { View, StatusBar, Image, Pressable, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

import BackgroundImage from "../../../assets/BackgroundImage.png";
import HeaderPanel from "../HeaderPanel";
import CollectionFrame from "./CollectionFrame";
import RegularButton from "../RegularButton";
import ToUpdatePasswordButton from "../../auth/ToUpdatePasswordButton";
import HelloUser from "../../auth/HelloUser";
import { auth } from "../../../Firebase/firebase";

export default function CollectionShow() {
    const navigation = useNavigation();

    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(auth.currentUser.displayName);
    }, []);

    const handleSignout = async () => {
        await signOut(auth);
    };

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <HelloUser userName={userName} />

            <View style={{ marginTop: 20 }}>
                <HeaderPanel text={"Collection show"} />
            </View>

            <View
                style={{
                    marginTop: 20,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <CollectionFrame />
            </View>

            {/* Exit and Home Buttons */}
            <View
                style={{
                    position: "absolute",
                    bottom: 25,
                    flexDirection: "row",
                    paddingHorizontal: 50,
                    width: "100%",
                }}
            >
                <View style={{ flex: 1 }}>
                    <Pressable
                        onPress={handleSignout}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.2 : 1,
                        })}
                    >
                        <RegularButton text={"Exit"} width={100} />
                    </Pressable>
                </View>

                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("HomeScreen");
                        }}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.2 : 1,
                        })}
                    >
                        <RegularButton text={"Home"} width={100} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
