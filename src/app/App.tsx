import React from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { StatusBar } from 'react-native';

import AppNavigator from './appNavigator/AppNavigator';

const App: React.FC = () => {

    React.useEffect(() => {
        StatusBar.setTranslucent(true);
        (changeNavigationBarColor as any)('#000000', false);
    }, []);

    return (
        <>
            <StatusBar backgroundColor="rgba(0,0,0,.5)" />

            <AppNavigator />
        </>
    );
};

export default App;
