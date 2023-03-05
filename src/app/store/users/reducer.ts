import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./action";
import { UserState } from "./types";

export const initialState: UserState = {
    isFetching: false,
    user: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, _) => {
            state.isFetching = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isFetching = false;
            state.user = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, _) => {
            state.isFetching = false;
        });
    }
});

export const userReducer = userSlice.reducer;