import { StyleProp, ViewStyle, Animated } from "react-native";
import { OnLoadEvent } from "react-native-fast-image";

export interface IScrollViewWithHeaderProps {
    backdrop?: string | number;
    onBackdropLoad?: (event: OnLoadEvent) => void;
    renderHeader: (props: IScrollViewWithHeaderRenderProps) => JSX.Element | null;
    scrollViewStyle?: StyleProp<ViewStyle>;
}

export interface IScrollViewWithHeaderRenderProps {
    scrollY: Animated.Value;
}
