import React from 'react';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Platform,
    Animated
} from 'react-native';

import Logo from '@src/assets/images/logo.svg';
import MenuList from './menuList/MenuList';
import Typography from '../common/typography/Typography';

import { Config } from '@src/config';
import { Color } from '@src/colors';
import { statusBarCurrentHeight } from '@src/helpers/system';

const DrawerLayoutAny: any = DrawerLayout; // <-- RTA 😱 (Recurso Técnico Alternativo)

const styles = StyleSheet.create({
    drawerAnimatedView: {
        flexGrow: 1,
    },
    drawerScrollView: {
        flexGrow: 1,
    },
    drawerScrollViewContainer: {
        flexGrow: 1,
    },
    drawerHeader: {
        height: 176 + statusBarCurrentHeight,
        marginBottom: 8,
        paddingTop: statusBarCurrentHeight,
        backgroundColor: '#004646',
    },
    drawerHeaderContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    drawerTitle: {
        marginTop: 6,
        marginBottom: 0,
        fontSize: 24,
    },
    drawerViewMenuList: {
        flexGrow: 1,
    },
    drawerFooter: {
        alignItems: 'center',
        padding: 12,
    },
    drawerFooterText: {
        fontSize: 14,
        color: Color.textSecondary,
        fontWeight: 'bold',
    },
});

interface IDrawerContext {
    open: () => void;
}

const initialValue: IDrawerContext = {
    open: () => { }
};

const DrawerContext = React.createContext<IDrawerContext>(initialValue);

const DrawerHome: React.FC = ({
    children,
}) => {

    const drawerRef = React.useRef<DrawerLayout>(null);

    const open = (): void => {
        if (drawerRef.current)
            drawerRef.current.openDrawer();
    }

    const closeDrawer = () => {
        if (drawerRef.current)
            drawerRef.current.closeDrawer();
    }

    const renderDrawer = (progressValue: Animated.Value) => {
        const parallax = progressValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-70, 0],
        });

        const animatedStyles = {
            transform: [{ translateX: parallax }],
        };

        return (
            <Animated.View style={[animatedStyles, styles.drawerAnimatedView]}>
                <ScrollView
                    style={styles.drawerScrollView}
                    contentContainerStyle={styles.drawerScrollViewContainer}
                >
                    <View style={styles.drawerHeader}>
                        <View style={styles.drawerHeaderContent}>
                            <Logo
                                width={80}
                                height={80}
                            />

                            <Typography style={styles.drawerTitle}>
                                Omicron Movies
                            </Typography>

                            <Typography>
                                por Fábio Pichler
                            </Typography>
                        </View>
                    </View>

                    <View style={styles.drawerViewMenuList}>
                        <MenuList
                            onItemPress={closeDrawer}
                        />
                    </View>

                    <View style={styles.drawerFooter}>
                        <Text style={styles.drawerFooterText}>
                            Versão {Config.appVersion}
                        </Text>
                    </View>
                </ScrollView>
            </Animated.View>
        );
    };

    return (
        <DrawerContext.Provider value={{ open }}>
            <DrawerLayoutAny
                ref={drawerRef}
                drawerWidth={270}
                edgeWidth={40}
                drawerPosition="left"
                drawerType="back"
                keyboardDismissMode="on-drag"
                drawerBackgroundColor="#1b243e"
                overlayColor="#00000000"
                renderNavigationView={renderDrawer}
                contentContainerStyle={
                    Platform.select({
                        ios: {
                            shadowColor: '#000',
                            shadowOpacity: 0.5,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 60,
                        },
                        android: {
                            elevation: 8,
                            backgroundColor: '#000',
                        },
                    })
                }
            >
                {children}
            </DrawerLayoutAny>
        </DrawerContext.Provider>
    );
};

export default DrawerHome;

export const useDrawer = (): IDrawerContext => React.useContext(DrawerContext);
