import React from "react";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import PersonHomeScreen from "../screens/personHomeScreen/PersonHomeScreen";
import PersonListScreen from "../screens/personListScreen/PersonListScreen";
import PersonSearchScreen from "../screens/personSearchScreen/PersonSearchScreen";
import PersonShowScreen from "../screens/personShowScreen/PersonShowScreen";

const PersonStack = createStackNavigator();

const PersonStackScreen: React.FC = () => (
    <PersonStack.Navigator
        headerMode="none"
        screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
        }}
    >
        <PersonStack.Screen
            name="PersonHome"
            component={PersonHomeScreen}
        />

        <PersonStack.Screen
            name="PersonList"
            component={PersonListScreen}
        />

        <PersonStack.Screen
            name="PersonSearch"
            component={PersonSearchScreen}
        />

        <PersonStack.Screen
            name="Person"
            component={PersonShowScreen}
        />
    </PersonStack.Navigator>
);

export default PersonStackScreen;
