import { IMovieListResult } from './IMovieListResult';
import { ITvListResult } from './ITvListResult';
import { IPersonListResult } from './IPersonListResult';

export interface IList<TResults extends IMovieListResult | ITvListResult | IPersonListResult> {
    page: number; // integer
    results: TResults[];
    total_results: number; // integer
    total_pages: number; // integer
}
