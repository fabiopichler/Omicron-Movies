import React from 'react';

import { StyleSheet, View } from 'react-native';

import Typography from '../typography/Typography';
import IconButton from '../iconButton/IconButton';

import { IHeaderProps } from './IHeaderProps';
import { statusBarCurrentHeight } from '@src/helpers/system';

const styles = StyleSheet.create({
    topNavigationLayout: {
        paddingTop: statusBarCurrentHeight,
        backgroundColor: '#006666',
        elevation: 4,
    },
    topNavigation: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 16,
        backgroundColor: '#004646',
    },
    textView: {
        marginLeft: 16,
    },
    title: {
        lineHeight: 18
    },
});

const Header: React.FC<IHeaderProps> = ({
    title,
    subtitle,
    onPress,
    rightControls,
}) => (
    <View style={styles.topNavigationLayout}>
        <View style={styles.topNavigation}>
            <IconButton
                name="arrow-back"
                onPress={onPress}
            />

            {title || subtitle ? (
                <View style={styles.textView}>
                    {title ? (
                        <Typography
                            type="subtitle"
                            style={styles.title}
                        >
                            {title}
                        </Typography>
                    ) : null}

                    {subtitle ? (
                        <Typography
                            type="body2"
                            color="textSecondary"
                        >
                            {subtitle}
                        </Typography>
                    ) : null}
                </View>
            ) : null}

            {rightControls}
        </View>
    </View>
);

export default Header;
