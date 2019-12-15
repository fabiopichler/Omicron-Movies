import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { ITypographyProps } from './ITypographyProps';
import { Color } from '@src/colors';

const styles = StyleSheet.create({
    root: {},
});

const sizes = {
    title: 18,
    subtitle: 16,
    default: 14,
    body1: 13,
    body2: 12,
}

const colors = {
    primary: Color.primary,
    textPrimary: Color.textPrimary,
    textSecondary: Color.textSecondary,
}

const Typography: React.FC<ITypographyProps> = ({
    type = 'default',
    color = 'textPrimary',
    paragraph,
    style,
    ...rest
}) => (
    <Text
        style={[
            styles.root,
            {
                fontSize: sizes[type],
                color: colors[color],
                marginBottom: paragraph ? 8 : undefined,
            },
            style
        ]}
        {...rest}
    />
);

export default Typography;
