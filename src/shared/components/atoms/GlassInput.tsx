import React from 'react';
import styles from './GlassInput.module.css';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {};

const GlassInput = (props: Props) => {
    return (
        <input 
            {...props} 
            className={`${styles.input} ${props.className || ''}`} 
        />
    );
};

export default GlassInput;