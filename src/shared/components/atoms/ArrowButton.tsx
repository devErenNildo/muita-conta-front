import React from "react";
import { TbArrowBigRightLineFilled } from "react-icons/tb";
import styles from "./ArrowButton.module.css";

type Direction = "direita" | "esquerda" | "cima" | "baixo";

type Props = {
    direction: Direction;
    disable?: boolean;
    onClick?: () => void;
};

const ArrowButton: React.FC<Props> = ({ direction, onClick, disable }) => {
    
    const rotation = {
        direita: "0deg",
        baixo: "90deg",
        esquerda: "180deg",
        cima: "-90deg",
    }[direction];

    const style = {
        '--rotation': rotation,
    } as React.CSSProperties;

    return (
        <button
            onClick={onClick}
            className={styles.button}
            style={style}
            disabled={disable}
        >
            <TbArrowBigRightLineFilled size={32} />
        </button>
    );
};

export default ArrowButton;