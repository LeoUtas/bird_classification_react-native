import { View, Text } from "react-native";
import React from "react";

import { useBirdInfo } from "./context/BirdInfoContext";
import { TextStyles } from "../styles/FontStyles";

export default function FunFactText() {
    const { birdInfo, setBirdInfo } = useBirdInfo();

    return (
        <View>
            <Text style={[TextStyles.RegularText, { lineHeight: 25 }]}>
                {birdInfo.funFact}
            </Text>
        </View>
    );
}
