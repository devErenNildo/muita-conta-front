export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};

export type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
};
