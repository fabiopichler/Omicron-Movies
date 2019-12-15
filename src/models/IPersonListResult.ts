import { IMovieListResult } from "./IMovieListResult";
import { ITvListResult } from "./ITvListResult";

export interface KnownFor {
    media_type: 'movie' | 'tv';
}

export interface IPersonListResult {
    profile_path: string;
    adult: boolean;
    id: number; // integer
    known_for: (IMovieListResult & KnownFor | ITvListResult & KnownFor)[];
    name: string;
    popularity: number;
}
