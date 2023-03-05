export interface UserState {
    isFetching: boolean,
    user?: User
}

export interface LoginUser {
    email: string,
    password: string
}

export interface RegisterUser {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface User {
    userName: string,
    token: string,
}