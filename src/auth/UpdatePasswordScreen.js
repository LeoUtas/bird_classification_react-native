import {
    View,
    Text,
    StatusBar,
    Image,
    Pressable,
    TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { updatePassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import BackgroundImage from "../../assets/BackgroundImage.png";
import HeaderPanel from "../components/HeaderPanel";
import HelloUser from "./HelloUser";
import { auth } from "../../Firebase/firebase";
import RegularButton from "../components/RegularButton";
import AuthButton from "./AuthButton";
import { TextStyles } from "../styles/FontStyles";
import { AuthFormFormat, placeholderTextColor } from "../styles/Styles";

export default function UpdatePasswordScreen() {
    const navigation = useNavigation();

    const [userName, setUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    useEffect(() => {
        setUserName(auth.currentUser.displayName);
    }, []);

    const handleUpdatePassword = async () => {
        if (newPassword && newPassword === confirmNewPassword) {
            try {
                const user = auth.currentUser;
                await updatePassword(user, newPassword).then(() => {
                    alert("Update successful");
                });
                navigation.navigate("HomeScreen");
            } catch (error) {
                console.log("error when updating password: ", error.message);
            }
        } else {
            alert("It's required to enter: Email, Password & Confirm Password");
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

            <View>
                <HelloUser userName={null} />
            </View>

            <View style={{ marginTop: 55 }}>
                <HeaderPanel text={"Bird Classification"} />
            </View>

            {/* Sign In Title */}
            <View style={{ alignSelf: "center", marginTop: 45 }}>
                <Text style={TextStyles.AuthTitle}>Update password</Text>
            </View>

            {/* Email Input */}
            <View style={{ marginTop: 20, alignSelf: "center" }}>
                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={placeholderTextColor}
                        style={{ height: "100%", color: "white" }}
                        secureTextEntry
                        value={newPassword}
                        onChangeText={(value) => setNewPassword(value)}
                    />
                </View>

                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Confirm new password"
                        placeholderTextColor={placeholderTextColor}
                        style={{ height: "100%", color: "white" }}
                        secureTextEntry
                        value={confirmNewPassword}
                        onChangeText={(value) => setConfirmNewPassword(value)}
                    />
                </View>
            </View>

            {/* Auth buttons */}
            <View
                style={{
                    marginTop: 15,
                    alignSelf: "center",
                }}
            >
                <Pressable
                    onPress={handleUpdatePassword}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.2 : 1,
                    })}
                >
                    <AuthButton text={"Reset"} />
                </Pressable>
            </View>

            {/* Return Buttons */}
            <View
                style={{
                    position: "absolute",
                    bottom: 25,
                    flexDirection: "row",
                    paddingHorizontal: 25,
                    width: "100%",
                }}
            >
                <View style={{ flex: 1 }}>
                    <Pressable
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.2 : 1,
                        })}
                    >
                        <RegularButton text={"Return"} width={120} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
