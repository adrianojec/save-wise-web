import axios, { AxiosResponse } from 'axios';
import { Account, CreateAccount, UpdateAccount } from '../models/account';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Accounts = {
    list: () => requests.get<Account[]>('/Accounts'),
    details: (id: string) => requests.get<Account>(`/Accounts/${id}`),
    create: (account: CreateAccount) => requests.post<void>('/Accounts', account),
    update: (id: string, account: UpdateAccount) => requests.put<void>(`/Accounts/${id}`, account),
    delete: (id: string) => requests.del<void>(`/Accounts/${id}`)
}

const agent = {
    Accounts
}

export default agent;