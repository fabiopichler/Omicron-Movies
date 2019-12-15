import axios, { AxiosPromise, CancelTokenSource } from 'axios';

import { Api } from '@src/services/Api';
import { IList } from './IList';
import { IMovieListResult } from './IMovieListResult';
import { ITvListResult } from './ITvListResult';
import { IPersonListResult } from './IPersonListResult';

export abstract class Model<TData, TResults extends IMovieListResult | ITvListResult | IPersonListResult> {

    protected cancelSource: CancelTokenSource;
    protected params: any = {};

    public constructor() {
        const CancelToken = axios.CancelToken;
        this.cancelSource = CancelToken.source();
    }

    public setParams(params: any) {
        this.params = params;
    }

    public name(): string {
        return '';
    }

    public close(): void {
        this.cancelSource.cancel();
    }

    public get(id: string): AxiosPromise<TData> {
        return Api.get<TData>(`/${this.name()}/${id}`, {
            params: this.params,
            cancelToken: this.cancelSource.token
        });
    }

    public getList(id: string): AxiosPromise<IList<TResults>> {
        return Api.get<IList<TResults>>(`/${this.name()}/${id}`, {
            params: this.params,
            cancelToken: this.cancelSource.token
        });
    }

    public paginate(id: string, page: number, key: string = 'page'): AxiosPromise<IList<TResults>> {
        return Api.get<IList<TResults>>(`/${this.name()}/${id}`, {
            params: { ...this.params, [key]: page },
            cancelToken: this.cancelSource.token
        });
    }

    public async getDataList(id: string, func: (data: TResults[]) => void, funcError?: (error: any) => void): Promise<void> {
        try {
            const { data } = await this.getList(id);

            func(data.results);

        } catch (error) {
            if (funcError)
                funcError(error);
        }
    }

    public async getData(id: string, func: (data: TData) => void, funcError?: (error: any) => void): Promise<void> {
        try {
            const { data } = await this.get(id);

            func(data);

        } catch (error) {
            if (funcError)
                funcError(error);
        }
    }
}
