import styles from "../BoardPage.module.css";

/** YYYY-MM-DD */
const fmtDate = (iso) => {
    if (!iso) return "";
    try {
        return new Date(iso).toISOString().split("T")[0];
    } catch {
        return iso;
    }
};

export default function PostCard({ post, onClick, onLike }) {
    const nickname = post?.author?.nickname ?? "익명";
    const title = post?.title ?? "";
    const created = fmtDate(post?.created_at);

    // like_count: 0 | 1 기준으로 상태 판단
    const liked = post?.like_count === 1;

    const handleLikeClick = (e) => {
        e.stopPropagation(); // 상세 이동 막고 좋아요만 동작
        onLike?.();
    };

    return (
        <li className={styles.item}>
            <div className={styles.inner} onClick={onClick}>
                <div className={styles.titleRow}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                </div>

                <div className={styles.metaRow}>
                    <div className={styles.metaLeft}>
                        <span className={styles.nickname}>{nickname}</span>
                        {created && (
                            <>
                                <span className={styles.dot}>·</span>
                                <span className={styles.date}>{created}</span>
                            </>
                        )}
                    </div>

                    <button
                        type="button"
                        className={`${styles.likeBtn} ${liked ? styles.likeBtnActive : ""
                            }`}
                        onClick={handleLikeClick}
                    >
                        {liked ? "❤️ 좋아요" : "🤍 좋아요"}
                    </button>
                </div>
            </div>
        </li>
    );
}
