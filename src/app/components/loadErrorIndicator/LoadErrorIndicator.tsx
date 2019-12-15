import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { StyleSheet, View, Button } from 'react-native';

import Typography from '../common/typography/Typography';

import { ILoadErrorIndicatorProps } from './ILoadErrorIndicatorProps';
import { statusBarCurrentHeight } from '@src/helpers/system';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: statusBarCurrentHeight,
        backgroundColor: '#500',
    },
    icon: {
        marginBottom: 10,
        color: '#f55',
    },
    info: {
        marginBottom: 16,
    }
});

const LoadErrorIndicator: React.FC<ILoadErrorIndicatorProps> = ({
    onReload,
}) => (
    <View style={styles.root}>
        <FontAwesome5
            name="exclamation"
            size={60}
            style={styles.icon}
        />

        <Typography
            type="title"
            paragraph
        >
            Ops!
        </Typography>

        <Typography
            type="subtitle"
            style={styles.info}
        >
            Erro ao carregar os dados
        </Typography>

        <Button
            title="Recarregar"
            color="#c00"
            onPress={onReload}
        />
    </View>
);

export default LoadErrorIndicator;
