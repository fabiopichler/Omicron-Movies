import React from 'react';

import { StyleSheet, Animated, View } from 'react-native';

import Typography from '../common/typography/Typography';
import IconButton from '../common/iconButton/IconButton';

import { IHeaderMovieProps } from './IHeaderMovieProps';
import { HEADER_SCROLL_DISTANCE } from '../common/scrollViewWithHeader/ScrollViewWithHeader';

const styles = StyleSheet.create({
    topNavigation: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 16,
    },
    topNavigationTitle: {
        marginLeft: 12,
    },
    titleView: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom: 16,
    },
    title: {
        width: '100%',
        paddingHorizontal: 16,
        textShadowColor: '#000',
        textShadowRadius: 8,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const HeaderMovie: React.FC<IHeaderMovieProps> = ({
    titleNavigation,
    title,
    onBackPress,
    scrollY
}) => {

    const textOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE - 20],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    });

    return (
        <>
            <View style={styles.topNavigation}>
                <IconButton
                    name="arrow-back"
                    onPress={onBackPress}
                />

                <Typography
                    type="subtitle"
                    style={styles.topNavigationTitle}
                >
                    {titleNavigation}
                </Typography>
            </View>

            <Animated.View
                style={[styles.titleView, {
                    opacity: textOpacity
                }]}
            >
                <Typography
                    type="title"
                    style={styles.title}
                >
                    {title}
                </Typography>
            </Animated.View>
        </>
    );
};

export default HeaderMovie;
