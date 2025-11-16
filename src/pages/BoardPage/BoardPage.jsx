import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import TopBar from "../../components/TopBar";
import TabBar from "../../components/TabBar";
import PostCard from "../BoardPage/components/PostCard";
import ErrorBox from "../BoardPage/components/ErrorBox";

// api
import { boardApi } from "../../lib/boardApi";

// css
import styles from "../BoardPage/BoardPage.module.css";

/** 안전 키 생성 (id 없을 때 fallback) */
const safeKey = (id) => id ?? crypto.randomUUID();

export default function BoardPage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const reqIdRef = useRef(0);

    useEffect(() => {
        const ac = new AbortController();
        const myReqId = ++reqIdRef.current;

        async function fetchList() {
            try {
                setLoading(true);
                setErr(null);
                const res = await boardApi.getAllBoard({
                    signal: ac.signal,
                    withCredentials: true,
                });
                const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
                if (reqIdRef.current === myReqId) setPosts(list);
            } catch (e) {
                if (e?.code !== "ERR_CANCELED" && reqIdRef.current === myReqId) {
                    setErr(e);
                }
            } finally {
                if (reqIdRef.current === myReqId) setLoading(false);
            }
        }

        fetchList();
        return () => ac.abort();
    }, []);

    /** ❤️ 좋아요 토글 (서버에서 0/1로 내려주는 like_count 반영) */
    const handleAddLike = async (boardId) => {
        try {
            const res = await boardApi.addBoardLike(boardId, {
                withCredentials: true,
            });

            if (res.status === 200 || res.status === 201) {
                // 서버에서 { like_count: 0 | 1, ... } 형태로 온다고 가정
                const serverLike = res.data?.like_count;

                setPosts((prev) =>
                    prev.map((p) => {
                        if (p.id !== boardId) return p;

                        // 서버가 0/1을 명확히 주면 그 값 사용
                        if (serverLike === 0 || serverLike === 1) {
                            return { ...p, like_count: serverLike };
                        }

                        // 혹시 응답에 없으면 프론트에서 토글 (fallback)
                        const current = p.like_count === 1 ? 1 : 0;
                        const toggled = current === 1 ? 0 : 1;
                        return { ...p, like_count: toggled };
                    })
                );
            } else if (res.status === 401) {
                alert("로그인이 필요합니다.");
            } else {
                alert("좋아요 처리에 실패했습니다.");
            }
        } catch (err) {
            console.error("좋아요 토글 중 오류:", err);
            alert("좋아요 처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.page}>
            <TopBar />

            <div className={styles.wrap}>
                <main className={styles.content}>
                    {loading && <div className={styles.loading}>로딩 중…</div>}
                    <ErrorBox error={err} />
                    {!loading && !err && posts.length === 0 && (
                        <div className={styles.empty}>게시물이 없습니다.</div>
                    )}

                    {!loading && !err && posts.length > 0 && (
                        <ul className={styles.list}>
                            {posts.map((p) => (
                                <PostCard
                                    key={safeKey(p.id)}
                                    post={p}
                                    onClick={() =>
                                        navigate("/board/details", {
                                            state: { postId: p.id },
                                        })
                                    }
                                    onLike={() => handleAddLike(p.id)}
                                />
                            ))}
                        </ul>
                    )}
                </main>
            </div>

            <div className={styles.writeArea}>
                <button
                    className={styles.writeBtn}
                    onClick={() => navigate("/board/write")}
                    type="button"
                >
                    ✍️ 글쓰기
                </button>
            </div>

            <div className={styles.tabbarFixed}>
                <TabBar />
            </div>
        </div>
    );
}
