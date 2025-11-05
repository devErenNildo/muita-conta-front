import styles from './CreditCard.module.css';
import type { Cartao } from '../../../features/cartao/types';

type Props = {
    cartao: Cartao;
};

const CardChipIcon = () => (
    <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="30" rx="4" fill="#D1D1D1" fillOpacity="0.5" />
        <path d="M14 0V30" stroke="#FFF" strokeOpacity="0.3" strokeWidth="2" />
        <path d="M26 0V30" stroke="#FFF" strokeOpacity="0.3" strokeWidth="2" />
        <path d="M0 15H40" stroke="#FFF" strokeOpacity="0.3" strokeWidth="2" />
    </svg>
);

const CardNetworkIcon = () => (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="14" fill="#EB001B" fillOpacity="0.8" />
        <circle cx="30" cy="14" r="14" fill="#F79E1B" fillOpacity="0.7" />
    </svg>
);

const CreditCard = ({ cartao }: Props) => {

    const fallbackBackground = 'linear-gradient(135deg, #007BFF, #0056B3)';

    const cardStyle = {
        // Altere de 'backgroundColor' para 'background'
        // Se 'cartao.cor' existir, ele será usado.
        // Se não, ele usará o gradiente azul como fallback.
        background: cartao.cor || fallbackBackground,
    };

    return (
        <div className={styles.card} style={cardStyle}>
            <div className={styles.cardHeader}>
                <span className={styles.cardType}>Cartão de Crédito</span>
                <span className={styles.cardNetworkName}>{cartao.nome}</span>
            </div>

            <div className={styles.cardChip}>
                <CardChipIcon />
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.cardNetworkIcon}>
                    <CardNetworkIcon />
                </div>
            </div>
        </div>
    );
};

export default CreditCard;