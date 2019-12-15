import { IPersonListResult } from "@src/models/IPersonListResult";

export interface IPersonItemInfiniteScrollProps {
    item: IPersonListResult;
    index: number;
    onPress: (id: number) => void;
}
