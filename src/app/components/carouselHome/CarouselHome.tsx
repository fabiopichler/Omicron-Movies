import React from 'react';
import FastImage from 'react-native-fast-image';

import { StyleSheet, Dimensions, View } from 'react-native';

import Typography from '../common/typography/Typography';
import TextIcon from '../common/textIcon/TextIcon';
import Carousel, { dataToCarousel } from '../common/carousel/Carousel';

import { ICarouselHomeProps, ICarouselHomeData } from './ICarouselHomeProps';
import { ICarouselRenderItemProps } from '../common/carousel/ICarouselProps';
import { imagePathW500 } from '@src/helpers/string';

const noImageBackdrop = require('@src/assets/images/no-image-backdrop.png');

const styles = StyleSheet.create({
    root: {
        marginBottom: 16,
    },
    cover: {
        height: 180,
        justifyContent: 'flex-end',
        paddingBottom: 8,
    },
    title: {
        paddingHorizontal: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: '#000',
        textShadowRadius: 8,
    },
    voteAverage: {
        justifyContent: 'center',
    },
    textShadow: {
        textShadowColor: '#000',
        textShadowRadius: 8,
    }
});

const deviceWidth = Dimensions.get('window').width;

const CarouselHome = <T extends ICarouselHomeData>({
    data,
    style,
    totalItems
}: ICarouselHomeProps<T>): JSX.Element | null => {

    const [carousel, setCarousel] = React.useState<T[]>([]);

    React.useEffect(() => {
        if (data.size === totalItems)
            setCarousel(dataToCarousel<T>(data));
    }, [data]);

    const renderItem = ({ item, index, style }: ICarouselRenderItemProps<T>): JSX.Element | null => (
        <FastImage
            style={[styles.cover, style]}
            source={item.backdrop_path ? {
                uri: imagePathW500(item.backdrop_path),
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.web,
            } : noImageBackdrop}
            resizeMode={FastImage.resizeMode.cover}
        >
            <Typography
                type="title"
                style={styles.title}
            >
                {item.title || item.name}
            </Typography>

            <TextIcon
                textType="body1"
                iconName="star"
                iconColor="#fc6"
                style={styles.voteAverage}
                iconStyle={styles.textShadow}
                textStyle={styles.textShadow}
            >
                {item.vote_average}
            </TextIcon>
        </FastImage>
    );

    if (carousel.length === 0)
        return null;

    return (
        <View style={[styles.root, style]}>
            <Carousel<T>
                data={carousel}
                renderItem={renderItem}
                width={deviceWidth}
                marginHorizontal={16}
                fixedBarWidth={280}
                barSpace={10}
            />
        </View>
    );
};

export default CarouselHome;
