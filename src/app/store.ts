import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/authSlice";
import { setupInterceptors } from "../services/setupInterceptors";

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

setupInterceptors(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;