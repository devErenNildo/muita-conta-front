import { createSlice } from "@reduxjs/toolkit";
import { fetchCartoesThunk, fetchDespesasThunk, fetchFaturasSimplesThunk } from "../services/cartaoThunks";
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

    faturasSimples: {
        content: [],
        currentPage: 0,
        pageSize: 0,
        totalPages: 0,
        totalElements: 0,
    },
    loadingFaturas: false,
    errorFaturas: null,
};



const cartaoSlice = createSlice({
    name: "cartao",
    initialState,
    reducers: {
        clearDespesas: (state) => {
            state.despesas = initialState.despesas;
            state.errorDespesas = null;
        },
        clearFaturasSimples: (state) => {
            state.faturasSimples = initialState.faturasSimples;
            state.errorFaturas = null;
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
            })
            // REDUCER FATURAS SIMPLES
            .addCase(fetchFaturasSimplesThunk.pending, (state) => {
                state.loadingFaturas = true;
                state.errorFaturas = null;
            })
            .addCase(fetchFaturasSimplesThunk.pending, (state) => {
                state.loadingFaturas = true;
                state.errorFaturas = null;
            })
            .addCase(fetchFaturasSimplesThunk.fulfilled, (state, action) => {
                state.loadingFaturas = false;
                state.faturasSimples.currentPage = action.payload.currentPage;
                state.faturasSimples.totalPages = action.payload.totalPages;
                state.faturasSimples.totalElements = action.payload.totalElements;
                state.faturasSimples.pageSize = action.payload.pageSize;
                if (action.meta.arg.page === 0) {
                    state.faturasSimples.content = action.payload.content;
                } else {
                    state.faturasSimples.content = [
                        ...state.faturasSimples.content,
                        ...action.payload.content
                    ];
                }
            })
            .addCase(fetchFaturasSimplesThunk.rejected, (state, action) => {
                state.loadingFaturas = false;
                state.errorFaturas = action.error.message ?? "Erro ao buscar faturas.";
            });
    },
});

export const { clearDespesas, clearFaturasSimples } = cartaoSlice.actions;

export default cartaoSlice.reducer;