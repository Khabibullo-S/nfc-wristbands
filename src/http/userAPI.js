import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import Admin from "../pages/admin/admin";

export const registration = async (sendData) => {


}

export const login = async (username, password) => {
    const {data} = await $host.post('api/v1/login', {username, password});
    localStorage.setItem('token', data.tokens.access);
    localStorage.setItem('refreshToken', data.tokens.refresh);
    localStorage.setItem('uuid', data.user.id);
    window.location.assign('/admin')
};

export const check = async () => {
    const refresh = localStorage.getItem('refreshToken');
    const {data} = await $authHost.post('api/v1/token/refresh', {refresh});
    return jwt_decode(data.access);
};

export const getUser_Profile= async () => {
    const response = await $authHost.get('api/v1/users/' + localStorage.getItem('uuid'));
    return response
};
export const logOut = async ()=>{
    const refresh = localStorage.getItem('refreshToken');
    const {data} = await $authHost.post('api/v1/logout', {refresh});
    localStorage.clear()
    return window.location.assign('/')
};

