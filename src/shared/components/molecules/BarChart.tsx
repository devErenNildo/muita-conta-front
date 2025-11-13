import type { FaturasSimplesResponse } from "../../../features/cartao/types";
import styles from "./BarChart.module.css";

type Props = {
    data: FaturasSimplesResponse;
    transform: string;
    maxValor: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

const BarChart = ({data, transform, maxValor} : Props) => {
    return (
        <div className={styles.container}>
            <div
                className={styles.chartContainer}
                style={{
                    transform: transform
                }}
            >
                {data.content.map((item, index) => {
                    const altura = maxValor > 0 
                        ? (item.valorFatura / maxValor) * 100
                        : 0;

                    return(
                        <div 
                            key={`${item.mes}-${item.ano}-${index}`}
                            className={styles.barWrapper}
                            data-tooltip={formatCurrency(item.valorFatura)}
                        >
                            <div className={styles.fullHeightTrack} />

                            <div
                                className={styles.bar}
                                style={{ height: `${altura}%`}} 
                            >
                                <span className={styles.label}>
                                    {item.mes}/{String(item.ano).slice(-2)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BarChart;
