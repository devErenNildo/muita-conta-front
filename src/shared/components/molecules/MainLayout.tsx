import React from 'react';
import NavLinks from '../atoms/NavLinks';
import ThemeToggle from './ThemeToggle';
import styles from './MainLayout.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../../public/logo.png';

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {

    return (
        <div className={styles.layout}>
            <aside className={styles.asideNav}>

                <div className={styles.asideLogo}>
                    <div className={styles.logoContainer}>
                        <img
                            src={logo} alt='Loogo de cartao de credito'
                            className={styles.logo}
                        />
                    </div>
                    <div className={styles.logoTextContainer}>
                        <h3 className={styles.logoTitle}>Muita Conta</h3>
                        <span className={styles.logoSubtitle}>Gestão Financeira</span>
                    </div>
                </div>

                <nav className={styles.asideLinks}>
                    <NavLinks />
                </nav>

                <footer className={styles.asideFooter}>
                    <ThemeToggle />
                    <NavLink
                        to="/configuracoes"
                        className={({ isActive }) =>
                            `${styles.footerLink} ${isActive ? styles.footerLinkActive : ''}`
                        }
                    >
                        <span className={styles.footerIcon}>⚙️</span>
                        <span className={styles.footerLabel}>Configurações</span>
                    </NavLink>
                </footer>
            </aside>

            <nav className={styles.bottomNav}>
                <NavLinks />
            </nav>

            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;