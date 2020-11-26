import React from 'react';

import { Linking, BackHandler } from 'react-native';

import { IMenuListProps } from './IMenuListProps';
import { useNavigation } from '@react-navigation/core';

import MenuItem from './menuItem/MenuItem';
import Separator from '../../common/separator/Separator';

const MenuList: React.FC<IMenuListProps> = ({
    onItemPress,
}) => {

    const navigation = useNavigation();

    const handleNavigate = (routeName: string) => () => {
        onItemPress();
        navigation.navigate(routeName);
    }

    const handleOpenURL = (url: string) => () => {
        onItemPress();
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

    return (
        <>
            <MenuItem
                title="Visitar o website oficial"
                icon="home"
                onPress={handleOpenURL('https://fabiopichler.net/omicron-movies')}
            />

            <MenuItem
                title="Página no Facebook"
                icon="facebook"
                onPress={handleOpenURL('https://www.facebook.com/fabiopichler.net')}
            />

            <MenuItem
                title="Perfil no Twitter"
                icon="twitter"
                onPress={handleOpenURL('https://twitter.com/FabioPichler')}
            />

            <Separator inMenu />

            <MenuItem
                title="Sair"
                icon="window-close"
                onPress={() => BackHandler.exitApp()}
            />
        </>
    );
};

export default MenuList;
