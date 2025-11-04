import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../app/store';
import { toggleTheme } from '../../../features/theme/redux/themeSlice';

const ThemeToggle = () => {
    const { mode } = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch<AppDispatch>();

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    const nextTheme = mode === 'light' ? 'Escuro' : 'Claro';

    return (
        <button onClick={handleToggle} title={`Mudar para tema ${nextTheme}`}>
            {mode === 'light' ? '🌙' : '☀️'}
        </button>
    );
};

export default ThemeToggle;