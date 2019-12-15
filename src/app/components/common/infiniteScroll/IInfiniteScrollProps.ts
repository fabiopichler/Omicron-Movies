import { Model } from "@src/models/Model";

export interface IInfiniteScrollProps {
    readonly modelRef: React.MutableRefObject<Model<any, any> | null>;
    id: string;
    renderItem: any;
    data: IInfiniteScrollRenderItemData[];
    searchMode?: boolean;
}

export interface IInfiniteScrollRenderItem<T extends IInfiniteScrollRenderItemData> {
    item: T;
    index: number;
}

export interface IInfiniteScrollRenderItemData {
    id: number;
}
