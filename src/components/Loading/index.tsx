import styles from "./style.module.scss";

const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.lds_dual_ring}></div>
        </div>
    );
};

export default Loading;
