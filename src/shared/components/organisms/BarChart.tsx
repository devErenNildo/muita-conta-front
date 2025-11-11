import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { fetchFaturasSimplesThunk } from "../../../features/cartao/services/cartaoThunks";
import styles from "./BarChart.module.css";

type Props = {
    idCartao: number;
};

const BARS_PER_VIEW = 9;
const PREFETCH_TRIGGER_BARS_LEFT = 2;

const BarChart: React.FC<Props> = ({ idCartao }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { faturasSimples, loadingFaturas } = useSelector(
        (state: RootState) => state.cartao
    );

    const [pageAtual, setPageAtual] = useState(0);

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

        const remainingBars = totalLoaded - (pageAtual + BARS_PER_VIEW);

        if (remainingBars <= PREFETCH_TRIGGER_BARS_LEFT) {
            const nextPageToFetch = faturasSimples.currentPage + 1;
            dispatch(fetchFaturasSimplesThunk({ idCartao, page: nextPageToFetch, size: 10 }));
        }

    }, [pageAtual, faturasSimples, loadingFaturas, dispatch, idCartao]);


    const handleNext = () => {
        setPageAtual((prev) => prev + 1);
    };

    const handlePrev = () => {
        setPageAtual((prev) => Math.max(prev - 1, 0));
    };

    const maxValor =
        faturasSimples.content.length > 0
            ? Math.max(...faturasSimples.content.map((f) => f.valorFatura))
            : 0;

    const totalLoaded = faturasSimples.content.length;
    const hasMoreDataOnServer = faturasSimples.currentPage + 1 < faturasSimples.totalPages;

    const maxPossiblePage = Math.max(0, totalLoaded - BARS_PER_VIEW);

    const isAtLoadedEnd = pageAtual >= maxPossiblePage;

    const isNextDisabled = isAtLoadedEnd && (loadingFaturas || !hasMoreDataOnServer);

    return (
        <div className={styles.container}>
            <button
                className={styles.arrowButton}
                onClick={handlePrev}
                disabled={pageAtual === 0}
            >
                ◀
            </button>

            <div className={styles.chartWrapper}>
                <div
                    className={styles.chartContainer}
                    style={{
                        transform: `translateX(-${pageAtual * (100 / BARS_PER_VIEW)}%)`,
                    }}
                >
                    {faturasSimples.content.map((fatura, index) => {
                        const altura =
                            maxValor > 0 ? (fatura.valorFatura / maxValor) * 100 : 0;
                        return (
                            <div
                                key={`${fatura.mes}-${fatura.ano}-${index}`}
                                className={styles.bar}
                                style={{ height: `${altura}%` }}
                                title={`${fatura.mes}/${fatura.ano} - R$ ${fatura.valorFatura.toFixed(2)}`}
                            >
                                <span className={styles.label}>
                                    {fatura.mes}/{String(fatura.ano).slice(-2)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                className={styles.arrowButton}
                onClick={handleNext}
                disabled={isNextDisabled}
            >
                ▶
            </button>
        </div>
    );
};

export default BarChart;