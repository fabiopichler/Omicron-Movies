import { IGenres, IProductionCompanies } from "./IMovie";

export interface ICreatedBy {
    id: number; // integer
    credit_id: string;
    name: string;
    gender: number; // integer
    profile_path: string;
}

export interface ILastEpisodeToAir {
    air_date: string;
    episode_number: number; // integer
    id: number; // integer
    name: string;
    overview: string;
    production_code: string;
    season_number: number; // integer
    show_id: number; // integer
    still_path: string;
    vote_average: number;
    vote_count: number; // integer
}

export interface INetworks {
    name: string;
    id: number; // integer
    logo_path: string;
    origin_country: string;
}

export interface ISeasons {
    air_date: string;
    episode_count: number; // integer
    id: number; // integer
    name: string;
    overview: string;
    poster_path: string;
    season_number: number; // integer
}

export interface ITv {
    backdrop_path: string | null;
    created_by: ICreatedBy[];
    episode_run_time: number[]; // integer[]
    first_air_date: string;
    genres: IGenres[];
    homepage: string;
    id: number; // integer
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: ILastEpisodeToAir;
    name: string;
    next_episode_to_air: null;
    networks: INetworks[];
    number_of_episodes: number; // integer
    number_of_seasons: number; // integer
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: IProductionCompanies[];
    seasons: ISeasons[];
    status: string;
    type: string;
    vote_average: number;
    vote_count: number; // integer
}
