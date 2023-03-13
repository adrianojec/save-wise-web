export enum VARIANT {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    DARK = "dark"
}

export enum FORM_TYPE {
    EMAIL = "email",
    PASSWORD = "password",
    TEXT = "text",
    RADIO = "radio"
}

export enum SLICE_NAME {
    ACCOUNTS = "accounts",
    USERS = "users",
    TRANSACTIONS = "transactions",
}

export enum ROUTE {
    ACCOUNTS = "/accounts",
    ACCOUNT_DETAILS = "/accounts/:id",
    ALL = "*",
    CREATE_ACCOUNT = "/accounts/create",
    HOME = "/",
    LOGIN = "/login",
    REGISTER = "/register",
    TRANSACTIONS = "/transactions",
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

export enum TransactionType {
    INCOME,
    EXPENSE,
}

