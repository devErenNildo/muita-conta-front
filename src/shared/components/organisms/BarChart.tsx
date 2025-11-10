import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { fetchFaturasSimplesThunk } from "../../../features/cartao/services/cartaoThunks";
import { clearFaturasSimples } from "../../../features/cartao/redux/cartaoSlice";
import styles from "./BarChart.module.css";
import ArrowButton from "../atoms/ArrowButton";

type Props = {
    idCartao: number;
};

const BarChart: React.FC<Props> = ({ idCartao }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { faturasSimples, loadingFaturas } = useSelector(
        (state: RootState) => state.cartao
    );

    const [visibleStart, setVisibleStart] = useState(0);

    useEffect(() => {
        dispatch(clearFaturasSimples());
        dispatch(fetchFaturasSimplesThunk({ idCartao, page: 0, size: 10 }));
        setVisibleStart(0);
    }, [dispatch, idCartao]);


    const handleNext = () => {
        const nextStart = visibleStart + 8;
        const reachedEnd = nextStart + 9 > faturasSimples.content.length;

        if (reachedEnd && !loadingFaturas) {
            const nextPage = faturasSimples.currentPage + 1;
            if (nextPage < faturasSimples.totalPages) {
                dispatch(fetchFaturasSimplesThunk({ idCartao, page: nextPage, size: 10 }));
            }
        }

        setVisibleStart((prev) => Math.min(prev + 8, faturasSimples.content.length - 1));
    };


    const handlePrev = () => {
        setVisibleStart((prev) => Math.max(prev - 8, 0));
    };

    const visibleFaturas = faturasSimples.content.slice(
        visibleStart,
        visibleStart + 9
    );

    const maxValor =
        faturasSimples.content.length > 0
            ? Math.max(...faturasSimples.content.map((f) => f.valorFatura))
            : 0;

    return (
        <div className={styles.container}>
            <button
                className={styles.arrowButton}
                onClick={handlePrev}
                disabled={visibleStart === 0}
            >
                ◀
            </button>

            <div className={styles.chartContainer}>
                {visibleFaturas.map((fatura, index) => {
                    const altura =
                        maxValor > 0 ? (fatura.valorFatura / maxValor) * 100 : 0;
                    const isLastHalf = index === visibleFaturas.length - 1;
                    return (
                        <div
                            key={`${fatura.mes}-${fatura.ano}-${index}`}
                            className={`${styles.bar} ${isLastHalf ? styles.lastHalf : ""}`}
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

            <button
                className={styles.arrowButton}
                onClick={handleNext}
                disabled={
                    visibleStart + 9 >= faturasSimples.content.length &&
                    faturasSimples.currentPage + 1 >= faturasSimples.totalPages
                }
            >
                ▶
            </button>
        </div>
    );
};

export default BarChart;
