export enum VARIANT {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    DARK = "dark"
}

export enum FORM_TYPE {
    EMAIL = "email",
    PASSWORD = "password",
    TEXT = "text"
}

export enum SLICE_NAME {
    ACCOUNTS = "accounts",
    USERS = "users",
    TRANSACTIONS = "transactions",
}

export enum ROUTE {
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

export enum TransactionType {
    INCOME = "Income",
    EXPENSE = "Expense",
}

