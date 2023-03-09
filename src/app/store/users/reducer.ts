import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "../../utilities/enums";
import { fetchCurrentUser, loginUser, registerUser } from "./action";
import { UserState } from "./types";

export const initialState: UserState = {
    isFetching: false,
    user: null,
    token: localStorage.getItem('user'),
}

export const userSlice = createSlice({
    name: SLICE_NAME.USERS,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Login user
        builder.addCase(loginUser.pending, (state, _) => {
            state.isFetching = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isFetching = false;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(loginUser.rejected, (state, _) => {
            state.isFetching = false;
        });

        // Register user
        builder.addCase(registerUser.pending, (state, _) => {
            state.isFetching = true;
        });
        builder.addCase(registerUser.fulfilled, (state, _) => {
            state.isFetching = false;
        });
        builder.addCase(registerUser.rejected, (state, _) => {
            state.isFetching = false;
        });

        // Get current user
        builder.addCase(fetchCurrentUser.pending, (state, _) => {
            state.isFetching = true;
        });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.isFetching = false;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(fetchCurrentUser.rejected, (state, _) => {
            state.isFetching = false;
        });
    }
});

export const userReducer = userSlice.reducer;