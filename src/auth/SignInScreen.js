import {
    View,
    Text,
    StatusBar,
    Image,
    Pressable,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";

import BackgroundImage from "../../assets/BackgroundImage.png";
import HeaderPanel from "../components/HeaderPanel";
import HelloUser from "./HelloUser";
import RegularButton from "../components/RegularButton";
import AuthButton from "./AuthButton";
import { auth } from "../../Firebase/firebase";
import { TextStyles } from "../styles/FontStyles";
import { AuthFormFormat, placeholderTextColor } from "../styles/Styles";

export default function SigInScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSignin = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.error("error when signing in: ", error.message);
            }
        } else {
            alert("email & password are required");
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
                <Text style={TextStyles.AuthTitle}>Sign in</Text>
            </View>

            {/* Email Input */}
            <View style={{ marginTop: 20, alignSelf: "center" }}>
                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={placeholderTextColor}
                        style={{ height: "100%", color: "white" }}
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
                        style={{ height: "100%", color: "white" }}
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                    />
                </View>
            </View>

            {/* Auth buttons */}
            <View
                style={{
                    marginTop: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flex: 1, marginLeft: 55 }}>
                    <Pressable
                        onPress={handleSignin}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.2 : 1,
                        })}
                    >
                        <AuthButton text={"Sign In"} />
                    </Pressable>
                </View>

                <View style={{ marginRight: 55 }}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("ResetPasswordScreen");
                        }}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.2 : 1,
                        })}
                    >
                        <AuthButton text={"Reset"} />
                    </Pressable>
                </View>
            </View>

            <View style={{ alignSelf: "center", marginTop: 18 }}>
                <Text
                    style={
                        (TextStyles.RegularText,
                        { fontWeight: "bold", fontSize: 16 })
                    }
                >
                    Don't have an acount
                </Text>
                <Pressable
                    onPress={() => {
                        navigation.navigate("SignUpScreen");
                    }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.2 : 1,
                    })}
                >
                    <Text
                        style={
                            (TextStyles.RegularText,
                            {
                                fontWeight: "bold",
                                fontSize: 18,
                                alignSelf: "center",
                                marginTop: 10,
                            })
                        }
                    >
                        Sign Up
                    </Text>
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
