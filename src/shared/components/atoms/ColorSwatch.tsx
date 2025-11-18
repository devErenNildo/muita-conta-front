import React from 'react';
import styles from './ColorSwatch.module.css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color: string;
    isActive: boolean;
};

const ColorSwatch = ({ color, isActive, ...rest }: Props) => {
    return (
        <button
            type="button"
            className={`${styles.swatch} ${isActive ? styles.active : ''}`}
            style={{ backgroundColor: color }}
            {...rest}
        />
    );
};

export default ColorSwatch;