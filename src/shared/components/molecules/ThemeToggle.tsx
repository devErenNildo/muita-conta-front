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
    const icon = mode === 'light' ? '🌙' : '☀️';
    const label = `Mudar para ${nextTheme}`;

    return (
        <button onClick={handleToggle} title={label}>
            <span className="theme-icon">{icon}</span>
            <span className="theme-label">{label}</span>
        </button>
    );
};

export default ThemeToggle;