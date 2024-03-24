import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";

import { RegularButtonStyle, RegularButtonGradient } from "../styles/Styles";
import { TextStyles } from "../styles/FontStyles";

export default function RegularButton({ text, width }) {
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={RegularButtonGradient}
                style={{ ...RegularButtonStyle, width: width }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={TextStyles.RegularText}>{text}</Text>
                </View>
            </LinearGradient>
        </View>
    );
}
