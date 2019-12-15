import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/core';

import MovieList from '@src/app/components/movieList/MovieList';
import ActivityIndicatorView from '@src/app/components/common/activityIndicatorView/ActivityIndicatorView';
import CarouselHome from '@src/app/components/carouselHome/CarouselHome';
import HeaderHome from '@src/app/components/headerHome/HeaderHome';
import ScrollViewWithHeader from '@src/app/components/common/scrollViewWithHeader/ScrollViewWithHeader';
import SearchButton from '@src/app/components/searchButton/SearchButton';
import FooterInfo from '@src/app/components/footerInfo/FooterInfo';
import LoadErrorIndicator from '@src/app/components/loadErrorIndicator/LoadErrorIndicator';

import { IMovieListResult } from '@src/models/IMovieListResult';
import { storeRouteName } from '@src/app/appNavigator/HomeTabNavigator';
import { Movie } from '@src/models/Movie';
import { IMovieListData } from '@src/app/components/movieList/movieListItem/IMovieListItemProps';
import { Color } from '@src/colors';
import { imagePathW500 } from '@src/helpers/string';

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        backgroundColor: Color.backgroundPrimary,
    },
    carousel: {
        marginBottom: 20,
    },
});

const IDs = [
    'popular',
    'top_rated',
    'upcoming',
    'now_playing'
];

const coverMovieID = '157336'; // Interstellar

const MovieHomeScreen: React.FC = () => {
    const navigation = useNavigation();

    const modelRef = React.useRef<Movie | null>(null);

    const [data, setData] = React.useState<Map<string, IMovieListResult[]>>(new Map());
    const [cover, setCover] = React.useState<string | null>(null);
    const [error, setError] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            storeRouteName('MovieHome');
        }, [])
    );

    React.useEffect(() => {
        init();

        return close;
    }, []);

    const init = () => {
        modelRef.current = new Movie();
        modelRef.current.getData(
            coverMovieID,
            data => setCover(data.backdrop_path),
            handleError
        );

        IDs.forEach(id => {
            if (modelRef.current) {
                modelRef.current.getDataList(id, data => {
                    setData(value => new Map([...value, [id, data]]))
                }, handleError)
            }
        });
    };

    const close = (reload?: boolean) => {
        if (modelRef.current)
            modelRef.current.close();

        if (__DEV__ || reload) {
            modelRef.current = null;
            setData(new Map());
        }
    };

    const handleReload = () => {
        close();
        setError(false);
        init();
    };

    const handleError = () => setError(true);

    const handlePress = React.useCallback((id: number): void => {
        navigation.navigate('Movie', { id });
    }, []);

    const handleTitlePress = (id: string, data: IMovieListData[], title: string, subtitle: string): void => {
        navigation.navigate('MovieList', { id, data, title, subtitle });
    };

    const handleSearchPress = (): void => {
        navigation.navigate('Search', { route: 'Movie', id: 'movie', placeholder: 'Pesquisar filmes' });
    };

    if (error)
        return <LoadErrorIndicator onReload={handleReload} />;

    if (data.size < 4 || !cover)
        return <ActivityIndicatorView />;

    return (
        <View style={styles.root}>
            <ScrollViewWithHeader
                backdrop={imagePathW500(cover)}
                renderHeader={HeaderHome}
            >
                <SearchButton
                    onPress={handleSearchPress}
                >
                    Pesquisar filmes
                </SearchButton>

                <CarouselHome<IMovieListResult>
                    data={data}
                    style={styles.carousel}
                    totalItems={4}
                />

                <MovieList
                    id="popular"
                    data={data.get('popular')!}
                    onPress={handlePress}
                    onTitlePress={handleTitlePress}
                    title="Populares"
                    description="Filmes populares"
                />

                <MovieList
                    id="top_rated"
                    data={data.get('top_rated')!}
                    onPress={handlePress}
                    onTitlePress={handleTitlePress}
                    title="Top filmes"
                    description="Filmes mais bem avaliados"
                />

                <MovieList
                    id="upcoming"
                    data={data.get('upcoming')!}
                    onPress={handlePress}
                    onTitlePress={handleTitlePress}
                    title="Próximas estreias"
                    description="Filmes que estreiam em breve"
                />

                <MovieList
                    id="now_playing"
                    data={data.get('now_playing')!}
                    onPress={handlePress}
                    onTitlePress={handleTitlePress}
                    title="Em cartaz"
                    description="Filmes atualmente em cartaz"
                />

                <FooterInfo />
            </ScrollViewWithHeader>
        </View>
    );
};

export default MovieHomeScreen;
