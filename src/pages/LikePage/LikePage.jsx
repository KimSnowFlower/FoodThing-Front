import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import TopBar from "../../components/TopBar"
import TabBar from "../../components/TabBar";
import LikeCard from "../LikePage/components/LikeCard";
import LikeSkeleton from "../LikePage/components/LikeSkeleton";

// api
import api from "../../lib/api";

// css
import styles from "../LikePage/LikePage.module.css";

export default function LikePage() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.get("/recipe/like");
                const data = Array.isArray(res.data)
                    ? res.data
                    : res.data?.items || [];
                if (mounted) setItems(data);
            } catch (err) {
                console.error("GET /recipe/like error:", err?.response || err);
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    const openDetail = (item) => {
        if (item?.id)
            navigate(`/recipe/${item.id}`, { state: { result: item } });
        else console.info("open detail:", item);
    };

    return (
        <div className={styles.page}>
            <div className={styles.wrap}>
                <TopBar />
                <div className={styles.container}>
                    <h2 className={styles.title}>좋아요</h2>

                    {error && (
                        <div className={styles.error}>
                            목록을 불러오는 중 오류가 발생했습니다.
                        </div>
                    )}

                    <div className={styles.list} role="list">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <LikeSkeleton key={i} />
                            ))
                        ) : items.length === 0 ? (
                            <div className={styles.empty}>
                                아직 좋아요한 레시피가 없습니다.
                            </div>
                        ) : (
                            items.map((it, idx) => (
                                <LikeCard
                                    key={it.id || `${it.food}-${idx}`}
                                    item={it}
                                    rank={idx + 1}
                                    onClick={() => openDetail(it)}
                                />
                            ))
                        )}
                    </div>
                </div>
                <TabBar />
            </div>
        </div>
    );
};
