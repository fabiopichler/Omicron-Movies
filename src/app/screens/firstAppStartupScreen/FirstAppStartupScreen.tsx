import React from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Header from '@src/app/components/common/header/Header';
import FooterInfo from '@src/app/components/footerInfo/FooterInfo';
import Typography from '@src/app/components/common/typography/Typography';

import { Color } from '@src/colors';

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        backgroundColor: Color.backgroundPrimary,
    },
    scrollView: {
        flexGrow: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 340,
        margin: 16,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.2)',
        backgroundColor: 'rgba(0,0,0,.2)',
    },
    buttonText: {
        color: 'rgba(255,255,255,.8)',
        fontWeight: 'bold',
    },
    textCenter: {
        textAlign: 'center',
    }
});

const FirstAppStartupScreen: React.FC = () => {

    const navigation = useNavigation();

    React.useEffect(() => {
        (changeNavigationBarColor as any)(Color.backgroundPrimary, false);

        return () => {
            (changeNavigationBarColor as any)('#000000', false);
        }
    }, []);

    const handlePress = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.root}>
            <Header
                title="Em desenvolvimento"
                onPress={handlePress}
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContainer}
            >
                <View style={styles.wrapper}>
                    <Typography
                        type="title"
                        color="primary"
                        paragraph
                        style={styles.textCenter}
                    >
                        Em fase de desenvolvimento
                    </Typography>

                    <Typography
                        paragraph
                        style={styles.textCenter}
                    >
                        Atualmente, este aplicativo possui recursos incompletos e muito limitados.
                    </Typography>

                    <Typography
                        paragraph
                        style={styles.textCenter}
                    >
                        Novos recursos serão adicionados gradualmente em novas versões.
                    </Typography>

                    <Typography
                        style={styles.textCenter}
                    >
                        Apesar dos recursos incompletos, esta é uma versão estável o suficiente para uso.
                    </Typography>
                </View>

                <FooterInfo />

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.button}
                        onPress={handlePress}
                    >
                        <Typography style={styles.buttonText}>
                            Ok! Entendi
                        </Typography>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default FirstAppStartupScreen;
