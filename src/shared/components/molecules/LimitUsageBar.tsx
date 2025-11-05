import styles from './LimitUsageBar.module.css';

type Props = {
    usado: number;
    total: number;
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

const LimitUsageBar = ({ usado, total }: Props) => {
    const percent = total > 0 ? Math.min((usado / total) * 100, 100) : 0;
    const disponivel = total - usado;

    return (
        <div className={styles.limitWrapper}>
            <div className={styles.labels}>
                <span className={styles.title}>Limite Utilizado</span>
                <span className={styles.values}>
                    {formatCurrency(usado)} / {formatCurrency(total)}
                </span>
            </div>
            <div className={styles.progressBar}>
                <div 
                    className={styles.progressFill} 
                    style={{ width: `${percent}%` }}
                />
            </div>
            <div className={styles.labels}>
                <span className={styles.percent}>{percent.toFixed(1)}% utilizado</span>
                <span className={styles.disponivel}>
                    Disponível: {formatCurrency(disponivel)}
                </span>
            </div>
        </div>
    );
};

export default LimitUsageBar;