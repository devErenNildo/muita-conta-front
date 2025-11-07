import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api"; 
import type { Cartao, Despesa, DespesasResponse } from "../types";

type FetchDespesasParams = {
    idCartao: number;
    mes?: number;
    ano?: number;
    page?: number;
    size?: number;
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
    async ({ idCartao, mes, ano, page = 0, size = 10 }: FetchDespesasParams) => {

        const params: Record<string, number> = { page, size };

        if (mes) {
            params.mes = mes;
        }
        if (ano) {
            params.ano = ano;
        }

        const { data } = await api.get<Despesa[]>(`/cartao/despesas/${idCartao}`, {
            params: params
        });
        return data;
    }
);
