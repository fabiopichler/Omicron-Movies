import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import InfoSection from '@src/app/components/infoSection/InfoSection';
import Separator from '@src/app/components/common/separator/Separator';
import ActivityIndicatorView from '@src/app/components/common/activityIndicatorView/ActivityIndicatorView';
import Overview from '@src/app/components/overview/Overview';
import HeaderMovie from '@src/app/components/headerMovie/HeaderMovie';
import MovieInfo from '@src/app/components/movieInfo/MovieInfo';
import ScrollViewWithHeader from '@src/app/components/common/scrollViewWithHeader/ScrollViewWithHeader';

import { IMovie } from '@src/models/IMovie';
import { arrayJoin, formatMoney, imagePathW500 } from '@src/helpers/string';
import { Movie } from '@src/models/Movie';
import { Color } from '@src/colors';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Color.backgroundPrimary,
    },
    scrollViewStyle: {
        paddingHorizontal: 16,
    },
});

const MovieShowScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { id } = route.params as any;

    const modelRef = React.useRef<Movie | null>(null);

    const [data, setData] = React.useState<IMovie | null>(null);
    const [loadedImages, setLoadedImages] = React.useState(0);

    React.useEffect(() => {
        modelRef.current = new Movie();
        modelRef.current.getData(id, data => setData(data));

        return () => {
            if (modelRef.current)
                modelRef.current.close();

            if (__DEV__)
                modelRef.current = null;
        }
    }, []);

    const handleBackdropLoad = (): void => {
        setLoadedImages(value => ++value);
    };

    const handleBackPress = (): void => {
        navigation.goBack();
    };

    return (
        <>
            {data ? (
                <View style={styles.root}>
                    <ScrollViewWithHeader
                        backdrop={imagePathW500(data.backdrop_path)}
                        onBackdropLoad={handleBackdropLoad}
                        renderHeader={props => (
                            <HeaderMovie
                                titleNavigation="Filme"
                                title={data.title}
                                onBackPress={handleBackPress}
                                {...props}
                            />
                        )}
                        scrollViewStyle={styles.scrollViewStyle}
                    >
                        {data.tagline ? (
                            <>
                                <InfoSection>{data.tagline}</InfoSection>

                                <Separator />
                            </>
                        ) : null}

                        <MovieInfo
                            vote_average={data.vote_average}
                            runtime={data.runtime}
                            release_date={data.release_date}
                        />

                        {data.genres.length > 0 ? (
                            <InfoSection>
                                {arrayJoin(data.genres, 'name')}
                            </InfoSection>
                        ) : null}
                        
                        <Overview
                            posterPath={data.poster_path}
                            overview={data.overview}
                            onLoad={handleBackdropLoad}
                        />

                        {data.production_companies.length > 0 ? (
                            <InfoSection title="Produção">
                                {arrayJoin(data.production_companies, 'name')}
                            </InfoSection>
                        ) : null}

                        {data.production_companies.length > 0 && data.revenue > 0 ? (
                            <Separator />
                        ) : null}

                        {data.revenue > 0 ? (
                            <InfoSection title="Bilheteria">
                                {formatMoney(data.revenue)}
                            </InfoSection>
                        ) : null}
                    </ScrollViewWithHeader>
                </View>
            ) : null}

            {loadedImages < 2 ? (
                <ActivityIndicatorView />
            ) : null}
        </>
    );
};

export default MovieShowScreen;
