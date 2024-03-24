import { View, Image } from "react-native";
import React from "react";

import { ImageFrameStyle } from "../../styles/Styles";

export default function CollectionImageFrame({
    imageUri,
    borderBottomRightRadius,
    borderBottomLeftRadius,
}) {
    return (
        <View
            style={{
                ...ImageFrameStyle,
                borderBottomRightRadius: borderBottomRightRadius,
                borderBottomLeftRadius: borderBottomLeftRadius,
            }}
        >
            <Image
                source={{ uri: imageUri }}
                style={{ width: 360, height: 360 }}
            />
        </View>
    );
}
