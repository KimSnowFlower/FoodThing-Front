import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
//import TopBar from "../../components/TopBar";
//import TabBar from "../../components/TabBar";
import api from "../../lib/api";

import TodayWhatEatSection from "./components/TodayWhatEat";
import RankingSection from "./components/RankingSection";
import BoardSection from "./components/BoardSection";

import styles from "./MainPage.module.css";

// 공통 날짜 포맷터 (KST)
const formatKST = (iso) => {
    if (!iso) return "-";
    try {
        return new Date(iso).toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    } catch {
        return iso;
    }
};

export default function MainPage() {
    const navigate = useNavigate();

    // 오늘 뭐 해먹지?
    const [query, setQuery] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitErr, setSubmitErr] = useState("");

    // 리스트 데이터
    const [posts, setPosts] = useState([]);
    const [ranks, setRanks] = useState([]);
    const [listsLoading, setListsLoading] = useState(false);

    const limit = 5;


    // 추천 요청 (폼 submit 핸들러)
    const handleTodaySubmit = useCallback(async () => {
        setSubmitErr("");
        const chat = query.trim();
        if (!chat) return;


        try {
            setSubmitting(true);
            const res = await api.post("/recipe/ingredient-cook", { chat });
            navigate("/recommend/result", { state: { result: res.data, query: chat } });
        } catch (e) {
            console.error("[ingredient-cook 실패]", e);
            setSubmitErr("추천 요청에 실패했어요. 잠시 후 다시 시도해주세요.");
        } finally {
            setSubmitting(false);
        }
    }, [navigate, query]);


    useEffect(() => {
        const ac = new AbortController();


        const fetchInitialData = async () => {
            setListsLoading(true);


            const boardPromise = api.get("/board/list", {
                params: { limit },
                signal: ac.signal,
            });
            const rankPromise = api.get("/recipe/ranking", {
                params: { limit },
                signal: ac.signal,
            });


            boardPromise
                .then((res) => {
                    const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
                    setPosts(Array.isArray(list) ? list : []);
                })
                .catch((e) => {
                    if (e?.code !== "ERR_CANCELED") {
                        console.error("[/board/list 실패]", e);
                        setPosts([]);
                    }
                });


            rankPromise
                .then((res) => {
                    setRanks(Array.isArray(res.data) ? res.data : []);
                })
                .catch((e) => {
                    if (e?.code !== "ERR_CANCELED") {
                        console.error("[/recipe/ranking 실패]", e);
                        setRanks([]);
                    }
                })
                .finally(() => setListsLoading(false));
        };


        fetchInitialData();
        return () => ac.abort();
    }, []);

    const boardItems = useMemo(() => (posts?.length ? posts.slice(0, limit) : []), [posts]);
    const rankItems = useMemo(() => (ranks?.length ? ranks.slice(0, limit) : []), [ranks]);

    return (
        <div className={styles.mainPage}>
            <div className={styles.mainWrap}>
                <main className={styles.mainContent} role="main">
                    {/* 오늘 뭐 해먹지? */}
                    <TodayWhatEatSection
                        value={query}
                        onChange={setQuery}
                        onSubmit={handleTodaySubmit}
                        loading={submitting}
                        error={submitErr}
                    />

                    {/* 랭킹 */}
                    <RankingSection
                        loading={listsLoading}
                        items={rankItems}
                    />

                    {/* 게시판 */}
                    <BoardSection
                        loading={listsLoading}
                        items={boardItems}
                        onClickItem={(id, title) => {
                            if (!id) return;
                            navigate("/board/details", { state: { postId: id, title } });
                        }}
                        formatDate={formatKST}
                    />
                </main>
            </div>
        </div>
    );
}