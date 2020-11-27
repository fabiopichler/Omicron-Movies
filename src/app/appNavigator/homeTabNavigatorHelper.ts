import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeRouteName = async (name: string) => {
    try {
        await AsyncStorage.setItem('AppNavigatorInitialRouteName', name);
    } catch (e) { }
};

export const currentRouteName = async (func: (value: string) => void) => {
    try {
        const value = await AsyncStorage.getItem('AppNavigatorInitialRouteName');

        if (value !== null) {
            func(value);

            return;
        }

    } catch (e) { }

    func('MovieHome');
};
