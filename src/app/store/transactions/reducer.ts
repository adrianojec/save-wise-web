import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "../../utilities/enums";
import { createTransaction, fetchTransactions, updateTransaction } from "./action";
import { TransactionState } from "./types";

export const initialState: TransactionState = {
   isFetching: false,
   transactions: [],
   transaction: undefined,
}

export const transactionSlice = createSlice({
   name: SLICE_NAME.TRANSACTIONS,
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      // Create transaction
      builder.addCase(createTransaction.pending, (state, _) => {
         state.isFetching = true;
      });
      builder.addCase(createTransaction.fulfilled, (state, _) => {
         state.isFetching = false;
      });
      builder.addCase(createTransaction.rejected, (state, _) => {
         state.isFetching = false;
      });

      // Fetch transactions
      builder.addCase(fetchTransactions.pending, (state, _) => {
         state.isFetching = true;
      });
      builder.addCase(fetchTransactions.fulfilled, (state, action) => {
         state.isFetching = false;
         state.transactions = action.payload;
      });
      builder.addCase(fetchTransactions.rejected, (state, _) => {
         state.isFetching = false;
      });

      // Update transactions
      builder.addCase(updateTransaction.pending, (state, _) => {
         state.isFetching = true;
      });
      builder.addCase(updateTransaction.fulfilled, (state, _) => {
         state.isFetching = false;
      });
      builder.addCase(updateTransaction.rejected, (state, _) => {
         state.isFetching = false;
      });
   }
});

export const transactionReducer = transactionSlice.reducer; 