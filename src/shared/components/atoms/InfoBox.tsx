import styles from './InfoBox.module.css';

type Props = {
    label: string;
    value: string | number;
    icon?: React.ReactNode; 
};

const InfoBox = ({ label, value, icon }: Props) => {
    return (
        <div className={styles.infoBox}>
            <span className={styles.label}>{icon} {label}</span>
            <span className={styles.value}>{value}</span>
        </div>
    );
};

export default InfoBox;