
export interface IPerson {
    birthday: string | null;
    known_for_department: string;
    deathday: null | string;
    id: number; // integer
    name: string;
    also_known_as: string[];
    gender: number; // integer // minimum: 0 // maximum: 2 // default: 0
    biography: string;
    popularity: number;
    place_of_birth: string | null;
    profile_path: string | null;
    adult: boolean;
    imdb_id: string;
    homepage: null | string;
}
