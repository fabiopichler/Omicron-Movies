import React from 'react';

import { Animated, View, StyleSheet, ScrollView } from 'react-native';

import { ICarouselProps, ICarouselData } from './ICarouselProps';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    track: {
        backgroundColor: 'rgba(255,255,255,.3)',
        overflow: 'hidden',
        height: 2,
    },
    bar: {
        backgroundColor: '#01a267',
        height: 2,
        position: 'absolute',
        left: 0,
        top: 0,
    },
})

const Carousel = <T extends ICarouselData>({
    data,
    renderItem: RenderItem,
    width: carouselWidth,
    marginHorizontal: marginH,
    fixedBarWidth,
    barSpace,
}: ICarouselProps<T>): JSX.Element | null => {

    const scrollViewRef = React.useRef<ScrollView>(null);
    const animVal = React.useRef(new Animated.Value(0)).current;

    const [index, setIndex] = React.useState(0);

    const numItems = data.length;
    const itemWidth = (fixedBarWidth / numItems) - ((numItems - 1) * barSpace);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex(idx => ++idx >= numItems ? 0 : idx)
        }, 3000);

        return () => clearInterval(interval);
    }, [numItems]);

    React.useEffect(() => {
        if (scrollViewRef.current)
            scrollViewRef.current.scrollTo({ x: index * carouselWidth, y: 0, animated: true });
    }, [index]);

    const scrollBarVal = (idx: number) => animVal.interpolate({
        inputRange: [carouselWidth * (idx - 1), carouselWidth * (idx + 1)],
        outputRange: [-itemWidth, itemWidth],
        extrapolate: 'clamp',
    });

    return (
        <View
            style={styles.container}
        >
            <ScrollView
                ref={scrollViewRef}
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={10}
                pagingEnabled
                onScroll={
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { x: animVal } } }]
                    )
                }
            >
                {data.map((item, index) => (
                    <RenderItem
                        item={item}
                        index={index}
                        key={index}
                        style={{
                            width: carouselWidth - (marginH * 2),
                            marginHorizontal: marginH,
                        }}
                    />
                ))}
            </ScrollView>

            <View
                style={styles.barContainer}
            >
                {data.map((dt, idx) => (
                    <View
                        key={`bar${idx}`}
                        style={[
                            styles.track,
                            {
                                width: itemWidth,
                                marginLeft: idx === 0 ? 0 : barSpace,
                            },
                        ]}
                    >
                        <Animated.View
                            style={[
                                styles.bar,
                                {
                                    width: itemWidth,
                                    transform: [
                                        { translateX: scrollBarVal(idx) },
                                    ],
                                },
                            ]}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Carousel;

const addInCarousel = <T extends ICarouselData>(carousel: T[], data: T[]) => {
    for (const item of data) {

        if (carousel.some(el => el.id === item.id))
            continue;

        carousel.push(item);
        break;
    }
};

export const dataToCarousel = <T extends ICarouselData>(data: Map<string, T[]> | T[][]): T[] => {
    const carousel: T[] = [];

    data.forEach((dt: T[]) => addInCarousel(carousel, dt));

    return carousel;
}
