import { View, Text } from "react-native";
import React from "react";

import { TextStyles } from "../styles/FontStyles";

export default function HeaderPanel({ text }) {
    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <Text style={TextStyles.HeaderPanelTitle}>{text}</Text>
        </View>
    );
}
