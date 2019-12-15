import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Typography from '../common/typography/Typography';
import ImageButton from '../common/imageButton/ImageButton';

import { IOverviewProps } from './IOverviewProps';
import { imagePathW500 } from '@src/helpers/string';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        margin: 1,
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#333',
        elevation: 2,
    },
    desc: {
        flex: 1,
        marginVertical: -2,
        paddingLeft: 10,
    },
});

const Overview: React.FC<IOverviewProps> = ({
    posterPath: poster_path,
    overview,
    onLoad,
}) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if (!poster_path)
            return;

        navigation.navigate('ShowPoster', {
            path: poster_path,
        });
    };

    return (
        <View style={styles.root}>
            <ImageButton
                uri={imagePathW500(poster_path)}
                onLoad={onLoad}
                onPress={handlePress}
                direction="column"
            />

            {overview ? (
                <Typography
                    type="body1"
                    style={styles.desc}
                >
                    {overview}
                </Typography>
            ) : null}
        </View>
    );
};

export default Overview;
