import axios from 'axios';

import { API_KEY } from '../../env.json';

const baseURL = 'https://api.themoviedb.org/3';
const language = 'pt-BR';

export const Api = axios.create({
    baseURL
});

Api.interceptors.request.use(config => {
    config.headers['Cache-Control'] = 'max-age=0, no-cache, no-store, must-revalidate';
    config.headers['Expires'] = 'Wed, 11 Jan 1984 05:00:00 GMT';
    config.headers['Pragma'] = 'no-cache';

    config.params = {
        language,
        ...config.params,
        api_key: API_KEY,
    };

    return config;
});
