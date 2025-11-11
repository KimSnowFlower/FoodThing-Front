import styles from "../components/RecipeCard.module.css";

const diffClass = (d) => {
    const n = Number(d) || 0;
    if (n <= 1) return `${styles.badge} ${styles.easy}`;
    if (n === 2) return `${styles.badge} ${styles.normal}`;
    if (n === 3) return `${styles.badge} ${styles.medium}`;
    if (n === 4) return `${styles.badge} ${styles.hard}`;
    return `${styles.badge} ${styles.expert}`;
};

export default function RecipeCard({ food, describe, useIngredients = [], difficulty, cookingTime, onClick }) {
    return (
        <button type="button" className={styles.btn} onClick={onClick} aria-label={`${food} 상세 보기`}>
            <div className={styles.head}>
                <h2 className={styles.food}>{food || "이름 없는 레시피"}</h2>
                <div className={styles.meta}>
                    <span className={diffClass(difficulty)}>Lv.{difficulty ?? "-"}</span>
                    <span className={styles.time}>{cookingTime ? `${cookingTime} min` : "-"}</span>
                </div>
            </div>

            {describe && <p className={styles.desc}>{describe}</p>}

            <div className={styles.ing}>
                <p className={styles.ingTitle}>사용 재료</p>
                {Array.isArray(useIngredients) && useIngredients.length > 0 ? (
                    <ul className={styles.chips}>
                        {useIngredients.map((ing, i) => (
                            <li className={styles.chip} key={`${ing}-${i}`}>{ing}</li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.muted}>표시할 재료가 없어요.</p>
                )}
            </div>
        </button>
    );
};
