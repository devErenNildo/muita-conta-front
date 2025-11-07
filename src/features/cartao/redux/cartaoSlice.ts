import { createSlice } from "@reduxjs/toolkit";
import { fetchCartoesThunk, fetchDespesasThunk } from "../services/cartaoThunks";
import type { CartaoState } from "../types";

const initialState: CartaoState = {
    cartoes: [],
    loading: false,
    error: null,
    despesas: {
        content: [],
        currentPage: 0,
        pageSize: 0,
        totalPages: 0,
        totalElements: 0,
    },
    loadingDespesas: false,
    errorDespesas: null,
};



const cartaoSlice = createSlice({
    name: "cartao",
    initialState,
    reducers: {
        clearDespesas: (state) => {
            state.despesas = initialState.despesas;
            state.errorDespesas = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // REDUCER CARTÃO 
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
            })
            // REDUCER DESPESAS
            .addCase(fetchDespesasThunk.pending, (state) => {
                state.loadingDespesas = true;
                state.errorDespesas = null;
            })
            .addCase(fetchDespesasThunk.fulfilled, (state, action) => {
                state.loadingDespesas = false;
                state.despesas = action.payload;
            })
            .addCase(fetchDespesasThunk.rejected, (state, action) => {
                state.loadingDespesas = false;
                state.errorDespesas = action.error.message ?? "Erro ao buscar despesas.";
            });
    },
});

export const { clearDespesas } = cartaoSlice.actions;

export default cartaoSlice.reducer;