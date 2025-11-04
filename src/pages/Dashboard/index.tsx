import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { logout } from '../../features/auth/redux/authSlice';
import { fetchCartoesThunk } from '../../features/cartao/services/cartaoThunks';
import CreditCard from '../../shared/components/molecules/CreditCard';
import ThemeToggle from '../../shared/components/molecules/ThemeToggle';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Seletores do Cartao
    const { cartoes, loading, error } = useSelector(
        (state: RootState) => state.cartao
    );

    // Buscar cartões ao carregar a página
    useEffect(() => {
        dispatch(fetchCartoesThunk());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const renderContent = () => {
        if (loading) {
            return <p>Carregando cartões...</p>;
        }

        if (error) {
            return <p style={{ color: 'red' }}>Erro ao carregar cartões: {error}</p>;
        }

        if (cartoes.length === 0) {
            return <p>Nenhum cartão encontrado.</p>;
        }

        // Renderiza a lista de cartões
        return (
            <div className={styles.cardList}>
                {cartoes.map((cartao) => (
                    <CreditCard
                        key={cartao.id}
                        nome={cartao.nome}
                        limiteDisponivel={cartao.limiteDisponivel}
                        cor={cartao.cor}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Meus Cartões</h1>
                <div>
                    <ThemeToggle />
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
            <main className={styles.content}>
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;