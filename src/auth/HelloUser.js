import { SafeAreaView, Text } from "react-native";
import React from "react";

import { TextStyles } from "../styles/FontStyles";

export default function HelloUser({ userName }) {
    return (
        <SafeAreaView
            style={{
                marginRight: 20,
                alignSelf: "flex-end",
            }}
        >
            <Text>
                <Text
                    style={[
                        TextStyles.AuthTitle,
                        {
                            color:
                                userName === null
                                    ? "transparent"
                                    : "rgba(255,255,255,1.0)",
                            fontSize: 16,
                        },
                    ]}
                >
                    Hello{" "}
                </Text>
                <Text style={[TextStyles.AuthTitle, { fontSize: 16 }]}>
                    {userName}
                </Text>
            </Text>
        </SafeAreaView>
    );
}
