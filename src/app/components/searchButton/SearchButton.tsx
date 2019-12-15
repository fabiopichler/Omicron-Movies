import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { StyleSheet, TouchableOpacity } from 'react-native';

import Typography from '../common/typography/Typography';

import { ISearchButtonProps } from './ISearchButtonProps';

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.2)',
        backgroundColor: 'rgba(0,0,0,.2)',
        borderRadius: 0,
    },
    buttonText: {
        marginLeft: 12,
        color: 'rgba(255,255,255,.8)',
        fontWeight: 'bold',
    },
});

const SearchButton: React.FC<ISearchButtonProps> = ({
    children,
    onPress
}) => (
    <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={onPress}
    >
        <FontAwesome5
            name="search"
            size={12}
            color={styles.buttonText.color}
        />

        <Typography
            type="body1"
            style={styles.buttonText}
        >
            {children}
        </Typography>
    </TouchableOpacity>
);

export default SearchButton;
