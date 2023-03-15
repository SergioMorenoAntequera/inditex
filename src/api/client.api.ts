import axios from "axios";

const AXIOS_CLIENT = axios.create({
    baseURL: 'https://itunes.apple.com',
    timeout: 1000,
});

export const NO_CORS_AXIOS_CLIENT = axios.create({
    baseURL: prepareNoCORS('https://itunes.apple.com/'),
    timeout: 1000,
});

export function prepareNoCORS(url:string) {
    return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
}

export default AXIOS_CLIENT
