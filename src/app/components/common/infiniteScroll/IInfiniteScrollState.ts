import { IInfiniteScrollRenderItemData } from "./IInfiniteScrollProps";

export interface IInfiniteScrollState {
    data: IInfiniteScrollRenderItemData[];
    page: number;
    totalPages: number;
    loading: boolean;
}
