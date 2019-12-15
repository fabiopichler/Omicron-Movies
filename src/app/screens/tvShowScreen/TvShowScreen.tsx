import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import InfoSection from '@src/app/components/infoSection/InfoSection';
import ActivityIndicatorView from '@src/app/components/common/activityIndicatorView/ActivityIndicatorView';
import Overview from '@src/app/components/overview/Overview';
import HeaderMovie from '@src/app/components/headerMovie/HeaderMovie';
import MovieInfo from '@src/app/components/movieInfo/MovieInfo';
import ScrollViewWithHeader from '@src/app/components/common/scrollViewWithHeader/ScrollViewWithHeader';

import { arrayJoin, imagePathW500 } from '@src/helpers/string';
import { ITv } from '@src/models/ITv';
import { Tv } from '@src/models/Tv';
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

const TvShowScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { id } = route.params as any;

    const modelRef = React.useRef<Tv | null>(null);

    const [data, setData] = React.useState<ITv | null>(null);
    const [loadedImages, setLoadedImages] = React.useState(0);

    React.useEffect(() => {
        modelRef.current = new Tv();
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
                                titleNavigation="Série"
                                title={data.name}
                                onBackPress={handleBackPress}
                                {...props}
                            />
                        )}
                        scrollViewStyle={styles.scrollViewStyle}
                    >
                        <MovieInfo
                            vote_average={data.vote_average}
                            runtime={data.episode_run_time[0] || null}
                            release_date={data.first_air_date}
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
                    </ScrollViewWithHeader>
                </View>
            ) : null}

            {loadedImages < 2 ? (
                <ActivityIndicatorView />
            ) : null}
        </>
    );
};

export default TvShowScreen;
