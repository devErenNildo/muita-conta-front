import { useState } from 'react';
import type { Despesa } from '../../../features/cartao/types';
import styles from './WidgetCard.module.css';

type Props = {
    despesas: Despesa[];
    loading: boolean;
    error: string | null;
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

const CardPurchases = ({ despesas, loading, error }: Props) => {
    const [activeTab, setActiveTab] = useState('atual');

    const renderContent = () => {
        if (loading) {
            return <div className={styles.stateMessage}>Carregando despesas...</div>;
        }
        if (error) {
            return <div className={styles.stateMessage} style={{ color: 'red' }}>{error}</div>;
        }
        if (despesas.length === 0) {
            return <div className={styles.stateMessage}>Nenhuma compra registrada nesta fatura.</div>;
        }

        return (
            <div className={styles.purchaseList}>
                {despesas.map((despesa, index) => (
                    <div key={index} className={styles.purchaseItem}>
                        <div className={styles.itemIcon}>🛍️</div> {/* Ícone placeholder */}
                        <div className={styles.itemDetails}>
                            <span className={styles.itemDesc}>{despesa.descricao}</span>
                            <span className={styles.itemDate}>{new Date(despesa.data).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <span className={styles.itemValue}>{formatCurrency(despesa.valor)}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.widgetCard}>
            <h3 className={styles.title}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"/><path d="M3 10h18"/><path d="M3 14h18"/><path d="M3 18h18"/><path d="M3 21h18v-3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v3Z"/></svg>
                Compras no Cartão ({loading ? '...' : despesas.length})
            </h3>
            
            <div className={styles.tabContainer}>
                <button 
                    className={`${styles.tab} ${activeTab === 'atual' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('atual')}
                >
                    Fatura Atual
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'todas' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('todas')}
                >
                    Todas as Compras
                </button>
            </div>

            <div className={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
};

export default CardPurchases;