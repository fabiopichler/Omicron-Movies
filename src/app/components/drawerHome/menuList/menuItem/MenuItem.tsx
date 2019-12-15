import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { StyleSheet, TouchableOpacity } from 'react-native';

import Typography from '@src/app/components/common/typography/Typography';

import { IMenuItemProps } from './IMenuItemProps';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    icon: {
        marginHorizontal: 18,
    },
    text: {
        color: 'rgba(255,255,255,.8)',
    }
});

const MenuItem: React.FC<IMenuItemProps> = ({
    title,
    icon,
    onPress,
}) => (
    <TouchableOpacity
        activeOpacity={0.7}
        style={styles.root}
        onPress={onPress}
    >
        <Icon
            name={icon}
            size={24}
            color="rgba(255,255,255,.6)"
            style={styles.icon}
        />

        <Typography style={styles.text}>
            {title}
        </Typography>
    </TouchableOpacity>
);

export default MenuItem;
