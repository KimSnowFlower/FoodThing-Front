import styles from "../RecommendResultPage.module.css";

export default function LikeButton({ onClick, disabled, state = "idle" }) {
    const label =
        state === "loading" ? "전송중..." :
            state === "done" ? "좋아요 완료 ❤️" : "좋아요 ❤️";

    return (
        <div className={styles.likeButtonWrap}>
            <button
                type="button"
                className={styles.likeButton}
                onClick={onClick}
                disabled={disabled}
            >
                {label}
            </button>
        </div>
    );
}
