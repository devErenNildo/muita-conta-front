import { useState } from 'react';
import type { Cartao } from '../../../features/cartao/types';
import CreditCard from './CreditCard';
import styles from './CardCarrosel.module.css';

type Props = {
    cartoes: Cartao[];
    loading: boolean;
    error: string | null;
};

const CardCarrosel = ({ cartoes, loading, error }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (cartoes.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cartoes.length);
    };

    const handlePrev = () => {
        if (cartoes.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cartoes.length) % cartoes.length);
    };

    const renderContent = () => {
        if (loading) {
            return <div className={styles.cardState}>Carregando cartões...</div>;
        }

        if (error) {
            return <div className={styles.cardState} style={{ color: 'red' }}>Erro: {error}</div>;
        }

        if (cartoes.length === 0) {
            return <div className={styles.cardState}>Nenhum cartão encontrado.</div>;
        }

        const currentCard = cartoes[currentIndex];

        return (
            <div className={styles.cardWrapper}>
                <CreditCard
                    key={currentCard.id}
                    cartao={currentCard}
                />
            </div>
        );
    }

    const showButtons = !loading && !error && cartoes.length > 1;

    return (
        <div className={styles.cardCarousel}>
            {showButtons && (
                <button onClick={handlePrev} className={styles.navButton} aria-label="Cartão anterior">
                    &lt;
                </button>
            )}

            {renderContent()}

            {showButtons && (
                <button onClick={handleNext} className={styles.navButton} aria-label="Próximo cartão">
                    &gt;
                </button>
            )}
        </div>
    );
};

export default CardCarrosel;