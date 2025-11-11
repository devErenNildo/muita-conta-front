import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { fetchCartoesThunk, fetchDespesasThunk } from '../../features/cartao/services/cartaoThunks';
import styles from './Dashboard.module.css';
import { clearDespesas } from '../../features/cartao/redux/cartaoSlice';
import InvoiceHistory from '../../shared/components/organisms/InvoiceHistory';
import CardPurchases from '../../shared/components/organisms/CardPurchases';
import CardDetailsSidebar from '../../shared/components/organisms/CardDetailsSidebar';
import BarChart from '../../shared/components/organisms/BarChart';

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('atual');
    const [currentPage, setCurrentPage] = useState(0);

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
            const params: {
                idCartao: number;
                page: number;
                mes?: number;
                ano?: number;
            } = {
                idCartao: activeCard.id,
                page: currentPage
            };

            if (activeTab === 'atual') {
                const date = new Date();
                params.mes = date.getMonth() + 1;
                params.ano = date.getFullYear();
            }

            dispatch(fetchDespesasThunk(params));
        } else {
            dispatch(clearDespesas());
        }
    }, [dispatch, cartoes, currentIndex, activeTab, currentPage]);


    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(0);
        dispatch(clearDespesas()); 
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Cartões</h1>
                <p>Gerencie seus cartões de crédito e compras</p>
            </header>

            <div className={styles.contentLayout}>
                <main className={styles.mainContent}>

                    {cartoes.length > 0 && (
                        // <BarChart key={cartoes[currentIndex].id} idCartao={cartoes[currentIndex].id} />
                        <InvoiceHistory />

                    )}
                    <CardPurchases
                        despesas={despesas.content}
                        loading={loadingDespesas && currentPage === 0}
                        error={errorDespesas}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
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