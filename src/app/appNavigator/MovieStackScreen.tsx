import React from "react";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import MovieHomeScreen from "../screens/movieHomeScreen/MovieHomeScreen";
import MovieListScreen from "../screens/movieListScreen/MovieListScreen";
import MovieShowScreen from "../screens/movieShowScreen/MovieShowScreen";
import SearchScreen from "../screens/searchScreen/SearchScreen";

const MovieStack = createStackNavigator();

const MovieStackScreen: React.FC = () => (
    <MovieStack.Navigator
        headerMode="none"
        screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
        }}
    >
        <MovieStack.Screen
            name="MovieHome"
            component={MovieHomeScreen}
        />

        <MovieStack.Screen
            name="MovieList"
            component={MovieListScreen}
        />

        <MovieStack.Screen
            name="Search"
            component={SearchScreen}
        />

        <MovieStack.Screen
            name="Movie"
            component={MovieShowScreen}
        />
    </MovieStack.Navigator>
);

export default MovieStackScreen;
