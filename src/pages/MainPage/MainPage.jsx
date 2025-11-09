import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import TopBar from '../../components/TopBar';
import TabBar from '../../components/TabBar';

// lib api
// import api from '../../lib/api';

// css
import "../MainPage/MainPage.module.css";

// assets
import search_icon from '../../assets/images/search_icon.svg';
import send_icon from '../../assets/images/arrow_circle_icon.svg';
import today_what_eat_icon from '../../assets/images/today_what_eat_icon.png';

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
            const rankPromise = api.get("/recipe/ranking", {

            });

            const boardPromise = api.get("recipe/list", {

            });
        }
    }, []);
}

export default MainPage;