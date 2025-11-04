import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api"; //
import type { Cartao } from "../types";

export const fetchCartoesThunk = createAsyncThunk(
    "cartao/fetchAll",
    async () => {
        const { data } = await api.get<Cartao[]>("/cartao/all");
        return data;
    }
);