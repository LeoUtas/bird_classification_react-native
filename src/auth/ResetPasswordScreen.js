import {
    View,
    Text,
    StatusBar,
    Image,
    Pressable,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import BackgroundImage from "../../assets/BackgroundImage.png";
import HeaderPanel from "../components/HeaderPanel";
import HelloUser from "./HelloUser";
import { auth } from "../../Firebase/firebase";
import RegularButton from "../components/RegularButton";
import AuthButton from "./AuthButton";
import { TextStyles } from "../styles/FontStyles";
import { AuthFormFormat, placeholderTextColor } from "../styles/Styles";

export default function ResetPasswordScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState(null);

    const handleResetPassword = async () => {
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                alert("Password reset email sent!");
                navigation.navigate("HomeScreenGuest");
            } catch (error) {
                console.error("error when resetting password: ", error.message);
            }
        } else {
            alert("It's required to enter: Email");
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
                <Text style={TextStyles.AuthTitle}>Reset password</Text>
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
            </View>

            {/* Auth buttons */}
            <View
                style={{
                    marginTop: 15,
                    alignSelf: "center",
                }}
            >
                <Pressable
                    onPress={handleResetPassword}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.2 : 1,
                    })}
                >
                    <AuthButton text={"Reset"} />
                </Pressable>
            </View>

            <View style={{ alignSelf: "center", marginTop: 20 }}>
                <Text
                    style={
                        (TextStyles.RegularText,
                        {
                            fontWeight: "bold",
                            fontSize: 16,
                            textAlign: "center",
                            lineHeight: 24,
                        })
                    }
                >
                    A reset password link {"\n"} will be sent to your email
                </Text>
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
