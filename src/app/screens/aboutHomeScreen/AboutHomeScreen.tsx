import React from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Linking,
    BackHandler
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { TabActions } from '@react-navigation/routers';

import TheMovieDbLogo from '@src/assets/images/themoviedb-stacked-green.svg';
import HeaderHome from '@src/app/components/headerHome/HeaderHome';
import ScrollViewWithHeader from '@src/app/components/common/scrollViewWithHeader/ScrollViewWithHeader';
import Typography from '@src/app/components/common/typography/Typography';

import { Color } from '@src/colors';
import { Config } from '@src/config';
import { currentRouteName } from '@src/app/appNavigator/HomeTabNavigator';

const AboutBackdrop = require('@src/assets/images/about-backdrop.jpg');

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        backgroundColor: Color.backgroundPrimary,
    },
    scrollView: {
        paddingHorizontal: 16,
    },
    tmdbView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 8,
    },
    tmdbText: {
        flex: 1,
        marginLeft: 8,
    },
    license: {
        marginVertical: 16,
        padding: 16,
        paddingTop: 10,
        backgroundColor: Color.backgroundCard,
    }
});

const AboutHomeScreen: React.FC = () => {

    const navigation = useNavigation();

    useFocusEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => backHandler.remove();
    });

    const handleBackPress = () => {
        currentRouteName(value => {
            navigation.dispatch(TabActions.jumpTo(value));
        });

        return true;
    }

    return (
        <View style={styles.root}>
            <ScrollViewWithHeader
                backdrop={AboutBackdrop}
                renderHeader={HeaderHome}
                scrollViewStyle={styles.scrollView}
            >
                <Typography
                    type="title"
                    color="primary"
                >
                    Omicron Movies v{Config.appVersion}
                </Typography>

                <Typography
                    type="body1"
                    color="textSecondary"
                    paragraph
                >
                    &copy; 2019, Fábio Pichler
                </Typography>

                <Typography
                    type="body1"
                    paragraph
                >
                    Acompanhe a lista de séries e filmes populares, próximas estreias, veja informações, pôsteres e muito mais das suas séries e filmes favoritos com o Omicron Movies.
                </Typography>

                <Typography
                    type="body1"
                    paragraph
                >
                    O aplicativo não serve para baixar ou assistir a séries e filmes.
                </Typography>

                <View style={styles.tmdbView}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => Linking.openURL('https://www.themoviedb.org/').catch(() => { })}
                    >
                        <TheMovieDbLogo
                            width={40}
                            height={44}
                        />
                    </TouchableOpacity>

                    <Typography
                        type="body1"
                        style={styles.tmdbText}
                    >
                        Este produto usa a API TMDb, mas não é endossado ou certificado pelo TMDb.
                    </Typography>
                </View>

                <Typography
                    type="subtitle"
                    color="primary"
                >
                    Informações
                </Typography>

                <Typography
                    type="body1"
                    color="textSecondary"
                >
                    Versão: {Config.appVersion}
                    {'\n'}
                    Desenvolvido com: React Native
                </Typography>

                <View style={styles.license}>
                    <Typography
                        type="subtitle"
                        color="primary"
                        paragraph
                    >
                        Licença
                    </Typography>

                    <Typography
                        type="body1"
                        paragraph
                    >
                        MIT License (MIT)
                    </Typography>

                    <Typography
                        type="body1"
                        paragraph
                    >
                        Copyright (c) 2019 Fábio Pichler
                    </Typography>

                    <Typography
                        type="body1"
                        paragraph
                    >
                        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                    </Typography>

                    <Typography
                        type="body1"
                        paragraph
                    >
                        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                    </Typography>

                    <Typography
                        type="body1"
                    >
                        THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                    </Typography>
                </View>
            </ScrollViewWithHeader>
        </View>
    );
};

export default AboutHomeScreen;
