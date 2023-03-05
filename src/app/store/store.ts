import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { accountReducer } from "./accounts/reducer";
import { userReducer } from "./users/reducer";

export const store = configureStore(
    {
        reducer: {
            accounts: accountReducer,
            user: userReducer,
        },
    }
);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

