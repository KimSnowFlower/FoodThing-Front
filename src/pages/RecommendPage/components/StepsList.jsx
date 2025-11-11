import styles from "../RecommendResultPage.module.css";

export default function StepsList({ steps = [] }) {
    if (!steps.length) return <p className={styles.muted}>요리 순서가 없어요.</p>;
    return (
        <ul className={styles.steps}>
            {steps.map((line, idx) => <li key={idx}>{idx + 1}. {line}</li>)}
        </ul>
    );
}
