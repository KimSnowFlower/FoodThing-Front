import styles from "../components/SectionCard.module.css";


export default function SectionCard({ title, right, children, className }) {
    return (
        <section className={`${styles.card} ${className ?? ""}`.trim()}>
            <header className={styles.cardHeader}>
                <div className={styles.badge}>{title}</div>
                {right ? <div className={styles.right}>{right}</div> : null}
            </header>
            <div className={styles.cardBody}>{children}</div>
        </section>
    );
}