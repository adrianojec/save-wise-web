import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/api";
import { LoginUser, User } from "./types";

export const fetchUser = createAsyncThunk<User, LoginUser>
    (
        'fetchUser',
        async (user, thunkAPI) => {
            try {
                return await requests.post('/user/login', user);
            } catch (error: any) {
                return thunkAPI.rejectWithValue({ error: error.data });
            }
        }
    );
