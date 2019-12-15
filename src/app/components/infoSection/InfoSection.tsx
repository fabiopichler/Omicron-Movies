import React from 'react';

import { StyleSheet } from 'react-native';

import Typography from '../common/typography/Typography';

import { IInfoSectionProps } from './IInfoSectionProps';

const styles = StyleSheet.create({
    title: {
        marginBottom: 8,
        textAlign: 'center',
    },
    content: {
        marginBottom: 16,
        textAlign: 'center',
    }
});

const InfoSection: React.FC<IInfoSectionProps> = ({
    title,
    children
}) => (
    <>
        {title ? (
            <Typography
                type="body1"
                color="textSecondary"
                style={styles.title}
            >
                {title.toUpperCase()}
            </Typography>
        ) : null}

        <Typography
            type="body1"
            style={styles.content}
        >
            {children}
        </Typography>
    </>
);

export default InfoSection;
