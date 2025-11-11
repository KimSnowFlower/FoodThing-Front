import { useMemo } from "react";
import MediaCarousel from "./MediaCarousel";
import styles from "./PostCard.module.css";

/** YYYY-MM-DD */
const fmtDate = (iso) => {
    if (!iso) return "";
    try { return new Date(iso).toISOString().split("T")[0]; } catch { return iso; }
};

export default function PostCard({ post, onLike, onComment }) {
    const nickname = post?.author?.nickname ?? "익명";
    const title = post?.title ?? "";
    const content = post?.content ?? "";
    const likeCount = post?.like_count ?? 0;
    const created = fmtDate(post?.created_at);
    const images = useMemo(() => (Array.isArray(post?.image_urls) ? post.image_urls.filter(Boolean) : []), [post?.image_urls]);

    return (
        <article className={styles.card}>
            <header className={styles.head}>
                <div className={styles.author}>
                    <div className={styles.avatar} aria-hidden />
                    <div className={styles.meta}>
                        <div className={styles.name}>{nickname}</div>
                        <div className={styles.time}>{created}</div>
                    </div>
                </div>
                <button type="button" className={styles.more} aria-label="더보기">⋯</button>
            </header>

            <MediaCarousel images={images} square dotLight />

            <div className={styles.body}>
                {title && <div className={styles.comment} style={{ fontWeight: 700 }}>{title}</div>}
                {content && <div className={styles.comment}>{content}</div>}
                <div className={styles.actions}>
                    <button type="button" onClick={onLike}>❤️ 좋아요 {likeCount}</button>
                    <button type="button" onClick={onComment}>💬 댓글</button>
                </div>
            </div>
        </article>
    );
}
