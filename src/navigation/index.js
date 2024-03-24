import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreenGuest from "../screens/HomeScreenGuest";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../auth/SignInScreen";
import ResetPasswordScreen from "../auth/ResetPasswordScreen";
import UpdatePasswordScreen from "../auth/UpdatePasswordScreen";
import SignUpScreen from "../auth/SignUpScreen";
import CollectionShow from "../components/collection/CollectionShow";
import CollectionShowCase from "../components/collection/CollectionShowCase";
import ShowCase from "../screens/ShowCase";
import SpeciesListScreen from "../screens/SpeciesListScreen";
import ExampleScreen from "../screens/ExampleScreen";

import useAuth from "../auth/hooks/useAuth";

const Stack = createNativeStackNavigator();

function AppNavigation() {
    const { user } = useAuth();

    if (user) {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="CollectionShow"
                >
                    <Stack.Screen
                        name="HomeScreen"
                        screenOptions={{ headerShown: false }}
                        component={HomeScreen}
                    />

                    <Stack.Screen
                        name="ShowCase"
                        screenOptions={{ headerShown: false }}
                        component={ShowCase}
                    />
                    <Stack.Screen
                        name="CollectionShow"
                        screenOptions={{ headerShown: false }}
                        component={CollectionShow}
                    />
                    <Stack.Screen
                        name="UpdatePassword"
                        screenOptions={{ headerShown: false }}
                        component={UpdatePasswordScreen}
                    />
                    <Stack.Screen
                        name="CollectionShowCase"
                        screenOptions={{ headerShown: false }}
                        component={CollectionShowCase}
                    />
                    <Stack.Screen
                        name="SpeciesList"
                        screenOptions={{ headerShown: false }}
                        component={SpeciesListScreen}
                    />
                    <Stack.Screen
                        name="Examples"
                        screenOptions={{ headerShown: false }}
                        component={ExampleScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Home"
                >
                    <Stack.Screen
                        name="HomeScreenGuest"
                        screenOptions={{ headerShown: false }}
                        component={HomeScreenGuest}
                    />
                    <Stack.Screen
                        name="SignInScreen"
                        screenOptions={{ headerShown: false }}
                        component={SignInScreen}
                    />
                    <Stack.Screen
                        name="ResetPasswordScreen"
                        screenOptions={{ headerShown: false }}
                        component={ResetPasswordScreen}
                    />
                    <Stack.Screen
                        name="SignUpScreen"
                        screenOptions={{ headerShown: false }}
                        component={SignUpScreen}
                    />
                    <Stack.Screen
                        name="SpeciesList"
                        screenOptions={{ headerShown: false }}
                        component={SpeciesListScreen}
                    />
                    <Stack.Screen
                        name="Examples"
                        screenOptions={{ headerShown: false }}
                        component={ExampleScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppNavigation;
