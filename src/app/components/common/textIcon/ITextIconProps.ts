import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { TypographyType } from "../typography/ITypographyProps";

export interface ITextIconProps {
    iconComponent?: any;
    iconStyle?: StyleProp<TextStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconName: string;
    iconSize?: number;
    iconColor: string;
    textType?: TypographyType;
    style?: StyleProp<ViewStyle>;
}
