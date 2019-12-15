import { StyleProp, ViewStyle } from "react-native";

import { ICarouselData } from "../common/carousel/ICarouselProps";

export interface ICarouselHomeProps<T> {
    data: Map<string, T[]>;
    style?: StyleProp<ViewStyle>;
    totalItems: number;
}

export interface ICarouselHomeData extends ICarouselData {
    vote_average: number;
    title?: string;
    name?: string;
    backdrop_path: string | null;
}
