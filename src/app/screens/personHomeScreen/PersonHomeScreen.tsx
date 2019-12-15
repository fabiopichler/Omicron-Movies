import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/core';

import ActivityIndicatorView from '@src/app/components/common/activityIndicatorView/ActivityIndicatorView';
import HeaderHome from '@src/app/components/headerHome/HeaderHome';
import ScrollViewWithHeader from '@src/app/components/common/scrollViewWithHeader/ScrollViewWithHeader';
import SearchButton from '@src/app/components/searchButton/SearchButton';
import FooterInfo from '@src/app/components/footerInfo/FooterInfo';
import MovieList from '@src/app/components/movieList/MovieList';
import LoadErrorIndicator from '@src/app/components/loadErrorIndicator/LoadErrorIndicator';

import { storeRouteName } from '@src/app/appNavigator/HomeTabNavigator';
import { Movie } from '@src/models/Movie';
import { Color } from '@src/colors';
import { Person } from '@src/models/Person';
import { IPersonListResult } from '@src/models/IPersonListResult';
import { IMovieListData } from '@src/app/components/movieList/movieListItem/IMovieListItemProps';
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

const ID = 'popular';

const coverMovieID = '24428'; // The Avengers

const PersonHomeScreen: React.FC = () => {
    const navigation = useNavigation();

    const modelRef = React.useRef<Person | null>(null);
    const movieRef = React.useRef<Movie | null>(null);

    const [data, setData] = React.useState<IPersonListResult[]>([]);
    const [cover, setCover] = React.useState<string | null>(null);
    const [error, setError] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            storeRouteName('PersonHome');
        }, [])
    );

    React.useEffect(() => {
        init();

        return close;
    }, []);

    const init = () => {
        modelRef.current = new Person();
        modelRef.current.getDataList(ID, data => setData(data), handleError);

        movieRef.current = new Movie();
        movieRef.current.getData(
            coverMovieID,
            data => setCover(data.backdrop_path),
            handleError
        );
    };

    const close = (reload?: boolean) => {
        if (modelRef.current)
            modelRef.current.close();

        if (movieRef.current)
            movieRef.current.close();

        if (__DEV__ || reload) {
            modelRef.current = null;
            movieRef.current = null;
        }
    };

    const handleReload = () => {
        close();
        setError(false);
        init();
    }

    const handleError = () => setError(true);

    const handlePress = React.useCallback((id: number): void => {
        navigation.navigate('Person', { id });
    }, []);

    const handleTitlePress = (id: string, data: IMovieListData[], title: string, subtitle: string): void => {
        navigation.navigate('PersonList', { id, data, title, subtitle });
    };

    const handleSearchPress = (): void => {
        navigation.navigate('PersonSearch');
    };

    if (error)
        return <LoadErrorIndicator onReload={handleReload} />;

    if (!data || data.length === 0 || !cover)
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
                    Pesquisar pessoas
                </SearchButton>

                <MovieList
                    id="popular"
                    data={data}
                    onPress={handlePress}
                    onTitlePress={handleTitlePress}
                    title="Populares"
                    description="Pessoas populares"
                />

                <FooterInfo />
            </ScrollViewWithHeader>
        </View>
    );
};

export default PersonHomeScreen;
