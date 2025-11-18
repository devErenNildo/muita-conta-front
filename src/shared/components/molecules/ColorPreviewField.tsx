import styles from './ColorPreviewField.module.css';

type Props = {
    label: string;
    color: string;
    onClick: () => void;
};

const ColorPreviewField = ({ label, color, onClick }: Props) => {
    return (
        <div className={styles.fieldWrapper}>
            <label className={styles.label}>{label}</label>
            <button 
                type="button" 
                className={styles.previewButton} 
                onClick={onClick}
            >
                <span 
                    className={styles.colorSwatch} 
                    style={{ backgroundColor: color }}
                />
                <span className={styles.colorHex}>{color.toUpperCase()}</span>
            </button>
        </div>
    );
};

export default ColorPreviewField;