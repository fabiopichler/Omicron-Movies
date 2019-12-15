import React from 'react';

import { FlatList, StyleSheet, View, Dimensions } from 'react-native';

import Typography from '../common/typography/Typography';
import IconButton from '../common/iconButton/IconButton';
import MovieListItem from './movieListItem/MovieListItem';

import { IMovieListProps, IMovieListRenderItem } from './IMovieListProps';
import { IMovieListData } from './movieListItem/IMovieListItemProps';

const { width: windowWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: windowWidth,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 16,
    },
    textView: {
        flexGrow: 1,
    },
    button: {
        padding: 2,
    },
});

const MovieList: React.FC<IMovieListProps> = ({ id,
    data: dataProps,
    onPress,
    title,
    description,
    onTitlePress
}) => {

    const [data, setData] = React.useState<IMovieListData[]>([]);
    const [dataRest, setDataRest] = React.useState(false);

    React.useEffect(() => {
        setData(dataProps.slice(0, 10));
    }, []);

    const handleRenderItem = ({
        item,
        index
    }: IMovieListRenderItem): JSX.Element => (
        <MovieListItem
            item={item}
            index={index}
            onPress={onPress}
        />
    );

    const handleMore = (info: { distanceFromEnd: number }) => {
        if (!dataRest) {
            setDataRest(true);
            setData(data => [...data, ...dataProps.slice(10, 20)]);
        }
    };

    if (data.length === 0)
        return null;

    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <View style={styles.textView}>
                    <Typography
                        type="title"
                        color="primary"
                    >
                        {title}
                    </Typography>

                    {description ? (
                        <Typography
                            type="body2"
                            color="textSecondary"
                        >
                            {description}
                        </Typography>
                    ) : null}
                </View>

                <IconButton
                    name="arrow-forward"
                    style={styles.button}
                    onPress={() => onTitlePress(id, dataProps, title, description)}
                />
            </View>

            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={handleRenderItem}
                keyExtractor={(item: IMovieListData) => String(item.id)}
                onEndReached={handleMore}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

export default MovieList;
