import React from "react";
import { View, Text } from "react-native";

import { TextStyles, RegularFontFamilyStyle } from "../../styles/FontStyles";
import { PredictionFrame } from "../../styles/Styles";

export default function CollectionBirdInfoCard({
    predicted_label,
    predicted_scientific_name,
}) {
    return (
        <View style={{ ...PredictionFrame }}>
            <Text style={[TextStyles.MainButtonText, { marginBottom: 8 }]}>
                {predicted_label}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                }}
            >
                <Text style={TextStyles.RegularText}>
                    Scientific name:{"  "}
                </Text>
                <Text
                    style={{
                        fontFamily: RegularFontFamilyStyle,
                        fontSize: 16,
                        color: "white",
                        fontStyle: "italic",
                    }}
                >
                    {predicted_scientific_name}
                </Text>
            </View>
        </View>
    );
}
