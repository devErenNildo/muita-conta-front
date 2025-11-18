import ColorSwatch from '../atoms/ColorSwatch';
import styles from './ColorPickerModal.module.css';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    currentColor: string;
    onColorSelect: (color: string) => void;
};

const PRESET_COLORS = [
    '#007BFF', '#343A40', '#C0C0C0', '#FFD700',
    '#DC3545', '#28A745', '#6F42C1',
];

const ColorPickerModal = ({ isOpen, onClose, currentColor, onColorSelect }: Props) => {
    if (!isOpen) return null;

    const isCustom = !PRESET_COLORS.includes(currentColor);

    const handleSelect = (color: string) => {
        onColorSelect(color);
    };

    const handleConfirm = () => {
        onClose();
    };

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles.title}>Selecione uma Cor</h3>

                <div className={styles.swatchGrid}>
                    {PRESET_COLORS.map((color) => (
                        <ColorSwatch
                            key={color}
                            color={color}
                            isActive={currentColor === color}
                            onClick={() => handleSelect(color)} 
                            aria-label={`Selecionar cor ${color}`}
                        />
                    ))}

                    <label className={`${styles.customSwatch} ${isCustom ? styles.customActive : ''}`}>
                        <div
                            className={styles.customInner}
                            style={{ background: isCustom ? currentColor : 'conic-gradient(from 180deg at 50% 50%, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)' }}
                        />
                        <input
                            type="color"
                            className={styles.hiddenInput}
                            value={currentColor}
                            onInput={(e) => handleSelect(e.currentTarget.value)}
                        />
                    </label>
                </div>

                <button className={styles.confirmButton} onClick={handleConfirm}>
                    Confirmar
                </button>
            </div>
        </div>
    );
};

export default ColorPickerModal;