import axios from "axios";
import { BASE_URL } from "./constants";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        // console.log("token is here:", accessToken);
        if (accessToken) {
            // console.log(accessToken);

            config.headers.Authorization = `Bearer ${accessToken}`;
            // console.log("auth header", config.headers.Authorization);

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance; 