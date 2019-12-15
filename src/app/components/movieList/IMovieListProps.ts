import { IMovieListData } from "./movieListItem/IMovieListItemProps";

export interface IMovieListProps {
    id: string;
    data: IMovieListData[];
    onPress: (id: number) => void;
    onTitlePress: (id: string, data: IMovieListData[], title: string, subtitle: string) => void;
    title: string;
    description: string;
}

export interface IMovieListRenderItem {
    item: IMovieListData;
    index: number;
}
