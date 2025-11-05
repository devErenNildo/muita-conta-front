import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import type { AuthResponse } from "../types";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; senha: string }) => {
        const { data } = await api.post<AuthResponse>("/auth/login", credentials);
        return data;
    }
);

export const refreshTokenThunk = createAsyncThunk(
    "auth/refresh-token",
    async (_, { getState }) => {
        const state: any = getState();
        const refreshToken = state.auth.refreshToken;

        const { data } = await api.post<AuthResponse>("/auth/refresh-token", {
            refreshToken,
        });

        return data;
    }
);
