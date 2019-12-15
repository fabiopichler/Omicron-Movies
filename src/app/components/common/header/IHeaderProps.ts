import { GestureResponderEvent } from "react-native";

export interface IHeaderProps {
    title?: string;
    subtitle?: string;
    onPress: (event: GestureResponderEvent) => void;
    rightControls?: JSX.Element;
}
