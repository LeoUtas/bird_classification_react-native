import {
    View,
    Text,
    StatusBar,
    Image,
    Pressable,
    TextInput,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
} from "firebase/auth";

import BackgroundImage from "../../assets/BackgroundImage.png";
import HeaderPanel from "../components/HeaderPanel";
import HelloUser from "./HelloUser";
import RegularButton from "../components/RegularButton";
import AuthButton from "./AuthButton";
import { auth } from "../../Firebase/firebase";
import { TextStyles } from "../styles/FontStyles";
import { AuthFormFormat, placeholderTextColor } from "../styles/Styles";

export default function SigUpScreen() {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async () => {
        if (name && email && password && password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(auth.currentUser, {
                    displayName: name,
                }).catch((err) => console.log(err));
                // This email verification is not working as expected yet - doesn't work with @mun.ca
                await sendEmailVerification(auth.currentUser).then(() => {
                    Alert.alert(
                        "Congratulations!",
                        "User created successfully"
                    );
                });
            } catch (error) {
                console.error("Error during signup: ", error.message);
            }
        } else {
            alert("Please check: Name, Email, Password and Confirmed Password");
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
                <Text style={TextStyles.AuthTitle}>Sign up</Text>
            </View>

            {/* Input forms */}
            <View style={{ marginTop: 20, alignSelf: "center" }}>
                {/* Name Input */}
                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor={placeholderTextColor}
                        style={TextStyles.InputText}
                        value={name}
                        onChangeText={(value) => setName(value)}
                    />
                </View>

                {/* Email Input */}
                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={placeholderTextColor}
                        style={TextStyles.InputText}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>

                {/* Password Input */}
                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={placeholderTextColor}
                        secureTextEntry
                        style={TextStyles.InputText}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>

                {/* Confirm Password Input */}
                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Confirm password"
                        placeholderTextColor={placeholderTextColor}
                        secureTextEntry
                        style={TextStyles.InputText}
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
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
                <View style={{ flex: 1 }}>
                    <Pressable
                        onPress={handleSignup}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.2 : 1,
                        })}
                    >
                        <AuthButton text={"Sign Up"} />
                    </Pressable>
                </View>
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
