import { StyleSheet } from "react-native";
import {
    DisplayFontFamilyBoldStyle,
    DisplayFontFamilyRegularStyle,
    RegularFontFamilyStyle,
} from "./Styles";

export const TextStyles = StyleSheet.create({
    HeaderPanelTitle: {
        fontFamily: DisplayFontFamilyBoldStyle,
        fontWeight: "bold",
        color: "white",
        fontSize: 42,
        textAlign: "center",
    },

    MainButtonText: {
        fontFamily: RegularFontFamilyStyle,
        color: "white",
        fontSize: 20,
        textAlign: "center",
    },

    RegularText: {
        fontFamily: RegularFontFamilyStyle,
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },

    AccDeleteWarningText: {
        fontFamily: RegularFontFamilyStyle,
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },

    AuthTitle: {
        fontFamily: DisplayFontFamilyBoldStyle,
        fontSize: 28,
        color: "white",
    },

    InputFormText: {
        fontFamily: RegularFontFamilyStyle,
        fontSize: 16,
        color: "rgba(255, 255, 255, .6)",
    },

    InputText: {
        fontFamily: RegularFontFamilyStyle,
        height: "100%",
        color: "white",
    },
});
