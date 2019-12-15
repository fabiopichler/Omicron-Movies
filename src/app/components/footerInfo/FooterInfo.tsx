import React from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Linking
} from 'react-native';

import Logo from '@src/assets/images/themoviedb-primary-green.svg';
import Typography from '../common/typography/Typography';

const styles = StyleSheet.create({
    root: {
        alignSelf: 'center',
        alignItems: 'center',
        maxWidth: 300,
        marginTop: 8,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    tmdb: {
        textAlign: 'center',
        marginTop: 8,
    },
    appName: {
        fontWeight: 'bold',
    }
});

const FooterInfo: React.FC = () => (
    <View style={styles.root}>
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Linking.openURL('https://www.themoviedb.org/').catch(() => {})}
        >
            <Logo
                width={70}
                height={62}
            />
        </TouchableOpacity>

        <Typography
            type="body1"
            paragraph
            style={styles.tmdb}
        >
            Este produto usa a API TMDb, mas não é endossado ou certificado pelo TMDb.
        </Typography>

        <Typography
            type="body1"
            color="textSecondary"
            style={styles.appName}
        >
            Omicron Movies
        </Typography>

        <Typography
            type="body1"
            color="textSecondary"
        >
            &copy; 2019, Fábio Pichler
        </Typography>
    </View>
);

export default FooterInfo;
