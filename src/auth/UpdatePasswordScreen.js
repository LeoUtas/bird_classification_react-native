import {
    View,
    Text,
    StatusBar,
    Image,
    Pressable,
    TextInput,
    Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { updatePassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import BackgroundImage from "../../assets/BackgroundImage.png";
import HeaderPanel from "../components/HeaderPanel";
import HelloUser from "./HelloUser";
import { auth } from "../../Firebase/firebase";
import RegularButton from "../components/RegularButton";
import AuthButton from "./AuthButton";
import AccDeleteButton from "./AccDeleteButton";
import fetchDeleteAccountToFirebase from "../apis/fetchDeleteAccountToFirebase";
import { TextStyles } from "../styles/FontStyles";
import { AuthFormFormat, placeholderTextColor } from "../styles/Styles";

export default function UpdatePasswordScreen() {
    const navigation = useNavigation();

    const user = auth.currentUser;
    const [userUid, setUserUid] = useState("");
    const [userName, setUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    useEffect(() => {
        setUserName(auth.currentUser.displayName);
        setUserUid(auth.currentUser.uid);
    }, []);

    // def a function to handle the update password
    const handleUpdatePassword = async () => {
        if (newPassword && newPassword === confirmNewPassword) {
            try {
                const user = auth.currentUser;
                await updatePassword(user, newPassword).then(() => {
                    Alert.alert(
                        "Congratulations!",
                        "Password updated successfully"
                    );
                });
                navigation.navigate("HomeScreen");
            } catch (error) {
                console.log("error when updating password: ", error.message);
            }
        } else {
            alert("It's required to enter: Email, Password & Confirm Password");
        }
    };

    // def a function to handle the account deletion
    const handleAccountDeletion = async () => {
        try {
            await fetchDeleteAccountToFirebase(userUid, user);
        } catch (error) {
            console.log("error when deleting account: ", error.message);
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

            {/* Account reset button */}
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

            {/* Account deletion button */}
            <View
                style={{
                    marginTop: wp((160 / 389) * 100),
                    marginLeft: wp((20 / 389) * 100),
                    alignSelf: "left",
                }}
            >
                <Text style={TextStyles.AccDeleteWarningText}>
                    Account removal
                </Text>
                <Pressable
                    onPress={handleAccountDeletion}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.2 : 1,
                        marginTop: wp((10 / 389) * 100),
                        marginLeft: wp((10 / 389) * 100),
                    })}
                >
                    <AccDeleteButton text={"Delete"} />
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
