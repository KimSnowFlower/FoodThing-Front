import styles from "../RecommendResultPage.module.css";

export default function ChipsList({ items = [] }) {
    if (!items.length) return <p className={styles.muted}>표시할 재료가 없어요.</p>;
    return (
        <ul className={styles.chips} role="list">
            {items.map((txt, idx) => (
                <li key={`${txt}-${idx}`} className={styles.chip}>{txt}</li>
            ))}
        </ul>
    );
}
