import { useMemo, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// components
import TopBar from "../../components/TopBar";
import TabBar from "../../components/TabBar";
import MediaCarousel from "../BoardPage/components/MediaCarousel";
import CommentSection from "../BoardPage/components/CommentSection";

// api
import { boardApi } from "../../lib/boardApi";

// css
import styles from "../BoardPage/BoardDetailPage.module.css";

/** YYYY-MM-DD */
const fmtDate = (iso) => {
    if (!iso) return "";
    try { return new Date(iso).toISOString().split("T")[0]; } catch { return iso; }
};

export default function BoardDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const idFromState = location.state?.postId;
    const id = idFromState ?? params.id; // 둘 다 지원

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    useEffect(() => {
        if (id != null) fetchPostDetail(id);
    }, [id]);

    const fetchPostDetail = async (boardId) => {
        try {
            const posts = await boardApi.getBoardById(boardId);
            setPost(posts.data);

            const comments = await boardApi.getBoardCommentById(boardId);
            setComments(comments.data);
        } catch (error) {
            console.error("[fetchPostDetail 실패]", error);
        }
    };

    const handleAddComment = async (comment) => {
        try {
            const form = new URLSearchParams();
            form.append("comment", comment);

            const res = await boardApi.addComment(boardId, form);
            setComments((prev) => [...prev, res.data]);
        } catch (error) {
            console.error("[댓글 작성 실패]", error);
        }
    };

    const images = useMemo(
        () => (Array.isArray(post?.image_urls) ? post.image_urls.filter(Boolean) : []),
        [post?.image_urls]
    );

    return (
        <div className={styles.page}>
            <TopBar />
            <div className={styles.container}>
                <div className={styles.content}>
                    {post ? (
                        <article className={styles.card}>
                            <header className={styles.head}>
                                <div className={styles.author}>
                                    <div className={styles.avatar} aria-hidden />
                                    <div className={styles.meta}>
                                        <div className={styles.name}>{post?.author?.nickname ?? "익명"}</div>
                                        <div className={styles.time}>{fmtDate(post?.created_at)}</div>
                                    </div>
                                </div>
                                <button type="button" className={styles.more} aria-label="더보기">⋯</button>
                            </header>

                            <MediaCarousel images={images} square={false} imgClassName={styles.detailImg} />

                            <div className={styles.body}>
                                {post?.title && <div className={styles.title}>{post.title}</div>}
                                {post?.content && <div className={styles.text}>{post.content}</div>}

                                <div className={styles.actions}>
                                    <button type="button">❤️ 좋아요 {post?.like_count ?? 0}</button>
                                    <button type="button" onClick={() => setIsCommentsOpen((prev) => !prev)}>💬 댓글 {comments.length}</button>
                                </div>

                                {/* To do 댓글이 보이는 기능 추가 */}
                                <CommentSection
                                    isOpen={isCommentsOpen}
                                    comments={comments}
                                    onSubmit={handleAddComment}
                                />
                            </div>
                        </article>
                    ) : (
                        <p>게시글을 불러오는 중입니다...</p>
                    )}
                </div>
            </div>
            <button type="button" className={styles.backBtn} onClick={() => navigate("/board")}>
                뒤로가기
            </button>

            <div className={styles.tabbarFixed}>
                <TabBar />
            </div>
        </div>
    );
}
