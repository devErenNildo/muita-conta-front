import type React from "react";
import { MdAdd } from "react-icons/md";
import styles from "./AddButton.module.css";
import { useMediaQuery } from "../../../app/hooks/useMediaQuery";

type EixoY = "up" | "down";
type EixoX = "right" | "left";

type Props = {
    disable?: boolean;
    onClick?: () => void;
    directionY?: EixoY;
    directionX?: EixoX;
};

const AddButton = ({
    onClick,
    disable,
    directionX = "right",
    directionY = "down"
}: Props) => {

    const isDesktop = useMediaQuery('(min-width: 992px)');
    const spacing = isDesktop ? "1.5rem" : "6rem";

    const dynamicPosition: React.CSSProperties = {
        position: "fixed",
        [directionY === "down" ? "bottom" : "top"]: spacing,
        [directionX === "right" ? "right" : "left"]: '1.5rem',
    };

    return (
        <button
            onClick={onClick}
            className={styles.button}
            disabled={disable}
            style={dynamicPosition}
        >
            <MdAdd size={50} />
        </button>
    );
}

export default AddButton;