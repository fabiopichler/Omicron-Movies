import { Model } from "./Model";
import { IMovieListResult } from "./IMovieListResult";
import { IMovie } from "./IMovie";

export class Movie extends Model<IMovie, IMovieListResult> {

    public name(): string {
        return 'movie';
    }
}
