import React from 'react';

import { StyleSheet, View, ActivityIndicator } from 'react-native';

import { Color } from '@src/colors';
import { statusBarCurrentHeight } from '@src/helpers/system';

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingTop: statusBarCurrentHeight,
        backgroundColor: Color.backgroundPrimary,
        zIndex: 1,
    },
});

const ActivityIndicatorView: React.FC = () => (
    <View style={styles.root}>
        <ActivityIndicator
            color={Color.primary}
            size={36}
        />
    </View>
);

export default ActivityIndicatorView;
