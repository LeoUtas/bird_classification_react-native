import React from "react";
import { View, Text } from "react-native";
import { useBirdInfo } from "./context/BirdInfoContext";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { TextStyles, RegularFontFamilyStyle } from "../styles/FontStyles";
import { PredictionFrame } from "../styles/Styles";

export default function BirdInfoCard({ isLoading }) {
    const { birdInfo } = useBirdInfo();

    if (birdInfo.predicted_probability === "") {
        return null;
    } else if (birdInfo.predicted_probability < 0.65) {
        return (
            <View
                style={{
                    ...PredictionFrame,
                    height: wp((120 / 389) * 100),
                    width: wp((360 / 389) * 100),
                }}
            >
                <Text style={TextStyles.RegularText}>
                    Sorry, I can't recognize this birdie.
                </Text>
            </View>
        );
    } else {
        return !isLoading ? (
            <View
                style={{
                    ...PredictionFrame,
                    height: wp((120 / 389) * 100),
                    width: wp((361 / 389) * 100),
                }}
            >
                <Text style={[TextStyles.MainButtonText, { marginBottom: 8 }]}>
                    {birdInfo.predicted_label}
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
                        {birdInfo.predicted_scientific_name}
                    </Text>
                </View>

                <Text style={TextStyles.RegularText}>
                    Execution Time: {birdInfo.execution_time} s
                </Text>
            </View>
        ) : null;
    }
}
