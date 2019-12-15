import { TextProps } from "react-native";

export type TypographyType = 'title' | 'subtitle' | 'default' | 'body1' | 'body2';

export type TypographyColor = 'primary' | 'textPrimary' | 'textSecondary';

export interface ITypographyProps extends TextProps {
    type?: TypographyType;
    color?: TypographyColor;
    paragraph?: boolean;
}
