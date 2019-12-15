import React from 'react';
import Moment from 'react-moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StyleSheet, View } from 'react-native';

import Typography from '../common/typography/Typography';
import TextIcon from '../common/textIcon/TextIcon';

import { IMovieInfoProps } from './IMovieInfoProps';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,.07)',
    },
});

const MovieInfo: React.FC<IMovieInfoProps> = ({
    vote_average,
    runtime,
    release_date
}) => (
    <View style={styles.root}>
        <TextIcon
            textType="body1"
            iconName="star"
            iconColor="#fc6"
        >
            {vote_average} / 10
        </TextIcon>

        {runtime ? (
            <TextIcon
                textType="body1"
                iconComponent={MaterialCommunityIcons}
                iconName="clock"
                iconColor="rgba(255,255,255,.8)"
            >
                {runtime} min
            </TextIcon>
        ) : null}

        <TextIcon
            textType="body1"
            iconComponent={MaterialCommunityIcons}
            iconName="calendar-month"
            iconColor="rgba(255,255,255,.8)"
        >
            <Moment
                format="L"
                date={release_date}
                element={props => (
                    <Typography {...props} type="body1" />
                )}
            />
        </TextIcon>
    </View>
);

export default MovieInfo;
