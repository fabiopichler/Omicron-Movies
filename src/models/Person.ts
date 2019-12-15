import { Model } from "./Model";
import { IPerson } from "./IPerson";
import { IPersonListResult } from "./IPersonListResult";

export class Person extends Model<IPerson, IPersonListResult> {

    public name(): string {
        return 'person';
    }
}
