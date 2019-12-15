import React from "react";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import TvHomeScreen from "../screens/tvHomeScreen/TvHomeScreen";
import TvListScreen from "../screens/tvListScreen/TvListScreen";
import TvShowScreen from "../screens/tvShowScreen/TvShowScreen";
import SearchScreen from "../screens/searchScreen/SearchScreen";

const TvStack = createStackNavigator();

const TvStackScreen: React.FC = () => (
    <TvStack.Navigator
        headerMode="none"
        screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
        }}
    >
        <TvStack.Screen
            name="TvHome"
            component={TvHomeScreen}
        />

        <TvStack.Screen
            name="TvList"
            component={TvListScreen}
        />

        <TvStack.Screen
            name="Search"
            component={SearchScreen}
        />

        <TvStack.Screen
            name="Tv"
            component={TvShowScreen}
        />
    </TvStack.Navigator>
);

export default TvStackScreen;
