import React from 'react';

import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import ActivityIndicatorView from '@src/app/components/common/activityIndicatorView/ActivityIndicatorView';
import Overview from '@src/app/components/overview/Overview';
import Header from '@src/app/components/common/header/Header';

import { Color } from '@src/colors';
import { Person } from '@src/models/Person';
import { IPerson } from '@src/models/IPerson';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Color.backgroundPrimary,
    },
    scrollView: {
        paddingHorizontal: 16,
    },
});

const PersonShowScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { id } = route.params as any;

    const modelRef = React.useRef<Person | null>(null);

    const [data, setData] = React.useState<IPerson | null>(null);
    const [loadedImages, setLoadedImages] = React.useState(0);

    React.useEffect(() => {
        modelRef.current = new Person();
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

    return (
        <>
            {data ? (
                <View style={styles.root}>
                    <Header
                        title={data.name}
                        onPress={() => navigation.goBack()}
                    />

                    <ScrollView style={styles.scrollView}>
                        <View style={{ height: 16 }} />
                        
                        <Overview
                            posterPath={data.profile_path}
                            overview={data.biography}
                            onLoad={handleBackdropLoad}
                        />
                    </ScrollView>
                </View>
            ) : null}

            {loadedImages < 1 ? (
                <ActivityIndicatorView />
            ) : null}
        </>
    );
};

export default PersonShowScreen;
