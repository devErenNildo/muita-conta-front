import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, refreshTokenThunk } from "./authThunks";
import type { AuthResponse, AuthState } from "./types";

const defaultInitialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const loadAuthFromStorage = (): AuthState => {
    try {
        const serializedAuth = localStorage.getItem("auth");
        if (serializedAuth === null) {
            return defaultInitialState;
        }

        const authData = JSON.parse(serializedAuth) as AuthResponse;

        return {
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            expiresIn: authData.expiresIn,
            isAuthenticated: true,
            loading: false,
            error: null,
        }

    } catch (e) {
        console.warn("Falha ao carregar o estado de 'auth' do localStorage", e);
        localStorage.removeItem("auth"); 
        return defaultInitialState;
    }
}

const initialState: AuthState = loadAuthFromStorage();

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
