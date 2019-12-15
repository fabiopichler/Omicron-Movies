import { Model } from "./Model";
import { ITvListResult } from "./ITvListResult";
import { ITv } from "./ITv";

export class Tv extends Model<ITv, ITvListResult> {

    public name(): string {
        return 'tv';
    }
}
