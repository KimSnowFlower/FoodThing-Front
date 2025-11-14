import { useState } from "react";
import styles from "../BoardDetailPage.module.css";

const fmtDate = (iso) => {
    if (!iso) return "";
    try { return new Date(iso).toISOString().split("T")[0]; } catch { return iso; }
};

export default function CommentSection({ isOpen, comments, onSubmit }) {
    const [value, setValue] = useState("");

    const handleSumbit = (e) => {
        e.preventDefault();

        const text = value.trim();

        if (!text) return;

        onSubmit?.(text);
        setValue("");
    }

    return (
        <div className={`${styles.commentSection} ${isOpen ? styles.commentSectionOpen : ""}`}>
            <div className={styles.commentHeader}>
                <span>댓글 {comments.length}</span>
            </div>

            <ul className={styles.commentList}>
                {comments.map((c) => (
                    <li key={c.id} className={styles.commentItem}>
                        <div className={styles.commentMeta}>
                            <span className={styles.commentAuthor}>
                                {c.user_nickname ?? "익명"} |
                            </span>
                            <span className={styles.comment}>
                                {c.comment}
                            </span>
                            <span className={styles.commentTime}>
                                {fmtDate(c.created_at)}
                            </span>
                        </div>
                        <p className={styles.commentContent}>{c.content}</p>
                    </li>
                ))}
            </ul>

            <form className={styles.commentForm} onSubmit={handleSumbit}>
                <textarea
                    className={styles.commentInput}
                    rows={2}
                    placeholder="댓글을 입력해주세요"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit" className={styles.commentSubmit}>
                    등록
                </button>
            </form>
        </div>
    );
}