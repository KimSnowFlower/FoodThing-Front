import styles from "../components/SectionCard.module.css";

export default function SectionCard({ title, right, children }) {
    return (
        <section className={styles.card}>
            <header className={styles.cardHeader}>
                <div className={styles.badge}>{title}</div>
                {right ? <div className={styles.right}>{right}</div> : null}
            </header>
            <div className={styles.cardBody}>{children}</div>
        </section>
    );
}