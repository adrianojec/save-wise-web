import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/api";
import { GET_CURRENT_USER_API, LOGIN_API, REGISTER_API } from "../../utilities/constants";
import { LoginUserInput, RegisterUserInput, User } from "./types";

export const loginUser = createAsyncThunk<User, LoginUserInput>(
    'loginUser',
    async (user, thunkAPI) => {
        try {
            return await requests.post<User>(LOGIN_API, user);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const registerUser = createAsyncThunk<User, RegisterUserInput>(
    'registerUser',
    async (registeredUser, thunkAPI) => {
        try {
            return await requests.post<User>(REGISTER_API, registeredUser);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User>(
    'fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            return await requests.get<User>(GET_CURRENT_USER_API);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);
