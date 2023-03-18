import { createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../../api/api";
import { CREATE_TRANSACTIONS_API, TRANSACTIONS_API, UPDATE_TRANSACTION_API } from "../../utilities/constants";
import { CreateTransactionInput, FetchTransactionsInput, Transaction, UpdateTransactionInput } from "./types";

export const createTransaction = createAsyncThunk<Transaction, CreateTransactionInput>(
   'createTransaction',
   async (transaction, thunkAPI) => {
      try {
         return await requests.post<Transaction>(CREATE_TRANSACTIONS_API(transaction.accountId), transaction);
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

export const updateTransaction = createAsyncThunk<Transaction, UpdateTransactionInput>(
   'updateTransaction',
   async (transaction, thunkAPI) => {
      const { accountId, id } = transaction;

      try {
         return await requests.put<Transaction>(UPDATE_TRANSACTION_API(accountId, id), transaction);
      } catch (error: any) {
         return thunkAPI.rejectWithValue({ error: error.data });
      }
   }
);