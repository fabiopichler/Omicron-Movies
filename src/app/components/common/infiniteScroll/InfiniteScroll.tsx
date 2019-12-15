import React from 'react';

import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';

import { IInfiniteScrollProps } from './IInfiniteScrollProps';
import { IInfiniteScrollState } from './IInfiniteScrollState';
import { Color } from '@src/colors';

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 16,
    },
    loading: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(60,70,80,.8)',
        borderTopColor: 'rgba(255,255,255,.05)',
        borderTopWidth: 1,
    },
});

class InfiniteScroll extends React.Component<IInfiniteScrollProps, IInfiniteScrollState> {

    public static defaultProps = {
        data: [],
    };

    private loading: boolean = false;

    public constructor(props: IInfiniteScrollProps) {
        super(props);

        const { data } = props;
        const length = data.length === 0 ? 1 : 2;

        this.state = {
            data: [...data],
            page: length,
            totalPages: length,
            loading: false,
        };
    }

    public componentDidMount(): void {
        if (this.props.data.length === 0 && !this.props.searchMode)
            this.loadData();
    }

    public search = (text: string): void => {
        if (this.loading || text.length === 0)
            return;

        const { modelRef } = this.props;
        const query = text.trim().replace(/ +/g, '+');

        this.setState({
            data: [],
            page: 1,
            totalPages: 1,
        }, () => {
            if (modelRef.current) {
                modelRef.current.setParams({ query });
                this.loadData();
            }
        });
    };

    private loadData = async (): Promise<void> => {
        const { modelRef } = this.props;
        const { page, totalPages } = this.state;

        if (!modelRef.current || this.loading || page > totalPages)
            return;

        this.loading = true;
        this.setState({ loading: true });

        try {
            const { data } = await modelRef.current.paginate(this.props.id, page);

            this.setState(state => ({
                data: [...state.data, ...data.results],
                page: data.page + 1,
                totalPages: data.total_pages,
                loading: false,
            }), () => {
                this.loading = false;
            });

        } catch (error) {
            //console.error(error);

            this.loading = false;
            this.setState({ loading: false });
        }
    };

    public render(): JSX.Element | null {
        const { data, loading } = this.state;

        return (
            <View style={styles.root}>
                <FlatList
                    style={{ marginTop: 0 }}
                    contentContainerStyle={styles.list}
                    data={data}
                    renderItem={this.props.renderItem}
                    keyExtractor={(item: any) => String(item.id)}
                    onEndReached={this.loadData}
                    onEndReachedThreshold={0.5}
                />

                {loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator
                            color={Color.primary}
                            size={32}
                        />
                    </View>
                ) : null}
            </View>
        );
    }
}

export default InfiniteScroll;
