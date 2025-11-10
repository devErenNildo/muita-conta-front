import type { PaginatedResponse } from "../../shared/types";

export type Despesa = {
    descricao: string;
    valor: number;
    data: string;
    numeroParcelas: number;
    parcelaAtual: number;
};

export type Cartao = {
    id: number;
    nome: string;
    limite: number;
    limiteDisponivel: number;
    diaFechamento: number;
    diaVencimento: number;
    cor: string;
};

export type FaturaSimples = {
    mes: number;
    ano: number;
    valorFatura: number;
};

export type DespesasResponse = PaginatedResponse<Despesa>;
export type FaturasSimplesResponse = PaginatedResponse<FaturaSimples>;

export type CartaoState = {
    cartoes: Cartao[];
    loading: boolean;
    error: string | null;

    despesas: DespesasResponse; 
    loadingDespesas: boolean;
    errorDespesas: string | null;

    faturasSimples: FaturasSimplesResponse;
    loadingFaturas: boolean;
    errorFaturas: string | null;
}
