import { NavigationPath } from "../models/navigation_path";
import { ROUTE } from "./enums";

// App
export const APP_BASE_URL = 'http://localhost:5000/api';
export const APP_NAME = "Save Wise";

// API
export const ACCOUNTS_API = "accounts";
export const GET_ACCOUNT_BY_ID_API = (id: string) => `${ACCOUNTS_API}/${id}`;
export const UPDATE_ACCOUNT_API = (id: string) => `${ACCOUNTS_API}/${id}`;
export const LOGIN_API = "users/login";
export const REGISTER_API = "users/register";
export const CREATE_TRANSACTIONS_API = (accountId: string) => `${GET_ACCOUNT_BY_ID_API(accountId)}/transactions`;
export const GET_TRANSACTION_BY_ID_API = (accountId: string, id: string) => `${GET_ACCOUNT_BY_ID_API(accountId)}/transactions/${id}`;
export const UPDATE_TRANSACTION_API = (accountId: string, id: string) => `${GET_ACCOUNT_BY_ID_API(accountId)}/transactions/${id}`;
export const USERS_API = "users";

// Colors
export const LIGHT_RED = "#FFD6D5";
export const LIGHT_GREEN = "#CCFFCC";

// String constants
export const ACCOUNTS = "Accounts";
export const ACTION = "Action";
export const ACTIVITES = "Activities";
export const ADD_TRANSACTION = "Add transaction";
export const AMOUNT = "Amount";
export const CONFIRM_PASSWORD = "Confirm Password";
export const CREATE = "Create";
export const CREATE_ACCOUNT = "Create Account";
export const DATE = "Date";
export const DATE_CREATED = "Date Created";
export const EDIT = "Edit";
export const EMAIL_ADDRESS = "Email Address";
export const EMPTY_STRING = "";
export const EXPENSE = "Expense";
export const FIRST_NAME = "First Name";
export const HOME = "Home";
export const INCOME = "Income";
export const LAST_NAME = "Last Name";
export const LOGIN = "Login";
export const LOGIN_MESSAGE = "Don't have an account?";
export const PASSWORD = "Password";
export const PASSWORD_NOT_MATCH = "Password does not match.";
export const PROVIDE_EMAIL = "Please provide an email address.";
export const PROVIDE_FIRSTNAME = "Please provide a first name.";
export const PROVIDE_LASTNAME = "Please provide a last name.";
export const PROVIDE_PASSWORD = "Please provide a complex password.";
export const PROVIDE_TITLE = "Please provide a title.";
export const PROVIDE_USERNAME = "Please provide a user name.";
export const REGISTER = "Register";
export const REGISTER_MESSAGE = "Already have an account?";
export const SELECT = "Select";
export const SIGN_IN = "Sign in";
export const SIGN_UP = "Sign up";
export const SUBMIT = "Submit";
export const TITLE = "Title";
export const TOTAL = "Total";
export const TRANSACTIONS = "Transactions";
export const TRANSACTIONS_TYPE = "Transactions type";
export const TYPE = "Type";
export const UPDATE = "Update";
export const UPDATE_TRANSACTION = "Update transaction";
export const USER_NAME = "User Name";

// Navigation Routes
export const navigationPaths: NavigationPath[] = [
    {
        title: HOME,
        path: ROUTE.HOME
    },
    {
        title: ACCOUNTS,
        path: ROUTE.ACCOUNTS
    },
    {
        title: ACTIVITES,
        path: ROUTE.ACTIVITIES
    }
];
