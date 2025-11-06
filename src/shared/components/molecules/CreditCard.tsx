import styles from './CreditCard.module.css';
import type { Cartao } from '../../../features/cartao/types';
import BarradeProgresso from '../atoms/BarraDeProgresso';

type Props = {
    cartao: Cartao;
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

const CardIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

const CreditCard = ({ cartao }: Props) => {

    const fallbackBackground = 'linear-gradient(135deg, #007BFF, #0056B3)';
    const cardStyle = {
        background: cartao.cor || fallbackBackground,
    };

    const limiteUsado = cartao.limite - cartao.limiteDisponivel;
    const percent = cartao.limite > 0 ? Math.min((limiteUsado / cartao.limite) * 100, 100) : 0;

    return (
        <div className={styles.card} style={cardStyle}>
            
            <div className={styles.header}>
                <span className={styles.icon}><CardIcon /></span>
                <span>{cartao.nome}</span>
            </div>

            <div className={styles.infoList}>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Limite total</span>
                    <span className={styles.value}>{formatCurrency(cartao.limite)}</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Usado</span>
                    <span className={styles.value}>{formatCurrency(limiteUsado)}</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Disponível</span>
                    <span className={styles.value}>{formatCurrency(cartao.limiteDisponivel)}</span>
                </div>
            </div>

            <div className={styles.limitSection}>
                <div className={styles.limitHeader}>
                    <span className={styles.label}>Uso do limite</span>
                    <span className={styles.value}>{percent.toFixed(1)}%</span>
                </div>
                <BarradeProgresso percent={percent}/>
            </div>

        </div>
    );
};

export default CreditCard;