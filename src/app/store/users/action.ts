import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/api";
import { USERS_API } from "../../utilities/constants";
import { LoginUserInput, User } from "./types";

export const fetchUser = createAsyncThunk<User, LoginUserInput>(
    'fetchUser',
    async (user, thunkAPI) => {
        try {
            return await requests.post<User>(`${USERS_API}/login`, user);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User>(
    'fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            return await requests.get<User>(USERS_API);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);
