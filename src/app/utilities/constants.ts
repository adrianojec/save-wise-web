// API
export const ACCOUNTS_API = "accounts";
export const USERS_API = "/user";
export const USERS_API_LOGIN = `${USERS_API}/login`;
export const USERS_API_REGISTER = `${USERS_API}/register`;
export const ACCOUNT_API_WITH_ID = (id: string) => `${ACCOUNTS_API}/${id}`;

// String constants
export const CONFIRM_PASSWORD = "Confirm Password";
export const EMAIL_ADDRESS = "Email Address";
export const EMPTY_STRING = "";
export const FIRST_NAME = "First Name";
export const LAST_NAME = "Last Name";
export const LOGIN = "Login";
export const LOGIN_MESSAGE = "Don't have an account?";
export const PASSWORD = "Password";
export const REGISTER = "Register";
export const REGISTER_MESSAGE = "Already have an account?";
export const SIGN_IN = "Sign in";
export const SIGN_UP = "Sign up";
export const SUBMIT = "Submit";
export const USER_NAME = "User Name";
