import { NavigationPath } from "../models/navigation_path";
import { PATH_NAME } from "./enums";

// API
export const ACCOUNTS_API = "accounts";
export const LOGIN_API = "users/login";
export const REGISTER_API = "users/register";
export const USERS_API = "users";
export const ACCOUNT_API_WITH_ID = (id: string) => `${ACCOUNTS_API}/${id}`;

// App
export const APP_BASE_URL = 'http://localhost:5000/api';
export const APP_NAME = "Save Wise";

// String constants
export const ACCOUNTS = "Accounts";
export const CONFIRM_PASSWORD = "Confirm Password";
export const EMAIL_ADDRESS = "Email Address";
export const EMPTY_STRING = "";
export const FIRST_NAME = "First Name";
export const HOME = "Home";
export const LAST_NAME = "Last Name";
export const LOGIN = "Login";
export const LOGIN_MESSAGE = "Don't have an account?";
export const PASSWORD = "Password";
export const REGISTER = "Register";
export const REGISTER_MESSAGE = "Already have an account?";
export const SIGN_IN = "Sign in";
export const SIGN_UP = "Sign up";
export const SUBMIT = "Submit";
export const TITLE = "Title";
export const TRANSACTIONS = "Transactions";
export const USER_NAME = "User Name";

// Navigation Routes

export const navigationPaths: NavigationPath[] = [
    {
        title: HOME,
        path: PATH_NAME.HOME
    },
    {
        title: ACCOUNTS,
        path: PATH_NAME.ACCOUNTS
    },
    {
        title: TRANSACTIONS,
        path: PATH_NAME.TRANSACTIONS
    }
];
