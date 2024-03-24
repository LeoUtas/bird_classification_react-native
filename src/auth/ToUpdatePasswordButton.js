import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { TextStyles } from "../styles/FontStyles";

export default function ToUpdatePasswordButton() {
    const navigation = useNavigation();

    return (
        <View>
            <Text style={TextStyles.RegularText}>ToUpdatePasswordButton</Text>
        </View>
    );
}
