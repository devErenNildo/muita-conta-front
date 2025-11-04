import React from 'react';
import NavLinks from '../atoms/NavLinks';
import styles from './MainLayout.module.css';

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {

    return (
        <div className={styles.layout}>
            <aside className={styles.asideNav}>
                <div className={styles.asideLogo}>
                    <h3>Muita Conta</h3>
                </div>
                <nav className={styles.asideLinks}>
                    <NavLinks />
                </nav>
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