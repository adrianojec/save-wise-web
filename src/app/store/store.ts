import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { accountReducer } from "./accounts/reducer";

export const store = configureStore(
    {
        reducer: {
            accounts: accountReducer,
        },
    }
);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

