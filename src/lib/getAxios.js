import axios from "axios"

const getAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL,
    // withCredentials: true
});

export default getAxios;