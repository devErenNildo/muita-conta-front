import React from 'react';
import GlassInput from '../atoms/GlassInput';
import styles from './FormField.module.css';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
};

const FormField = ({ label, id, ...rest }: Props) => {
    return (
        <div className={styles.fieldWrapper}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <GlassInput id={id} {...rest} />
        </div>
    );
};

export default FormField;