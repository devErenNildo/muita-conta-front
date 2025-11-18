import React from 'react';
import GlassInput from '../atoms/GlassInput';
import styles from './FormField.module.css';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
    error?: string;
};

const FormField = ({ label, id, error, ...rest }: Props) => {
    return (
        <div className={styles.fieldWrapper}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <GlassInput
                id={id}
                hasError={!!error}
                {...rest}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default FormField;