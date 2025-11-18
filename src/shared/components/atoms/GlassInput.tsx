import React from 'react';
import styles from './GlassInput.module.css';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    hasError?: boolean;
};

const GlassInput = ({ hasError, className, ...props }: Props) => {
    return (
        <input 
            {...props} 
            className={`${styles.input} ${hasError ? styles.error : ''} ${className || ''}`}
        />
    );
};

export default GlassInput;