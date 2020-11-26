import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeTabNavigator from './HomeTabNavigator';

import PosterShowScreen from '../screens/posterShowScreen/PosterShowScreen';
import FirstAppStartupScreen from '../screens/firstAppStartupScreen/FirstAppStartupScreen';

const AppStack = createStackNavigator();

const AppNavigator: React.FC = () => (
    <NavigationContainer>
        <AppStack.Navigator
            headerMode="none"
            initialRouteName="Home"
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <AppStack.Screen
                name="Home"
                component={HomeTabNavigator}
            />

            <AppStack.Screen
                name="ShowPoster"
                component={PosterShowScreen}
            />

            <AppStack.Screen
                name="FirstAppStartup"
                component={FirstAppStartupScreen}
            />
        </AppStack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
