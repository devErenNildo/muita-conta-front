import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/authSlice";
import cartaoReducer from "../features/cartao/redux/cartaoSlice";
import themeReduce from "../features/theme/redux/themeSlice";
import { setupInterceptors } from "../services/setupInterceptors";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cartao: cartaoReducer,
        theme: themeReduce
    }
});

setupInterceptors(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;