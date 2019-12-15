import { TouchableOpacityProps, StyleProp, TextStyle, TextProps } from "react-native";

export interface IIconButtonProps extends TouchableOpacityProps {
    name: string;
    size?: number;
    color?: string;
    iconComponent?: any;
    iconStyle?: StyleProp<TextStyle>;
    iconProps?: TextProps;
}
