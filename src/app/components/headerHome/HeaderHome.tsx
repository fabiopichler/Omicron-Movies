import React from 'react';

import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Logo from '@src/assets/images/logo.svg';
import Typography from '../common/typography/Typography';
import IconButton from '../common/iconButton/IconButton';

import { HEADER_SCROLL_DISTANCE } from '../common/scrollViewWithHeader/ScrollViewWithHeader';
import { IHeaderHomeProps } from './IHeaderHomeProps';
import { useDrawer } from '../drawerHome/DrawerHome';

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    menuIconView: {
        position: 'absolute',
        justifyContent: 'center',
        height: 56,
        marginLeft: 16,
    },
    textView: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        height: 56,
        marginLeft: 16,
    },
    text: {
    },
    logoView: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    logoContainer: {
        marginRight: 14,
        marginBottom: 16,
        opacity: .7,
    }
});

const HeaderHome: React.FC<IHeaderHomeProps> = ({ scrollY }) => {

    const navigation = useNavigation();
    const drawer = useDrawer();

    const logoSize = scrollY.interpolate({
        inputRange: [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [80, 28],
        extrapolate: 'clamp',
    });

    const titlePaddingLeft = scrollY.interpolate({
        inputRange: [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 38],
        extrapolate: 'clamp',
    });

    const handleNavigate = () => {
        navigation.navigate('AboutHome');
    }

    return (
        <View style={styles.root}>
            <View style={styles.menuIconView}>
                <IconButton
                    name="menu"
                    onPress={drawer.open}
                />
            </View>

            <Animated.View
                style={[styles.textView, { paddingLeft: titlePaddingLeft }]}
            >
                <Typography
                    type="title"
                    style={styles.text}
                >
                    Omicron Movies
                </Typography>
            </Animated.View>

            <View style={styles.logoView}>
                <Animated.View
                    style={[styles.logoContainer, {
                        height: logoSize,
                        width: logoSize,
                    }]}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleNavigate}
                    >
                        <Logo
                            width="100%"
                            height="100%"
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
};

export default HeaderHome;
