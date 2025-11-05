import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { fetchCartoesThunk, fetchDespesasThunk } from '../../features/cartao/services/cartaoThunks';
import styles from './Dashboard.module.css';
import { clearDespesas } from '../../features/cartao/redux/cartaoSlice';
import InvoiceHistory from '../../shared/components/organisms/InvoiceHistory';
import CardPurchases from '../../shared/components/organisms/CardPurchases';
import CardDetailsSidebar from '../../shared/components/organisms/CardDetailsSidebar';

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const { 
        cartoes, 
        loading: loadingCartoes, 
        error: errorCartoes,
        despesas,
        loadingDespesas,
        errorDespesas 
    } = useSelector((state: RootState) => state.cartao);

    useEffect(() => {
        dispatch(fetchCartoesThunk());
    }, [dispatch]);

    useEffect(() => {
        setCurrentIndex(0);
    }, [cartoes.length]);

    useEffect(() => {
        const activeCard = cartoes.length > 0 ? cartoes[currentIndex] : null;

        if (activeCard) {
            const date = new Date();
            const mes = date.getMonth() + 1; 
            const ano = date.getFullYear();

            dispatch(fetchDespesasThunk({ idCartao: activeCard.id, mes, ano }));
        } else {
            dispatch(clearDespesas());
        }

    }, [dispatch, cartoes, currentIndex]);

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Cartões</h1>
                <p>Gerencie seus cartões de crédito e compras</p>
            </header>
            
            <div className={styles.contentLayout}>
                <main className={styles.mainContent}>
                    <InvoiceHistory />
                    <CardPurchases
                        despesas={despesas}
                        loading={loadingDespesas}
                        error={errorDespesas}
                    />
                </main>
                
                <CardDetailsSidebar
                    cartoes={cartoes} 
                    loading={loadingCartoes} 
                    error={errorCartoes}
                    
                    currentIndex={currentIndex}
                    onIndexChange={setCurrentIndex}
                />
            </div>

            <button className={styles.fab} aria-label="Adicionar">
                +
            </button>
        </div>
    );
};

export default Dashboard;