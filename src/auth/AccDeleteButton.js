import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { AccountDeleteButtonGradient, AuthButtonStyle } from "../styles/Styles";
import { TextStyles } from "../styles/FontStyles";

export default function AccDeleteButton({ text }) {
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={AccountDeleteButtonGradient}
                style={{ ...AuthButtonStyle }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={TextStyles.RegularText}>{text}</Text>
                </View>
            </LinearGradient>
        </View>
    );
}
