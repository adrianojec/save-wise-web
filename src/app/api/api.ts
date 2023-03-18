import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { APP_BASE_URL, CONFIG_HEADER, EMPTY_STRING, USER } from '../utilities/constants';
import { REQUEST_STATUS_MESSAGE } from '../utilities/enums';

axios.defaults.baseURL = APP_BASE_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
    const user = localStorage.getItem(USER);
    const token = !!user ? JSON.parse(user).token : EMPTY_STRING;

    if (token) config.headers!.Authorization = CONFIG_HEADER(token);
    return config;
});

axios.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error(REQUEST_STATUS_MESSAGE.UNAUTHORIZED)
            break;
        case 403:
            toast.error(REQUEST_STATUS_MESSAGE.FORBIDDEN)
            break;
        case 404:
            toast.error('Not Found')
            break;
        case 500:
            toast.error(REQUEST_STATUS_MESSAGE.SERVER_ERROR)
            break;
    }

    return Promise.reject(error);
})

export const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}
