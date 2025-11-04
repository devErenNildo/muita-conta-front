import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/authSlice";
import cartaoReducer from "../features/cartao/redux/cartaoSlice";
import { setupInterceptors } from "../services/setupInterceptors";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cartao: cartaoReducer
    }
});

setupInterceptors(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;