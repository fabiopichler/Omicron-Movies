import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { OnLoadEvent, ImageStyle } from "react-native-fast-image";

export interface IImageButtonProps {
    uri?: string | number;
    onLoad?: (event: OnLoadEvent) => void;
    onPress?: (event: GestureResponderEvent) => void;
    onChangeSize?: (width: number, height: number) => void;
    style?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    direction?: 'column' | 'row';
}
