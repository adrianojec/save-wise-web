export enum VARIANT {
    PRIMARY = "primary",
    DARK = "dark"
}

export enum FORM_TYPE {
    EMAIL = "email",
    PASSWORD = "password",
    TEXT = "text"
}

export enum SLICE_NAME {
    ACCOUNTS = "accounts",
    USERS = "users"
}

export enum PATH_NAME {
    HOME = "/",
    TRANSACTIONS = "/transactions",
    ACCOUNTS = "/accounts",
    ACCOUNT_DETAILS = "/accounts/:id",
    CREATE_ACCOUNT = "/accounts/create",
    LOGIN = "/login",
    REGISTER = "/register",
}

export enum REQUEST_STATUS_MESSAGE {
    UNAUTHORIZED = "Unauthorized",
    FORBIDDEN = "Forbidden",
    SERVER_ERROR = "Server error",
}

export enum USER_FORM {
    LOGIN,
    REGISTER
}

