import React from 'react';
import FastImage from 'react-native-fast-image';

import { StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import ActivityIndicatorView from '../../components/common/activityIndicatorView/ActivityIndicatorView';
import IconButton from '@src/app/components/common/iconButton/IconButton';

import { imagePathOriginal } from '@src/helpers/string';
import { statusBarCurrentHeight } from '@src/helpers/system';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: statusBarCurrentHeight,
        backgroundColor: 'black',
    },
    topNavigation: {
        position: 'absolute',
        height: 56,
        justifyContent: 'center',
        marginTop: statusBarCurrentHeight,
        marginLeft: 16,
        zIndex: 100,
    },
    image: {
        width: '100%',
        flexGrow: 1,
    },
});

const PosterShowScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { path } = route.params as { path: string };

    const [loaded, setLoaded] = React.useState(false);

    if (!path)
        return null;

    return (
        <>
            <View style={styles.root}>
                <View style={styles.topNavigation}>
                    <IconButton
                        name="arrow-back"
                        onPress={() => navigation.goBack()}
                    />
                </View>

                <FastImage
                    style={styles.image}
                    source={{
                        uri: imagePathOriginal(path),
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.web,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    onLoad={() => setLoaded(true)}
                />
            </View>

            {loaded ? null : (
                <ActivityIndicatorView />
            )}
        </>
    );
};

export default PosterShowScreen;
