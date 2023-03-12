import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/api";
import { TRANSACTIONS_API } from "../../utilities/constants";
import { CreateTransactionInput, FetchTransactionsInput, Transaction } from "./types";

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

export const fetchTransactions = createAsyncThunk<Transaction[], FetchTransactionsInput>(
   'fetchTransactions',
   async ({ accountId }, thunkAPI) => {
      try {
         return await requests.get<Transaction[]>(TRANSACTIONS_API(accountId));
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data });
      }
   }
);