import { IScrollViewWithHeaderRenderProps } from "../common/scrollViewWithHeader/IScrollViewWithHeaderProps";

export interface IHeaderMovieProps extends IScrollViewWithHeaderRenderProps {
    titleNavigation?: string;
    title: string;
    onBackPress: () => void;
}
