import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/api";
import { ACCOUNTS_API, ACCOUNT_API_WITH_ID } from "../../utilities/constants";
import { Account, CreateAccount, FetchAccountInput } from "./types";

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
         return await requests.get(ACCOUNT_API_WITH_ID(id));
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data })
      }
   }
);

export const createAccount = createAsyncThunk<Account, CreateAccount>(
   'createAccount',
   async (account, thunkAPI) => {
      try {
         return await requests.post<Account>(ACCOUNTS_API, account);
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data });
      }
   }
);