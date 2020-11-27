import React from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DrawerHome from "../components/drawerHome/DrawerHome";

import MovieStackScreen from "./MovieStackScreen";
import TvStackScreen from "./TvStackScreen";
import PersonStackScreen from "./PersonStackScreen";
import AboutHomeScreen from "../screens/aboutHomeScreen/AboutHomeScreen";

import { Color } from "@src/colors";
import { currentRouteName } from "./homeTabNavigatorHelper";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Color.backgroundPrimary,
    },
});

const HomeTab = createBottomTabNavigator();

const HomeTabNavigator: React.FC = () => {

    const navigation = useNavigation();

    const [initialRouteName, setInitialRouteName] = React.useState<string | null>(null);

    React.useEffect(() => {
        currentRouteName(value => setInitialRouteName(value));

        (async () => {
            try {
                const value = await AsyncStorage.getItem('FirstAppStartup');

                if (!value) {
                    navigation.navigate('FirstAppStartup');
                    await AsyncStorage.setItem('FirstAppStartup', 'true');
                }
            } catch (e) { }
        })();
    }, []);

    if (!initialRouteName)
        return <View style={styles.root} />;

    return (
        <DrawerHome>
            <HomeTab.Navigator
                initialRouteName={initialRouteName}
                backBehavior="none"
                tabBarOptions={{
                    style: {
                        backgroundColor: '#333',
                        elevation: 10,
                    },
                    activeTintColor: '#01a267',
                    inactiveTintColor: 'gray',
                    keyboardHidesTabBar: true,
                }}
            >
                <HomeTab.Screen
                    name="MovieHome"
                    component={MovieStackScreen}
                    options={{
                        tabBarLabel: 'Filmes',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="local-movies" size={size} color={color} />
                        ),
                    }}
                />

                <HomeTab.Screen
                    name="TvHome"
                    component={TvStackScreen}
                    options={{
                        tabBarLabel: 'Séries',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="live-tv" size={size} color={color} />
                        ),
                    }}
                />

                <HomeTab.Screen
                    name="PersonHome"
                    component={PersonStackScreen}
                    options={{
                        tabBarLabel: 'Pessoas',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="people" size={size} color={color} />
                        ),
                    }}
                />

                <HomeTab.Screen
                    name="AboutHome"
                    component={AboutHomeScreen}
                    options={{
                        tabBarLabel: 'Sobre',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="info" size={size} color={color} />
                        ),
                    }}
                />
            </HomeTab.Navigator>
        </DrawerHome>
    );
};

export default HomeTabNavigator;
