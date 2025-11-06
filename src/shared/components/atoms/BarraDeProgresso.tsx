import styles from "./BarradeProgresso.module.css";

type Props = {
    percent: number;
};

const BarradeProgresso = ({ percent }: Props) => {
    return (
        <div>
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}

export default BarradeProgresso;