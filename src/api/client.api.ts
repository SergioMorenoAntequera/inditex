import axios from "axios";

const AXIOS_CLIENT = axios.create({
    baseURL: 'https://itunes.apple.com',
    timeout: 1000,
});

export default AXIOS_CLIENT
