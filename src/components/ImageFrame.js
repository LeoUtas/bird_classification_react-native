import { View, Image, Text } from "react-native";
import React from "react";
import { Circle } from "react-native-animated-spinkit";

import { ImageFrameStyle } from "../styles/Styles";
import { useBirdInfo } from "./context/BirdInfoContext";

export default function ImageFrame({
    isLoading,
    borderBottomRightRadius,
    borderBottomLeftRadius,
}) {
    const { birdInfo } = useBirdInfo();

    return (
        <View
            style={{
                ...ImageFrameStyle,
                borderBottomRightRadius: borderBottomRightRadius,
                borderBottomLeftRadius: borderBottomLeftRadius,
            }}
        >
            {isLoading ? (
                <View
                    style={{
                        flex: 1,
                        alignSelf: "center",
                        justifyContent: "center",
                    }}
                >
                    <Circle size={68} color="rgba(255, 255, 255, 1)" />
                </View>
            ) : (
                birdInfo.imageUri !== "" && (
                    <Image
                        source={{ uri: birdInfo.imageUri }}
                        style={{ width: 360, height: 360 }}
                    />
                )
            )}
        </View>
    );
}
