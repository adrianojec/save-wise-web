import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/api";
import { ACCOUNTS_API, CREATE_ACCOUNT_API, DELETE_ACCOUNT_API, GET_ACCOUNT_BY_ID_API, UPDATE_ACCOUNT_API } from "../../utilities/constants";
import { Account, CreateAccountInput, DeleteAccountInput, FetchAccountInput, UpdateAccountInput } from "./types";

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
         return await requests.get(GET_ACCOUNT_BY_ID_API(id));
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data })
      }
   }
);

export const createAccount = createAsyncThunk<boolean, CreateAccountInput>(
   'createAccount',
   async (account, thunkAPI) => {
      try {
         return await requests.post<boolean>(CREATE_ACCOUNT_API, account);
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data });
      }
   }
);

export const updateAccount = createAsyncThunk<boolean, UpdateAccountInput>(
   'updateAccount',
   async (account, thunkAPI) => {
      try {
         return await requests.put<boolean>(UPDATE_ACCOUNT_API(account.id), account);
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data });
      }
   }
);

export const deleteAccount = createAsyncThunk<boolean, DeleteAccountInput>(
   'deleteAccount',
   async ({ id }, thunkAPI) => {
      try {
         return await requests.del<boolean>(DELETE_ACCOUNT_API(id));
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data })
      }
   }
)