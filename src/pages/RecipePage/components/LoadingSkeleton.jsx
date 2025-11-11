import styles from "../components/LoadingSkeleton.module.css";

export default function LoadingSkeleton({ count = 5 }) {
    return (
        <div className={styles.wrap} aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={styles.skeleton} />
            ))}
        </div>
    );
};
