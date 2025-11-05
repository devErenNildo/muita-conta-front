import { NavLink } from "react-router-dom";
import styles from "./NavLinks.module.css";
import {
    LuFileText,
    LuPiggyBank,
    LuUser 
} from "react-icons/lu";
import {
    MdOutlineDashboard,
    MdTrendingDown,
    MdCreditCard,
    MdTrendingUp,
} from "react-icons/md";

const navItems = [
    { path: '/visao-geral', label: 'Visão Geral', icon: <MdOutlineDashboard /> },
    { path: '/despesas', label: 'Despesas', icon: <MdTrendingDown /> },
    { path: '/cartao', label: 'Cartões', icon: <MdCreditCard /> },
    { path: '/contas', label: 'Contas', icon: <LuFileText /> },
    { path: '/emprestimos', label: 'Empréstimos', icon: <LuPiggyBank /> },
    { path: '/renda', label: 'Renda', icon: <MdTrendingUp /> },
    { path: '/perfil', label: 'Perfil', icon: <LuUser /> },
];

const NavLinks = () => {
    return (
        <>
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                    }
                >
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.label}>{item.label}</span>
                </NavLink>
            ))}
        </>
    );
}

export default NavLinks;