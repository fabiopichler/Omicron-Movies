import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import InfiniteScroll from '@src/app/components/common/infiniteScroll/InfiniteScroll';

import Header from '@src/app/components/common/header/Header';
import MovieItemInfiniteScroll from '@src/app/components/movieItemInfiniteScroll/MovieItemInfiniteScroll';

import { Movie } from '@src/models/Movie';
import { Color } from '@src/colors';
import { IInfiniteScrollRenderItem } from '@src/app/components/common/infiniteScroll/IInfiniteScrollProps';
import { IMovieItemInfiniteScrollData } from '@src/app/components/movieItemInfiniteScroll/IMovieItemInfiniteScrollProps';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Color.backgroundPrimary,
    },
});

const MovieListScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { id, data, title, subtitle } = route.params as any;

    const modelRef = React.useRef<Movie | null>(null);

    React.useEffect(() => {
        modelRef.current = new Movie();

        return () => {
            if (modelRef.current)
                modelRef.current.close();

            if (__DEV__)
                modelRef.current = null;
        }
    }, []);

    const handlePress = React.useCallback((id: number): void => {
        navigation.navigate('Movie', { id });
    }, []);

    const renderItem = ({ item, index }: IInfiniteScrollRenderItem<IMovieItemInfiniteScrollData>): JSX.Element => (
        <MovieItemInfiniteScroll
            item={item}
            index={index}
            onPress={handlePress}
        />
    );

    return (
        <View style={styles.root}>
            <Header
                title={title}
                subtitle={subtitle}
                onPress={() => navigation.goBack()}
            />

            <InfiniteScroll
                modelRef={modelRef}
                id={id}
                data={data}
                renderItem={renderItem}
            />
        </View>
    );
};

export default MovieListScreen;
