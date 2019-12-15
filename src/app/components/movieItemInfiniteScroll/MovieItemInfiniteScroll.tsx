import React from 'react';
import Moment from 'react-moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StyleSheet, View } from 'react-native';

import ImageButton from '../common/imageButton/ImageButton';
import TextIcon from '../common/textIcon/TextIcon';
import Typography from '../common/typography/Typography';

import { stringLimit, imagePathW500 } from '@src/helpers/string';
import { Color } from '@src/colors';
import { IMovieItemInfiniteScrollProps } from './IMovieItemInfiniteScrollProps';

const styles = StyleSheet.create({
    root: {
    },
    listItem: {
        backgroundColor: Color.backgroundCard,
        marginBottom: 16,
    },
    content: {
        flex: 1,
        padding: 8,
    },
    title: {
        marginBottom: 6,
        fontWeight: 'bold',
        fontSize: 13,
    },
    info: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    image: {
    },
    voteAverage: {
        marginRight: 12
    },
    voteAverageText: {
        color: 'rgba(255,255,255,.7)',
    },
});

const MovieItemInfiniteScroll: React.FC<IMovieItemInfiniteScrollProps> = React.memo(({
    item,
    index,
    onPress
}) => (
    <ImageButton
        uri={imagePathW500(item.poster_path)}
        imageStyle={styles.image}
        style={[styles.listItem, { marginTop: index === 0 ? 16 : 0 }]}
        direction="row"
        onPress={() => onPress(item.id)}
    >
        <View style={styles.content}>
            <Typography
                color="primary"
                style={styles.title}
            >
                {item.title || item.name}
            </Typography>

            <View style={styles.info}>
                <TextIcon
                    textType="body2"
                    iconName="star"
                    iconColor="#fc6"
                    style={styles.voteAverage}
                    textStyle={styles.voteAverageText}
                >
                    {item.vote_average}
                </TextIcon>

                <TextIcon
                    textType="body2"
                    iconComponent={MaterialCommunityIcons}
                    iconName="calendar-month"
                    iconColor={styles.voteAverageText.color}
                >
                    <Moment
                        format="L"
                        date={item.release_date || item.first_air_date}
                        element={props => (
                            <Typography
                                {...props}
                                type="body2"
                                style={styles.voteAverageText}
                            />
                        )}
                    />
                </TextIcon>
            </View>

            <Typography
                type="body2"
            >
                {stringLimit(item.overview, 300)}
            </Typography>
        </View>
    </ImageButton>
));

export default MovieItemInfiniteScroll;
