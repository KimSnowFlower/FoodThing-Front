import styles from "../RecommendResultPage.module.css";

export default function TitleHeader({ title, meta, tags = [] }) {
    return (
        <header className={styles.resultHeader}>
            {meta ? <div className={styles.small}>{meta}</div> : null}
            <h1 className={styles.title}>{title}</h1>
            {Array.isArray(tags) && tags.length > 0 && (
                <ul className={styles.tags} role="list">
                    {tags.map((t, i) => (
                        <li key={i} className={styles.tag}>{t}</li>
                    ))}
                </ul>
            )}
        </header>
    );
}
