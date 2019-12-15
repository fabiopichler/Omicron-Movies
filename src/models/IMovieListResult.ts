
export interface IMovieListResult {
    poster_path: string | null;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[]; // integer[]
    id: number; // integer
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string | null;
    popularity: number;
    vote_count: number; // integer
    video: boolean;
    vote_average: number;
}
