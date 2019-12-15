import { StyleProp, ViewStyle } from "react-native";

export interface ICarouselProps<T> {
    data: T[];
    renderItem: (props: ICarouselRenderItemProps<T>) => JSX.Element | null;
    width: number;
    marginHorizontal: number;
    fixedBarWidth: number;
    barSpace: number;
}

export interface ICarouselData {
    id: number;
}

export interface ICarouselRenderItemProps<T> {
    item: T;
    index: number;
    style: StyleProp<ViewStyle>;
}
