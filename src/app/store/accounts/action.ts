import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/api";
import { ACCOUNTS_API, ACCOUNT_BY_ID_API } from "../../utilities/constants";
import { Account, CreateAccountInput, FetchAccountInput } from "./types";

export const fetchAccounts = createAsyncThunk<Account[]>(
   'fetchAccounts',
   async (_, thunkAPI) => {
      try {
         return await requests.get(ACCOUNTS_API);
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data })
      }
   }
);

export const fetchAccount = createAsyncThunk<Account, FetchAccountInput>(
   'fetchAccount',
   async ({ id }, thunkAPI) => {
      try {
         return await requests.get(ACCOUNT_BY_ID_API(id));
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data })
      }
   }
);

export const createAccount = createAsyncThunk<Account, CreateAccountInput>(
   'createAccount',
   async (account, thunkAPI) => {
      try {
         return await requests.post<Account>(ACCOUNTS_API, account);
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data });
      }
   }
);