import React, { useEffect } from "react";
import AppNavigation from "./src/navigation";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { BirdInfoProvider } from "./src/components/context/BirdInfoContext";
import { BirdInfoLoadedProvider } from "./src/components/context/BirdInfoLoadedContext";
import { SpeciesListProvider } from "./src/components/context/SpeciesListContext";

// import "./Firebase/firebase";

export default function App() {
    const [fontsLoaded] = useFonts({
        "Comic Neue Bold": require("./assets/fonts/ComicNeue-Bold.ttf"),
        "Comic Neue Regular": require("./assets/fonts/ComicNeue-Regular.ttf"),
        "Raleway Regular": require("./assets/fonts/Raleway-Regular.ttf"),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }

    return (
        <SpeciesListProvider>
            <BirdInfoProvider>
                <BirdInfoLoadedProvider>
                    <AppNavigation />
                </BirdInfoLoadedProvider>
            </BirdInfoProvider>
        </SpeciesListProvider>
    );
}
