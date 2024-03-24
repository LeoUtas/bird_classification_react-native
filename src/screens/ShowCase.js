import { View, ScrollView } from "react-native";
import React from "react";

import ImageFrame from "../components/ImageFrame";
import BirdInfoCard from "../components/BirdInfoCard";
import FunFactText from "../components/FunFactText";
import HomeButton from "../components/HomeButton";
import { LargeFrameStyle } from "../styles/Styles";

export default function ShowCase() {
    return (
        <View style={{ flex: 1, backgroundColor: "rgba(43, 58, 0, 1)" }}>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 70 }} // Add padding to the bottom equal to or greater than the button's height + 20
            >
                <View style={{ ...LargeFrameStyle }}>
                    <View style={{ marginTop: 50, borderBottomLeftRadius: 25 }}>
                        <ImageFrame
                            borderBottomLeftRadius={20}
                            borderBottomRightRadius={20}
                        />
                    </View>

                    <View>
                        <BirdInfoCard />
                    </View>

                    <View style={{ paddingHorizontal: 40 }}>
                        <FunFactText />
                    </View>
                </View>
            </ScrollView>

            {/* Home button */}
            <HomeButton />
        </View>
    );
}
