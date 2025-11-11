import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import TopBar from "../../components/TopBar";
import TabBar from "../../components/TabBar";
import PostCard from "../BoardPage/components/PostCard";
import ErrorBox from "../BoardPage/components/ErrorBox";

// api
import api from "../../lib/api";

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
                const res = await api.get("/board/list", { signal: ac.signal, withCredentials: true });
                const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
                if (reqIdRef.current === myReqId) setPosts(list);
            } catch (e) {
                if (e?.code !== "ERR_CANCELED" && reqIdRef.current === myReqId) setErr(e);
            } finally {
                if (reqIdRef.current === myReqId) setLoading(false);
            }
        }
        fetchList();
        return () => ac.abort();
    }, []);

    return (
        <div className={styles.page}>
            <TopBar />

            <div className={styles.wrap}>
                <main className={styles.content}>
                    {loading && <div className={styles.loading}>로딩 중…</div>}
                    <ErrorBox error={err} />
                    {!loading && !err && posts.length === 0 && <div className={styles.empty}>게시물이 없습니다.</div>}
                    {!loading && !err && posts.map((p) => (
                        <div key={safeKey(p.id)} onClick={() => navigate(`/board/${p.id}`, { state: { postId: p.id } })}>
                            <PostCard
                                post={p}
                                onLike={() => {/* TODO: 좋아요 API */ }}
                                onComment={() => {/* TODO: 댓글로 이동 */ }}
                            />
                        </div>
                    ))}
                </main>
            </div>

            <div className={styles.writeArea}>
                <button className={styles.writeBtn} onClick={() => navigate("/board/write")} type="button">
                    ✍️ 글쓰기
                </button>
            </div>

            <div className={styles.tabbarFixed}>
                <TabBar />
            </div>
        </div>
    );
}
