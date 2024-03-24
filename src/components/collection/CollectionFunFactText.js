import { View, Text } from "react-native";
import React from "react";

import { TextStyles } from "../../styles/FontStyles";

export default function CollectionFunFactText({ funFact }) {
    return (
        <View>
            <Text style={[TextStyles.RegularText, { lineHeight: 25 }]}>
                {funFact}
            </Text>
        </View>
    );
}
