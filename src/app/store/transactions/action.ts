import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/api";
import { TRANSACTIONS_API } from "../../utilities/constants";
import { CreateTransactionInput, Transaction } from "./types";

export const createTransaction = createAsyncThunk<Transaction, CreateTransactionInput>(
   'createTransaction',
   async (transaction, thunkAPI) => {
      try {
         return await requests.post<Transaction>(TRANSACTIONS_API(transaction.accountId), transaction);
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data });
      }
   }
);