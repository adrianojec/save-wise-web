import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/agent";
import { ACCOUNT_API } from "../../utilities/constants";
import { Account, FetchAccountInput } from "./types";

export const fetchAccounts = createAsyncThunk<Account[]>
    (
        'fetchAccounts',
        async (_, thunkAPI) => {
            try {
                return await requests.get(ACCOUNT_API);
            } catch (error: any) {
                return thunkAPI.rejectWithValue({ error: error.data })
            }
        }
    );

export const fetchAccount = createAsyncThunk<Account, FetchAccountInput>
    (
        'fetchAccount',
        async (params, thunkAPI) => {
            try {
                return await requests.get(`${ACCOUNT_API}/${params.id}`);
            } catch (error: any) {
                return thunkAPI.rejectWithValue({ error: error.data })
            }
        }
    );