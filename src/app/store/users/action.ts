import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/api";
import { USERS_API_LOGIN } from "../../utilities/constants";
import { LoginUserInput, User } from "./types";

export const fetchUser = createAsyncThunk<User, LoginUserInput>
    (
        'fetchUser',
        async (user, thunkAPI) => {
            try {
                return await requests.post<User>(USERS_API_LOGIN, user);
            } catch (error: any) {
                return thunkAPI.rejectWithValue({ error: error.data });
            }
        }
    );
