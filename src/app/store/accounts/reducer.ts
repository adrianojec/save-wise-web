import { createSlice } from "@reduxjs/toolkit";
import { fetchAccount, fetchAccounts } from "./action";
import { AccountsState } from "./types";

export const initialState: AccountsState = {
    isFetching: false,
    accounts: [],
    account: undefined,
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get accounts
        builder.addCase(fetchAccounts.pending, (state, action) => {
            state.isFetching = true;
        });
        builder.addCase(fetchAccounts.fulfilled, (state, action) => {
            state.isFetching = false;
            state.accounts = action.payload;
        });
        builder.addCase(fetchAccounts.rejected, (state, store) => {
            state.isFetching = false;
        });

        // Get account by id
        builder.addCase(fetchAccount.pending, (state, action) => {
            state.isFetching = true;
        });
        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            state.isFetching = false;
            state.account = action.payload;
        });
        builder.addCase(fetchAccount.rejected, (state, store) => {
            state.isFetching = false;
        });
    }
});

export const accountReducer = accountSlice.reducer;