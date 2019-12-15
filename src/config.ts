import packageJson from '../package.json';

export interface IConfig {
    readonly appVersion: string;
}

export const Config: IConfig = {
    appVersion: packageJson.version,
}
