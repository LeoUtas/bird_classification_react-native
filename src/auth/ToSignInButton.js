import { View, Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { ToSignInButtonStyle, MainButtonGradient } from "../styles/Styles";
import { TextStyles } from "../styles/FontStyles";

export default function ToSignInButton({ text }) {
    const navigation = useNavigation();

    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={MainButtonGradient}
                style={{ ...ToSignInButtonStyle }}
            >
                <Pressable
                    onPress={() => navigation.navigate("SignInScreen")}
                    style={({ pressed }) => ({
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: pressed ? 0.5 : 1,
                    })}
                >
                    <Text style={TextStyles.RegularText}>{text}</Text>
                </Pressable>
            </LinearGradient>
        </View>
    );
}
