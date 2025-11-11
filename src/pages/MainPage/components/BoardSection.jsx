import { useNavigate } from "react-router-dom";
import SectionCard from "./SectionCard";
import styles from "./BoardSection.module.css";


export default function BoardSection({ loading, items, onClickItem, formatDate }) {
    const navigate = useNavigate();

    const goBoard = () => navigate("/board");

    return (
        <SectionCard
            title="게시판"
            right={
                <button type="button" className={styles.navigateBtn} onClick={() => goBoard()}>
                    게시판 이동
                </button>
            }
        >
            {loading && (!items || items.length === 0) ? (
                <div className={styles.empty} aria-live="polite">게시글을 불러오는 중…</div>
            ) : items?.length > 0 ? (
                <ul className={styles.list} role="list">
                    {items.map((it) => {
                        const title = it.title ?? "-";
                        const nickname = it.author?.nickname ?? "-";
                        const created = formatDate?.(it.created_at) ?? "-";


                        return (
                            <li
                                key={it.id ?? title}
                                className={styles.item}
                                role="listitem"
                                onClick={() => onClickItem?.(it.id, title)}
                                style={{ cursor: it.id ? "pointer" : "default" }}
                            >
                                <div className={styles.left}>
                                    <div className={styles.title}>{title}</div>
                                    <div className={styles.author}>작성자: {nickname}</div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.meta}>
                                        <span className={styles.createdAt}>{created}</span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className={styles.empty} aria-live="polite">게시글을 불러오는 중…</div>
            )}
        </SectionCard>
    );
}