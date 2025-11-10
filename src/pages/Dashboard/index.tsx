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
    // "Levantamos" o estado da aba para o Dashboard
    const [activeTab, setActiveTab] = useState('atual');
    // Estado para controlar a página (ainda não temos "load more", mas usamos para a busca)
    const [currentPage, setCurrentPage] = useState(0);

    const {
        cartoes,
        loading: loadingCartoes,
        error: errorCartoes,
        despesas, // Agora é o objeto DespesasResponse
        loadingDespesas,
        errorDespesas
    } = useSelector((state: RootState) => state.cartao);

    useEffect(() => {
        dispatch(fetchCartoesThunk());
    }, [dispatch]);

    useEffect(() => {
        setCurrentIndex(0);
    }, [cartoes.length]);

    // useEffect atualizado para buscar despesas
    useEffect(() => {
        const activeCard = cartoes.length > 0 ? cartoes[currentIndex] : null;

        if (activeCard) {
            // Prepara os parâmetros para o thunk
            const params: {
                idCartao: number;
                page: number;
                mes?: number;
                ano?: number;
            } = {
                idCartao: activeCard.id,
                page: currentPage
            };

            // Adiciona mes/ano apenas se a aba for 'atual'
            if (activeTab === 'atual') {
                const date = new Date();
                params.mes = date.getMonth() + 1;
                params.ano = date.getFullYear();
            }
            // Se a aba for 'todas', mes/ano não são enviados e a API trará tudo (paginado)

            dispatch(fetchDespesasThunk(params));
        } else {
            dispatch(clearDespesas());
        }
        // Dispara a busca quando o cartão, a aba ou a página mudam
    }, [dispatch, cartoes, currentIndex, activeTab, currentPage]);


    // Handler para gerenciar a mudança de aba
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(0);      // Reseta a paginação
        dispatch(clearDespesas()); // Limpa as despesas antigas antes da nova busca
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Cartões</h1>
                <p>Gerencie seus cartões de crédito e compras</p>
            </header>

            <div className={styles.contentLayout}>
                <main className={styles.mainContent}>
                    {/* <InvoiceHistory /> */}

                    {cartoes.length > 0 && (
                        <BarChart idCartao={cartoes[currentIndex].id} />
                    )}
                    <CardPurchases
                        // Passamos apenas o 'content' para o componente de exibição
                        despesas={despesas.content}
                        // Só mostra o 'carregando' principal na primeira página
                        loading={loadingDespesas && currentPage === 0}
                        error={errorDespesas}
                        // Passa o estado e o handler para o componente
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