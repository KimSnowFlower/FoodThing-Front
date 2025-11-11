import styles from "../components/StateBlock.module.css";

const Spinner = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className={styles.spin} aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
);

export default function StateBlock({ type, message, onRetry, children }) {
    if (type === "loading") {
        return (
            <div className={`${styles.state} ${styles.loading}`}>
                <Spinner />
                <span>불러오는 중…</span>
                {children}
            </div>
        );
    }

    if (type === "error") {
        return (
            <div className={`${styles.state} ${styles.error}`} role="alert">
                {message}
                {onRetry && (
                    <button type="button" className={styles.retryBtn} onClick={onRetry}>
                        다시 시도
                    </button>
                )}
            </div>
        );
    }

    if (type === "empty") {
        return <div className={`${styles.state} ${styles.empty}`}>{message}</div>;
    }

    return <div className={styles.state}>{children}</div>;
};
