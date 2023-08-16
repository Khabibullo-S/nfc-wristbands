import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {logOut} from "./userAPI";
const $host = axios.create({
    // baseURL: 'http://127.0.0.1:8000'
    baseURL: 'https://nfcglobaltech.uz/'
})
const $authHost = axios.create({
    baseURL: 'https://nfcglobaltech.uz/',
    // baseURL: 'http://127.0.0.1:8000',
})

$authHost.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

const useTokenRefresh = () => {
    const history = useNavigate();

    const [accessToken, setAccessToken] = useState(null);
    let intervalRef = null;
    const getAccessToken = () => {
        const token = localStorage.getItem('token');
        setAccessToken(token);
        return token;
    };


    const refreshToken = async () => {
        try {
            const {data} = await $authHost.post('api/v1/token/refresh', {
                refresh: localStorage.getItem('refreshToken'),
            });
            const newAccessToken = data.access;
            console.log(data.access);
            setAccessToken(newAccessToken);
            localStorage.setItem('token', newAccessToken);
            console.log("oxshadi")
            return newAccessToken;
        } catch (error) {
            console.error('Token yangilashda xatolik yuz berdi:', error);
             history('/');
        }
    }

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            return;
        }

        intervalRef = setInterval(() => {
            refreshToken();
        }, 15000);

        return () =>{ clearInterval(intervalRef)};
    }, []);

    return accessToken;
};

export {
    $host,
    $authHost,
    useTokenRefresh
}


