import { UserLogin, UserRegister, IUpdatePreferences } from './../../../types/index';
import axios from 'axios';
import { API_URL, API_HEADERS } from '../../../config/apiConfig';

export default {
    getUser: async () => {
        const response = await axios.get(API_URL + '/user', API_HEADERS());
        return response.data;
    },

    loginUser: async (data: UserLogin) => {
        const response = await axios.post(API_URL + '/login', data);
        return response.data;
    },

    registerUser: async (data: UserRegister) => {
        const response = await axios.post(API_URL + '/register', data);
        return response.data;
    },

    logoutUser: async () => {
        const response = await axios.post(API_URL + '/logout', null, API_HEADERS());
        return response.data;
    },

    updatePreferencesUser: async (data: IUpdatePreferences) => {
        const response = await axios.put(API_URL + '/user/preferences', data, API_HEADERS());
        return response.data;
    }
}