
export interface IMovieListItemProps {
    item: IMovieListData;
    index: number;
    onPress: (id: number) => void;
}

export interface IMovieListData {
    id: number;
    poster_path?: string | null;
    profile_path?: string;
    title?: string;
    name?: string;
    vote_average?: number;
}
