import styles from './WidgetCard.module.css';

const InvoiceHistory = () => {
    return (
        <div className={styles.widgetCard}>
            <h3 className={styles.title}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 12v5h4"/><path d="M12 7v10h4"/><path d="M17 14v3h4"/></svg>
                Histórico de Faturas
            </h3>
            <div className={styles.content}>
                <div className={styles.stateMessage}>
                    (Componente de gráfico será implementado aqui)
                </div>
            </div>
        </div>
    );
};

export default InvoiceHistory;