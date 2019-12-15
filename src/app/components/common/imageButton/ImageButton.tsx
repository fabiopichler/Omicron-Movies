import React from 'react';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';

import { TouchableOpacity } from 'react-native';

import { IImageButtonProps } from './ImageButtonProps';

const noImagePoster = require('@src/assets/images/no-image-poster.png');

const defaultWidth = 150;
const imageHeight = 200;

const defaultHeight = 200;
const imageWidth = 150;

const ImageButton: React.FC<IImageButtonProps> = ({
    uri,
    onLoad,
    onPress,
    onChangeSize,
    children,
    style,
    imageStyle,
    direction = 'column',
}) => {

    const [size, setSize] = React.useState({
        height: 0,
        width: 0,
    });

    const handleLoad = (e: OnLoadEvent) => {
        const {
            nativeEvent: { width, height },
        } = e;

        setSize({ width, height });

        if (onLoad)
            onLoad(e);
    }

    const getWidth = () => {
        if (!size.width)
            return defaultWidth;

        const ratio = size.width / size.height;
        const width = imageHeight * ratio;

        return width
    }

    const getHeight = () => {
        if (!size.height)
            return defaultHeight;

        const ratio = size.height / size.width;
        const height = imageWidth * ratio;

        return height;
    }

    const width = getWidth();
    const height = getHeight();

    React.useEffect(() => {
        if (onChangeSize)
            onChangeSize(width, height);
    }, [width, height]);

    const uriSource = (
        uri && typeof uri === 'number'
            ? uri
            : noImagePoster
    );

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[{
                flexDirection: direction,
            }, style]}
            onPress={onPress}
        >
            <FastImage
                style={[imageStyle, {
                    width: direction === 'column' ? width : defaultWidth,
                    height: direction === 'row' ? height : imageHeight,
                }]}
                source={uri && typeof uri === 'string' ? {
                    uri,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.web,
                } : uriSource}
                resizeMode={FastImage.resizeMode.contain}
                onLoad={handleLoad}
            />

            {children}
        </TouchableOpacity>
    );
};

export default ImageButton;
