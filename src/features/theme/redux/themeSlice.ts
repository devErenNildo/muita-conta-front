import { createSlice } from '@reduxjs/toolkit';
import type { ThemeState, ThemeMode } from '../types';

const loadTheme = (): ThemeMode => {
    try {
        const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
        if (savedTheme) {
            return savedTheme;
        }
    } catch (e) {
        console.warn("Falha ao ler 'theme' do localStorage", e);
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
};

const initialState: ThemeState = {
    mode: loadTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            try {
                localStorage.setItem('theme', state.mode);
            } catch (e) {
                console.warn("Falha ao salvar 'theme' no localStorage", e);
            }
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;