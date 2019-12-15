import React from 'react';

import { StyleSheet, Keyboard, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import InfiniteScroll from '@src/app/components/common/infiniteScroll/InfiniteScroll';
import Header from '@src/app/components/common/header/Header';
import IconButton from '@src/app/components/common/iconButton/IconButton';
import PersonItemInfiniteScroll from '@src/app/components/personItemInfiniteScroll/PersonItemInfiniteScroll';

import { Search } from '@src/models/Search';
import { Color } from '@src/colors';
import { IInfiniteScrollRenderItem } from '@src/app/components/common/infiniteScroll/IInfiniteScrollProps';
import { IPersonListResult } from '@src/models/IPersonListResult';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Color.backgroundPrimary,
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
        marginRight: 20,
    },
    input: {
        flex: 1,
        height: 40,
        color: 'white',
    },
    placeholderText: {
        color: 'rgba(255,255,255,.5)',
    },
    button: {
        padding: 2,
    },
});

const PersonSearchScreen: React.FC = () => {
    const navigation = useNavigation();

    const infiniteScrollRef = React.useRef<InfiniteScroll>(null);
    const modelRef = React.useRef<Search | null>(null);

    const [text, setText] = React.useState('');

    React.useEffect(() => {
        modelRef.current = new Search();

        return () => {
            if (modelRef.current)
                modelRef.current.close();

            if (__DEV__)
                modelRef.current = null;
        }
    }, []);

    const handlePress = React.useCallback((id: number): void => {
        navigation.navigate('Person', { id });
    }, []);

    const handleSearch = () => {
        if (text.length > 0)
            Keyboard.dismiss();

        if (infiniteScrollRef.current)
            infiniteScrollRef.current.search(text);
    }

    const renderRightControls = () => (
        <View style={styles.inputView}>
            <TextInput
                autoFocus
                blurOnSubmit={false}
                placeholder={'Pesquisar pessoas'}
                keyboardType="web-search"
                returnKeyType="search"
                value={text}
                onChangeText={value => setText(value)}
                onSubmitEditing={handleSearch}
                style={styles.input}
                placeholderTextColor={styles.placeholderText.color}
            />

            <IconButton
                name="search"
                style={styles.button}
                onPress={handleSearch}
            />
        </View>
    );

    const renderItem = ({ item, index }: IInfiniteScrollRenderItem<IPersonListResult>): JSX.Element => (
        <PersonItemInfiniteScroll
            item={item}
            index={index}
            onPress={handlePress}
        />
    );

    return (
        <View style={styles.root}>
            <Header
                onPress={() => navigation.goBack()}
                rightControls={renderRightControls()}
            />

            <InfiniteScroll
                searchMode
                ref={infiniteScrollRef}
                modelRef={modelRef}
                id="person"
                renderItem={renderItem}
            />
        </View>
    );
};

export default PersonSearchScreen;
