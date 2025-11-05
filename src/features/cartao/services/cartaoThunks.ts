import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api"; 
import type { Cartao, Despesa } from "../types";

type FetchDespesasParams = {
    idCartao: number;
    mes: number;
    ano: number;
}

export const fetchCartoesThunk = createAsyncThunk(
    "cartao/fetchAll",
    async () => {
        const { data } = await api.get<Cartao[]>("/cartao/all");
        return data;
    }
);

export const fetchDespesasThunk = createAsyncThunk(
    "cartao/fetchDespesas",
    async ({ idCartao, mes, ano }: FetchDespesasParams) => {
        const { data } = await api.get<Despesa[]>(`/cartao/despesas/${idCartao}`, {
            params: { mes, ano } 
        });
        return data;
    }
);
