import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, refreshTokenThunk } from "./authThunks";
import type { AuthState } from "./types";

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.expiresIn = null;
            state.isAuthenticated = false;
            localStorage.removeItem("auth");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.expiresIn = action.payload.expiresIn;
                state.isAuthenticated = true;
                localStorage.setItem("auth", JSON.stringify(action.payload));
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Erro ao fazer login.";
            })

            .addCase(refreshTokenThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshTokenThunk.fulfilled, (state, action) => {
                state.loading = false; 
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.expiresIn = action.payload.expiresIn;
                state.isAuthenticated = true;
                localStorage.setItem("auth", JSON.stringify(action.payload));
            })
            .addCase(refreshTokenThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Sessão expirada.";
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.expiresIn = null;
                localStorage.removeItem("auth");
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
