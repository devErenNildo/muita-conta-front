import stylesContainer from './WidgetCard.module.css';
import styles from './InvoiceHistory.module.css';
import ArrowButton from '../atoms/ArrowButton';
import BarChart from '../molecules/BarChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaturasSimplesThunk } from "../../../features/cartao/services/cartaoThunks";
import type { AppDispatch, RootState } from "../../../app/store";
import { useEffect, useState, useRef } from 'react';

type Props = {
    idCartao: number;
};

const BAR_WIDTH_PX = 60;
const GAP_PX = 12;
const PREFETCH_TRIGGER_BARS_LEFT = 2;

const InvoiceHistory = ({ idCartao }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { faturasSimples, loadingFaturas } = useSelector(
        (state: RootState) => state.cartao
    );

    const [pageAtual, setPageAtual] = useState(0);
    const [barsPerView, setBarsPerView] = useState(9);
    const chartWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateBars = () => {
            if (chartWrapperRef.current) {
                const width = chartWrapperRef.current.offsetWidth;
                const count = Math.floor((width + GAP_PX) / (BAR_WIDTH_PX + GAP_PX));
                setBarsPerView(count > 0 ? count : 1);
            }
        };

        calculateBars();

        window.addEventListener('resize', calculateBars);
        return () => window.removeEventListener('resize', calculateBars);
    }, []);

    useEffect(() => {
        dispatch(fetchFaturasSimplesThunk({ idCartao, page: 0, size: 10 }));
        setPageAtual(0);
    }, [dispatch, idCartao]);

    useEffect(() => {
        const totalLoaded = faturasSimples.content.length;
        if (totalLoaded === 0) return;

        const hasMoreDataToFetch = faturasSimples.currentPage + 1 < faturasSimples.totalPages;

        if (!hasMoreDataToFetch || loadingFaturas) {
            return;
        }

        const remainingBars = totalLoaded - (pageAtual + barsPerView);

        if (remainingBars <= PREFETCH_TRIGGER_BARS_LEFT) {
            const nextPageToFetch = faturasSimples.currentPage + 1;
            dispatch(fetchFaturasSimplesThunk({ idCartao, page: nextPageToFetch, size: 10 }));
        }

    }, [pageAtual, faturasSimples, loadingFaturas, dispatch, idCartao, barsPerView]);

    const totalLoaded = faturasSimples.content.length;

    const handleNext = () => {
        const maxPage = Math.max(0, totalLoaded - barsPerView);
        setPageAtual((prev) => {
            const nextPage = prev + 1;
            return Math.min(nextPage, maxPage);
        });
    };

    const handlePrev = () => {
        setPageAtual((prev) => Math.max(prev - 1, 0));
    };

    const maxValor = faturasSimples.content.length > 0
        ? Math.max(...faturasSimples.content.map((f) => f.valorFatura))
        : 0;

    const maxPossiblePage = Math.max(0, totalLoaded - barsPerView);
    const isAtLoadedEnd = pageAtual >= maxPossiblePage;
    const hasMoreDataOnServer = faturasSimples.currentPage + 1 < faturasSimples.totalPages;
    const isNextDisabled = isAtLoadedEnd && (loadingFaturas || !hasMoreDataOnServer);

    const preciseTransform = `translateX(calc(-${pageAtual} * (${BAR_WIDTH_PX}px + ${GAP_PX}px)))`;

    return (
        <div className={stylesContainer.widgetCard}>
            <h3 className={stylesContainer.title}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 12v5h4" /><path d="M12 7v10h4" /><path d="M17 14v3h4" /></svg>
                Histórico de Faturas
            </h3>
            <div className={stylesContainer.content}>
                <div className={styles.container}>
                    <ArrowButton
                        direction='esquerda'
                        onClick={handlePrev}
                        disable={pageAtual === 0}
                    />
                    
                    <div className={styles.chartWrapper} ref={chartWrapperRef}>
                        <BarChart
                            transform={preciseTransform}
                            data={faturasSimples}
                            maxValor={maxValor}
                        />
                    </div>

                    <ArrowButton
                        direction='direita'
                        onClick={handleNext}
                        disable={isNextDisabled}
                    />
                </div>

            </div>
        </div>
    );
};

export default InvoiceHistory;