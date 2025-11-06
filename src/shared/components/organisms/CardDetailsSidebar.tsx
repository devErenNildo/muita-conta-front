import type { Cartao } from '../../../features/cartao/types';
import CreditCard from '../molecules/CreditCard';
import InfoBox from '../atoms/InfoBox';
import styles from './CardDetailsSidebar.module.css';

type Props = {
    cartoes: Cartao[];
    loading: boolean;
    error: string | null;

    currentIndex: number;
    onIndexChange: (newIndex: number) => void;
};

const CardDetailsSidebar = ({
    cartoes,
    loading,
    error,
    currentIndex,
    onIndexChange
}: Props) => {

    const handleNext = () => {
        if (cartoes.length === 0) return;
        const newIndex = (currentIndex + 1) % cartoes.length;
        onIndexChange(newIndex);
    };

    const handlePrev = () => {
        if (cartoes.length === 0) return;
        const newIndex = (currentIndex - 1 + cartoes.length) % cartoes.length;
        onIndexChange(newIndex);
    };

    const renderDetails = () => {
        if (loading || error || cartoes.length === 0) {
            return null;
        }

        const currentCard = cartoes[currentIndex];

        return (
            <>
                <div className={styles.infoGrid}>
                    <InfoBox label="Fecha dia" value={currentCard.diaFechamento} />
                    <InfoBox label="Vence dia" value={currentCard.diaVencimento} />
                </div>
            </>
        );
    };

    const showButtons = !loading && !error && cartoes.length > 1;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.carousel}>
                {showButtons && (
                    <button onClick={handlePrev} className={`${styles.navButton} ${styles.prev}`}>
                        &lt;
                    </button>
                )}
                <div className={styles.cardStack}>
                    {loading && <div className={styles.cardState}>Carregando cartões...</div>}
                    {error && <div className={styles.cardState} style={{ color: 'red' }}>{error}</div>}
                    {!loading && !error && cartoes.length === 0 && (
                        <div className={styles.cardState}>Nenhum cartão encontrado.</div>
                    )}

                    {!loading && !error && cartoes.map((cartao, index) => {
                        let status = 'next';
                        if (index === currentIndex) {
                            status = 'active';
                        } else if (index < currentIndex) {
                            status = 'prev';
                        }

                        const style = {
                            '--index': index - currentIndex,
                        } as React.CSSProperties;

                        return (
                            <div
                                key={cartao.id}
                                className={`${styles.cardWrapper} ${styles[status]}`}
                                style={style}
                            >
                                <CreditCard cartao={cartao} />
                            </div>
                        );
                    })}
                </div>

                {showButtons && (
                    <button onClick={handleNext} className={`${styles.navButton} ${styles.next}`}>
                        &gt;
                    </button>
                )}
            </div>

            {cartoes.length > 1 && (
                <div className={styles.dots}>
                    {cartoes.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                            onClick={() => onIndexChange(index)}
                        />
                    ))}
                </div>
            )}

            {renderDetails()}
        </aside>
    );
};

export default CardDetailsSidebar;