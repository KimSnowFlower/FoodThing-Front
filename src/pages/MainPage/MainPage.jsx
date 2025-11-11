import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// components
//import TopBar from '../../components/TopBar';
//import TabBar from '../../components/TabBar';
import TodayWhatEat from './components/TodayWhatEat';
import RankingSection from './components/RankingSection';

// lib api
import api from "../../lib/api";

// css
import "../MainPage/MainPage.module.css";

// assets
import searchIconSrc from '../../assets/images/search_icon.svg';
import sendIconSrc from '../../assets/images/arrow_circle_icon.svg';
import todayIconSrc from '../../assets/images/today_what_eat_icon.png';
import BoardSection from './components/BoardSection';

const MainPage = () => {
    const navigate = useNavigate();

    // 오늘 뭐 해먹지? - 입력값
    const [ingredientInput, setIngredientInput] = useState("");

    // 랭킹, 게시글 - api 값 저장
    const [ranks, setRanks] = useState([]);
    const [posts, setPosts] = useState([]);

    // 로딩 관련
    const [loading, setLoading] = useState(false);
    const [listsLoading, setListsLoading] = useState(false);

    // Error
    const [error, setError] = useState("");

    // API Response 값 제한
    const limit= 5;

    // KST 포멧
    const formatKST = (iso) => {
        if (!iso) return "-";

        try {
            return new Data(iso).toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
        } catch {
            return iso;
        }
    }

    // useEffect
    useEffect(() => {
        // 페이지 파운트 때마다 fetch 1회
        const ac = new AbortController();

        fetchInitialData = async () => {
            setListsLoading(true);

            // 동시 벙렬 처리 (랭킹, 게시판)
            // 쿠키 포함은 api.js에서 설정 완료
            const rankPromise = api.get("/recipe/ranking", {
                params: { limit },
                signal: ac.signal,
            });

            const boardPromise = api.get("recipe/list", {
                params: { limit },
                signal: ac.signal,
            });

            rankPromise
                .then((res) => {
                    setRanks(Array.isArray(res.data) ? res.data : []);
                })
                .catch((e) => {
                    if(e?.code !== "ERR_CANCELED") {
                        console.error("[/recipe/ranking 호출 실패", e);
                        setRanks([]);
                    }
                });
            
            boardPromise
                .then((res) => {
                    setPosts(Array.isArray(res.data) ? res.data : []);
                })
                .catch((e) => {
                    if(e?.code !== "ERR_CANCELED") {
                        console.error("[/recipe/board 호출 실패", e);
                        setPosts([]);
                    }
                });

            setListsLoading(false);
        };

        fetchInitialData();

        return () => ac.abort();
    }, []); // 마운트마다 실행

    // 게시글 리스트 중에 클릭한 게시글로 이동
    const handleBoardItemClick = (postId) => {
        if(postId == null) return;

        navigate(`/board/details`, { state: {postId: postId }});
    }

    const onSubmitTodayWhatEat = async (e) => {
        e.preventDefault();
        setError("");

        const chat = ingredientInput.trim();

        if (!chat) return;

        try {
            setLoading(true);

            const res = await api.post(
                "/recipe/ingredient-cook",
                { chat },
            )

            navigate("/recommend/result", {state: { result: res.data, query: chat }});
        } catch (e) {
            console.error("[ingredient-cook 실패", e);
            setError("추천 요청에 실패했어요. 잠시 후 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    }

    const boardItems = useMemo(
        () => (posts && posts.length ? posts.slice(0, limit) : []),
        [posts]
    );

    const rankItems = useMemo(
        () => (ranks && ranks.length ? ranks.slice(0, limit) : []),
        [ranks]
    )

    return(
        <div className="main-page page-style">
            <div className="main-wrap">
                <div className="main-content" role="main">
                    <TodayWhatEat
                        ingredientInput={ingredientInput}
                        setIngredientInput={setIngredientInput}
                        loading={loading}
                        error={error}
                        onSumbit={onSubmitTodayWhatEat}
                        todayIconSrc={todayIconSrc}
                        searchIconSrc={searchIconSrc}
                        sendIconSrc={sendIconSrc}
                    />

                    <RankingSection laoding={listsLoading} items={rankItems}/>

                    <BoardSection
                        loading={listsLoading}
                        items={boardItems}
                        onNavigateBoard={() => navigate("/board")}
                        onItemClick={handleBoardItemClick}
                        formatKST={formatKST}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainPage;