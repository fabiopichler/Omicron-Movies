import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { StyleSheet, View } from 'react-native';

import Typography from '../typography/Typography';

import { ITextIconProps } from './ITextIconProps';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
    },
    text: {
        marginLeft: 3,
    }
});

const iconSizes = {
    title: 22,
    subtitle: 20,
    default: 18,
    body1: 16,
    body2: 14,
};

const TextIcon: React.FC<ITextIconProps> = ({
    textType = 'body1',
    iconStyle,
    textStyle,
    iconComponent: Icon = MaterialIcons,
    iconName,
    iconSize = iconSizes[textType],
    iconColor = 'white',
    children,
    style
}) => (
    <View style={[styles.root, style]}>
        <Icon
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={[styles.icon, iconStyle]}
        />

        <Typography
            type={textType}
            style={[styles.text, textStyle]}
        >
            {children}
        </Typography>
    </View>
);

export default TextIcon;
