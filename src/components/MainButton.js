import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";

import { MainButtonStyle, MainButtonGradient } from "../styles/Styles";
import { TextStyles } from "../styles/FontStyles";

export default function MainButton({ text }) {
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={MainButtonGradient}
                style={{
                    ...MainButtonStyle,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={TextStyles.MainButtonText}>{text}</Text>
            </LinearGradient>
        </View>
    );
}
