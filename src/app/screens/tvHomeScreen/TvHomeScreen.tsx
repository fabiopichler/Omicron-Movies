import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/core';

import MovieList from '@src/app/components/movieList/MovieList';
import ActivityIndicatorView from '@src/app/components/common/activityIndicatorView/ActivityIndicatorView';
import CarouselHome from '@src/app/components/carouselHome/CarouselHome';
import ScrollViewWithHeader from '@src/app/components/common/scrollViewWithHeader/ScrollViewWithHeader';
import HeaderHome from '@src/app/components/headerHome/HeaderHome';
import SearchButton from '@src/app/components/searchButton/SearchButton';
import FooterInfo from '@src/app/components/footerInfo/FooterInfo';
import LoadErrorIndicator from '@src/app/components/loadErrorIndicator/LoadErrorIndicator';

import { ITvListResult } from '@src/models/ITvListResult';
import { storeRouteName } from '@src/app/appNavigator/homeTabNavigatorHelper';
import { Tv } from '@src/models/Tv';
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
    'on_the_air',
    'airing_today'
];

const coverTvID = '60625'; // Rick and Morty

const TvHomeScreen: React.FC = () => {
    const navigation = useNavigation();

    const modelRef = React.useRef<Tv | null>(null);

    const [data, setData] = React.useState<Map<string, ITvListResult[]>>(new Map());
    const [cover, setCover] = React.useState<string | null>(null);
    const [error, setError] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            storeRouteName('TvHome');
        }, [])
    );

    React.useEffect(() => {
        init();

        return close;
    }, []);

    const init = () => {
        modelRef.current = new Tv();
        modelRef.current.getData(
            coverTvID,
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
        navigation.navigate('Tv', { id });
    }, []);

    const handleTitlePress = (id: string, data: IMovieListData[], title: string, subtitle: string): void => {
        navigation.navigate('TvList', { id, data, title, subtitle });
    };

    const handleSearchPress = (): void => {
        navigation.navigate('Search', { route: 'Tv', id: 'tv', placeholder: 'Pesquisar séries' });
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
                    Pesquisar séries
                </SearchButton>

                <CarouselHome<ITvListResult>
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
                    description="Séries Populares"
                />

                <MovieList
                    id="top_rated"
                    data={data.get('top_rated')!}
                    onPress={handlePress}
                    onTitlePress={handleTitlePress}
                    title="Top séries"
                    description="Séries mais bem avaliadas"
                />

                <MovieList
                    id="on_the_air"
                    data={data.get('on_the_air')!}
                    onPress={handlePress}
                    onTitlePress={handleTitlePress}
                    title="Na TV"
                    description="Séries atualmente em exibição"
                />

                <MovieList
                    id="airing_today"
                    data={data.get('airing_today')!}
                    onPress={handlePress}
                    onTitlePress={handleTitlePress}
                    title="Hoje na TV"
                    description="Séries exibidas no dia de hoje na TV"
                />

                <FooterInfo />
            </ScrollViewWithHeader>
        </View>
    );
};

export default TvHomeScreen;
