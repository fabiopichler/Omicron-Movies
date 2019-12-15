import React from 'react';

import { StyleSheet } from 'react-native';

import TextIcon from '../../common/textIcon/TextIcon';
import Typography from '../../common/typography/Typography';
import ImageButton from '../../common/imageButton/ImageButton';

import { IMovieListItemProps } from './IMovieListItemProps';
import { imagePathW500 } from '@src/helpers/string';

const styles = StyleSheet.create({
    root: {
        marginRight: 16,
    },
    image: {
        marginBottom: 6,
    },
    voteAverage: {
        color: 'rgba(255,255,255,.5)',
    },
});

const MovieListItem: React.FC<IMovieListItemProps> = React.memo(({
    item,
    index,
    onPress
}) => {

    const [width, setWidth] = React.useState(150);

    const handleChangeSize = React.useCallback((width: number, height: number): void => {
        setWidth(width);
    }, []);

    const handlePress = React.useCallback(() => onPress(item.id), []);

    return (
        <ImageButton
            uri={imagePathW500(item.poster_path || item.profile_path)}
            onPress={handlePress}
            style={[styles.root, {
                marginLeft: index === 0 ? 16 : 0,
                width,
            }]}
            imageStyle={styles.image}
            direction="column"
            onChangeSize={handleChangeSize}
        >
            <Typography type="body2">{item.title || item.name}</Typography>

            {item.vote_average ? (
                <TextIcon
                    textType="body2"
                    iconName="star"
                    iconColor="#fc6"
                    textStyle={styles.voteAverage}
                >
                    {item.vote_average}
                </TextIcon>
            ) : null}
        </ImageButton>
    );
});

export default MovieListItem;
