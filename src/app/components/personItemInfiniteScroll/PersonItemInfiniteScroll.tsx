import React from 'react';

import { StyleSheet, View } from 'react-native';

import ImageButton from '../common/imageButton/ImageButton';
import Typography from '../common/typography/Typography';

import { Color } from '@src/colors';
import { IPersonItemInfiniteScrollProps } from './IPersonItemInfiniteScrollProps';
import { IMovieListResult } from '@src/models/IMovieListResult';
import { ITvListResult } from '@src/models/ITvListResult';
import { imagePathW500 } from '@src/helpers/string';

const styles = StyleSheet.create({
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
});

const PersonItemInfiniteScroll: React.FC<IPersonItemInfiniteScrollProps> = React.memo(({
    item,
    index,
    onPress
}) => (
    <ImageButton
        uri={imagePathW500(item.profile_path)}
        style={[styles.listItem, { marginTop: index === 0 ? 16 : 0 }]}
        direction="row"
        onPress={() => onPress(item.id)}
    >
        <View style={styles.content}>
            <Typography
                color="primary"
                style={styles.title}
            >
                {item.name}
            </Typography>

            {item.known_for.map((it, index) => (
                <Typography
                    type="body2"
                    key={index}
                >
                    • {(it as IMovieListResult).title || (it as ITvListResult).name}
                </Typography>
            ))}
        </View>
    </ImageButton>
));

export default PersonItemInfiniteScroll;
