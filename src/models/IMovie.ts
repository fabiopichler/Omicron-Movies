
export interface IGenres {
    id: number; // integer
    name: string;
}

export interface IProductionCompanies {
    name: string;
    id: number; // integer
    logo_path: string | null;
    origin_country: string;
}

export interface IProductionCountries {
    iso_3166_1: string;
    name: string;
}

export interface ISpokenLanguages {
    iso_639_1: string;
    name: string;
}

export type IMovieStatus = 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';

export interface IMovie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: null | object;
    budget: number; // integer
    genres: IGenres[];
    homepage: string | null;
    id: number; // integer
    imdb_id: string | null; // minLength: 9 // maxLength: 9 // pattern: ^tt[0-9]{7}
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: IProductionCompanies[];
    production_countries: IProductionCountries[];
    release_date: string; // format: date
    revenue: number; // integer
    runtime: number | null; // integer
    spoken_languages: ISpokenLanguages[];
    status: IMovieStatus;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number; // integer
}
