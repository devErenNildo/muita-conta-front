import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { toggleTheme } from "../../../features/theme/redux/themeSlice";
import styles from "./ThemeToggle.module.css";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
    const { mode } = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch<AppDispatch>();

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    const isLight = mode === "light";

    const icon = isLight ? <FaMoon /> : <IoMdSunny />;
    const currentThemeName = isLight ? "Claro" : "Escuro";
    const titleLabel = `Mudar para ${isLight ? "Escuro" : "Claro"}`;

    return (
        <button
            onClick={handleToggle}
            title={titleLabel}
            className={`${styles.toggleButton} ${isLight ? styles.light : styles.dark
                }`}
        >
            <span className={styles.thumb}>{icon}</span>

            <span className={styles.label}>{currentThemeName}</span>
        </button>
    );
};

export default ThemeToggle;
