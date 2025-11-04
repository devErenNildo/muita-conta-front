import styles from './CreditCard.module.css';

type Props = {
    nome: string;
    limiteDisponivel: number;
    cor: string; 
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

const CreditCard = ({ nome, limiteDisponivel, cor }: Props) => {

    const cardStyle = {
        backgroundColor: cor,
        color: '#FFFFFF'
    };

    return (
        <div className={styles.card} style={cardStyle}>
            <div className={styles.cardName}>{nome}</div>

            <div className={styles.cardLimitSection}>
                <span className={styles.limitLabel}>Limite Disponível</span>
                <span className={styles.limitValue}>
                    {formatCurrency(limiteDisponivel)}
                </span>
            </div>
        </div>
    );
};

export default CreditCard;