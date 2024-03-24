import { View, ScrollView, Pressable, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { useRoute } from "@react-navigation/native";

import CollectionImageFrame from "./CollectionImageFrame";
import CollectionBirdInfoCard from "./CollectionBirdInfoCard";
import CollectionFunFactText from "./CollectionFunFactText";

import { RegularButtonStyle, LargeFrameStyle } from "../../styles/Styles";
import { TextStyles } from "../../styles/FontStyles";

export default function CollectionShowCase() {
    const navigation = useNavigation();

    const route = useRoute();
    const {
        Id,
        imageUri,
        predicted_label,
        predicted_scientific_name,
        funFact,
    } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: "rgba(43, 58, 0, 1)" }}>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 70 }} // Add padding to the bottom equal to or greater than the button's height + 20
            >
                <View style={{ ...LargeFrameStyle }}>
                    <View style={{ marginTop: 50, borderBottomLeftRadius: 25 }}>
                        <CollectionImageFrame
                            borderBottomLeftRadius={20}
                            borderBottomRightRadius={20}
                            imageUri={imageUri}
                        />
                    </View>

                    <View>
                        <CollectionBirdInfoCard
                            predicted_label={predicted_label}
                            predicted_scientific_name={
                                predicted_scientific_name
                            }
                        />
                    </View>

                    <View style={{ paddingHorizontal: 40 }}>
                        <CollectionFunFactText funFact={funFact} />
                    </View>
                </View>
            </ScrollView>

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
                            <Text style={TextStyles.RegularText}>Return</Text>
                        </View>
                    </LinearGradient>
                </Pressable>
            </View>
        </View>
    );
}
