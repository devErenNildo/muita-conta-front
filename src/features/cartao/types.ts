export type Cartao = {
    id: number;
    nome: string;
    limite: number;
    limiteDisponivel: number;
    diaFechamento: number;
    diaVencimento: number;
    cor: string;
};

export type CartaoState = {
    cartoes: Cartao[];
    loading: boolean;
    error: string | null;
};