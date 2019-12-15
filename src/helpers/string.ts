import numeral from 'numeral';

export const arrayJoin = (data: any[], key: string, separator: string = ', ') => (
    data.map(value => value[key]).join(separator)
);

export const formatMoney = (money: number) => numeral(money).format('$ (0,0)');

export const stringLimit = (input: string, limit: number): string => (
    input.length > limit ? `${input.substring(0, limit - 3)}...` : input
);

export const imagePathW500 = (path?: string | null): string | undefined => (
    path ? `https://image.tmdb.org/t/p/w500${path}` : undefined
);

export const imagePathOriginal = (path?: string | null): string | undefined => (
    path ? `https://image.tmdb.org/t/p/original${path}` : undefined
);
