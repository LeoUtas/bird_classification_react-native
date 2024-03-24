import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import { RegularButtonStyle } from "../styles/Styles";
import { TextStyles } from "../styles/FontStyles";

export default function ReturnButton() {
    const navigation = useNavigation();

    return (
        <View>
            {/* Home button */}
            <View
                style={{
                    bottom: 20,
                    position: "absolute",
                    alignSelf: "center",
                }}
            >
                <Pressable
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}
                >
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={["rgba(47, 65, 0, 1)", "rgba(96, 105, 72, 1)"]}
                        style={{ ...RegularButtonStyle, width: 100 }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={TextStyles.RegularText}>Home</Text>
                        </View>
                    </LinearGradient>
                </Pressable>
            </View>
        </View>
    );
}
