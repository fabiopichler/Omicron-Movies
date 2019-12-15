
export interface IColor {
    readonly primary: string;

    readonly textPrimary: string;
    readonly textSecondary: string;
    
    readonly backgroundPrimary: string;
    readonly backgroundCard: string;
}

export const Color: IColor = {
    primary: '#01d277',

    textPrimary: 'white',
    textSecondary: 'rgba(255,255,255,.5)',

    backgroundPrimary: '#222B45',
    backgroundCard: 'rgba(255,255,255,.05)',
}
