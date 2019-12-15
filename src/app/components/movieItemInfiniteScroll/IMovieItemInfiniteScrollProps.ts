
export interface IMovieItemInfiniteScrollProps {
    item: IMovieItemInfiniteScrollData;
    index: number;
    onPress: (id: number) => void;
}

export interface IMovieItemInfiniteScrollData {
    id: number;
    poster_path: string | null;
    title?: string;
    name?: string;
    vote_average: number;
    overview: string;
    release_date?: string;
    first_air_date?: string;
}
