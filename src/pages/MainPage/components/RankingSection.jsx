import SectionCard from "./SectionCard";
import styles from "./RankingSection.module.css";


export default function RankingSection({ loading, items }) {
    return (
        <SectionCard title="랭킹">
            {loading && (!items || items.length === 0) ? (
                <div className={styles.empty} aria-live="polite">랭킹을 불러오는 중…</div>
            ) : items?.length > 0 ? (
                <ul className={styles.list} role="list">
                    {items.map((it, idx) => {
                        const title = it.food_name ?? it.title ?? "-";
                        const rawScore = typeof it.count === "number" ? it.count : (typeof it.score === "number" ? it.score : 0);
                        const score = Math.max(0, Math.min(5, Math.round(rawScore)));
                        const reviewCount = typeof it.count === "number" ? it.count : undefined;


                        return (
                            <li key={title + idx} className={styles.item} role="listitem">
                                <div className={styles.left}>
                                    <div className={styles.title}>{idx + 1}위: {title}</div>
                                    <div className={styles.sub}>
                                        별점: <span className={styles.stars}>{"★".repeat(score)}{"☆".repeat(5 - score)}</span>
                                        {typeof reviewCount === "number" && (
                                            <span className={styles.count} aria-label={`리뷰 ${reviewCount}개`}>&nbsp;(리뷰 {reviewCount}개)</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className={styles.empty} aria-live="polite">랭킹을 불러오는 중…</div>
            )}
        </SectionCard>
    );
}