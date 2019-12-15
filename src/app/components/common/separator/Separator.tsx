import React from 'react';

import { StyleSheet, View } from 'react-native';

import { ISeparatorProps } from './ISeparatorProps';

const styles = StyleSheet.create({
    root: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,.07)',
    },
});

const Separator: React.FC<ISeparatorProps> = ({
    inMenu,
}) => (
    <View
        style={[
            styles.root,
            {
                marginTop: inMenu ? 10 : undefined,
                marginBottom: inMenu ? 10 : 16,
            }
        ]}
    />
);

export default Separator;
