import { NavLink } from "react-router-dom";
import styles from "./NavLinks.module.css";

const navItems = [
    { path: '/cartao', label: 'Cartões', icon: '💳' },
    { path: '/perfil', label: 'Perfil', icon: '👤' },
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