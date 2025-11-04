import { createSlice } from "@reduxjs/toolkit";
import { fetchCartoesThunk } from "../services/cartaoThunks";
import type { CartaoState } from "../types";

const initialState: CartaoState = {
    cartoes: [],
    loading: false,
    error: null,
};

const cartaoSlice = createSlice({
    name: "cartao",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartoesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartoesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.cartoes = action.payload;
            })
            .addCase(fetchCartoesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Erro ao buscar cartões.";
            });
    },
});

export default cartaoSlice.reducer;