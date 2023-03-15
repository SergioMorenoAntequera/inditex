import axios from "axios";

const AXIOS_CLIENT = axios.create({
    baseURL: 'https://itunes.apple.com',
    timeout: 1000,
});

export const NO_CORS_AXIOS_CLIENT = axios.create({
    baseURL: `https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/')}`,
    timeout: 1000,
});

export default AXIOS_CLIENT
