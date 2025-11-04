import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store'; 

export const useThemeEffect = () => {
    const { mode } = useSelector((state: RootState) => state.theme);

    useEffect(() => {
        const root = document.documentElement; 

        root.setAttribute('data-theme', mode);

    }, [mode]);
};