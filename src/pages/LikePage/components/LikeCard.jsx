import styles from "../components/LikeCard.module.css";

// assets
import arrowCircleIcon from "../../../assets/images/arrow_circle_icon.svg";

export default function LikeCard({ item, rank, onClick }) {
    const ingredients = (item.recipe?.use_ingredients || [])
        .slice(0, 2)
        .map((i) => (typeof i === "string" ? i : i?.name))
        .filter(Boolean)
        .join(", ");

    return (
        <button className={styles.card} onClick={onClick} type="button" role="listitem">
            <div className={styles.left}>
                <div className={styles.rank}>{rank}</div>
            </div>
            <div className={styles.content}>
                <div className={styles.food}>{item.recipe?.food || "무명 레시피"}</div>
                <div className={styles.meta}>{ingredients}</div>
            </div>
            <div className={styles.right}>
                <img src={arrowCircleIcon} alt="arrow" className={styles.image} />
            </div>
        </button>
    );
};
