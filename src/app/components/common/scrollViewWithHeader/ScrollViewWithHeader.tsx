import React from 'react';
import FastImage from 'react-native-fast-image';

import { StyleSheet, View, Animated, ScrollView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import { IScrollViewWithHeaderProps } from './IScrollViewWithHeaderProps';
import { statusBarCurrentHeight } from '@src/helpers/system';

const noImageBackdrop = require('@src/assets/images/no-image-backdrop.png');

export const HEADER_MAX_HEIGHT = 240;
export const HEADER_MIN_HEIGHT = 56 + (statusBarCurrentHeight || 0);
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
    animatedViewRoot: {
        elevation: 4,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#066',
        overflow: 'hidden',
        zIndex: 100,
    },
    coverAnimatedView: {
        height: HEADER_MAX_HEIGHT,
    },
    cover: {
        width: '100%',
        height: '100%',
        paddingTop: statusBarCurrentHeight,
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingTop: statusBarCurrentHeight,
        zIndex: 101,
    },
    scrollView: {
        flex: 1,
    },
});

const ScrollViewWithHeader: React.FC<IScrollViewWithHeaderProps> = ({
    backdrop,
    onBackdropLoad,
    renderHeader: RenderHeader,
    children,
    scrollViewStyle,
}) => {

    const scrollViewRef = React.useRef<ScrollView>(null);
    const scrollY = React.useRef(new Animated.Value(0)).current;

    useScrollToTop(scrollViewRef);

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0.3],
        extrapolate: 'clamp',
    });

    const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const backdropSource = (
        backdrop && typeof backdrop === 'number'
            ? backdrop
            : noImageBackdrop
    );

    return (
        <>
            <Animated.View style={[styles.animatedViewRoot, { height: headerHeight }]}>
                <Animated.View
                    style={[styles.coverAnimatedView, {
                        opacity: imageOpacity,
                        transform: [{ translateY: imageTranslate }]
                    }]}
                >
                    <FastImage
                        style={styles.cover}
                        source={backdrop && typeof backdrop === 'string' ? {
                            uri: backdrop,
                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.web,
                        } : backdropSource}
                        resizeMode={FastImage.resizeMode.cover}
                        onLoad={onBackdropLoad}
                    />
                </Animated.View>

                <View style={styles.container}>
                    <RenderHeader scrollY={scrollY} />
                </View>
            </Animated.View>

            <ScrollView
                ref={scrollViewRef}
                style={[styles.scrollView, scrollViewStyle]}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                <View style={{ height: HEADER_MAX_HEIGHT + 16 }} />

                {children}
            </ScrollView>
        </>
    );
};

export default ScrollViewWithHeader;
