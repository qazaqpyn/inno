import { IArticleSearch } from './../../../types/index';
import axios from 'axios';
import { API_URL, API_HEADERS } from '../../../config/apiConfig';

export default {
    getArticles: async () => {
        const response = await axios.get(API_URL + '/articles');
        return response.data;
    },

    searchArticles: async (data: IArticleSearch) => {
        const response = await axios.post(API_URL + '/articles/search', data);
        return response.data;
    },

    personalizedArticles: async () => {
        const response = await axios.get(API_URL + '/articles/personalized', API_HEADERS());
        return response.data;
    },

    getFilterOptions: async () => {
        const response = await axios.get(API_URL + '/articles/filter-options');
        return response.data;
    },
}