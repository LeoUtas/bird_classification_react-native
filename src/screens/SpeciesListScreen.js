import { View, Text, ScrollView } from "react-native";
import React from "react";

import SpeciesList from "../../assets/data/class_indices.json";
import HomeButton from "../components/HomeButton";
import ReturnButton from "../components/ReturnButton";
import { LargeFrameStyle } from "../styles/Styles";
import { TextStyles } from "../styles/FontStyles";

export default function SpeciesListScreen() {
    const speciesList = Object.values(SpeciesList);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <View style={{ flex: 1, backgroundColor: "rgba(43, 58, 0, 1)" }}>
            <Text
                style={[
                    TextStyles.HeaderPanelTitle,
                    { marginTop: 50, marginBottom: 20 },
                ]}
            >
                List of Species
            </Text>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 70 }}
            >
                <View style={{ ...LargeFrameStyle }}>
                    {speciesList.map((species, index) => (
                        <View key={index} style={{ marginBottom: 30 }}>
                            <Text style={TextStyles.RegularText}>
                                {species.label}
                            </Text>
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontSize: 15,
                                    fontStyle: "italic",
                                    color: "white",
                                    paddingVertical: 5,
                                }}
                            >
                                {capitalizeFirstLetter(species.scientific_name)}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <ReturnButton />
        </View>
    );
}
