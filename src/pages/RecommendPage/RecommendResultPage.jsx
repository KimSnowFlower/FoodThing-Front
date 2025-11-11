import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// compoents
import TopBar from "../../components/TopBar";
import TabBar from "../../components/TabBar";
import TitleHeader from "./components/TitleHeader";
import ChipsList from "./components/ChipsList";
import StepsList from "./components/StepsList";
import LikeButton from "./components/LikeButton";

// api
import api from "../../lib/api";

// css
import styles from "./RecommendResultPage.module.css";

function toText(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    if (typeof v === "object") {
        const name = v.name ?? v.title ?? v.ingredient ?? v.item ?? null;
        const amount = v.amount ?? v.qty ?? v.quantity ?? null;
        const unit = v.unit ?? null;
        const text = v.text ?? v.desc ?? v.description ?? null;
        if (name) return `${name}${amount != null ? ` ${amount}` : ""}${unit ? ` ${unit}` : ""}`.trim();
        if (text) return String(text);
        try { return JSON.stringify(v); } catch { return "[object]"; }
    }
    return String(v);
}
function toArray(v) {
    if (Array.isArray(v)) return v;
    if (v == null || v === "") return [];
    if (typeof v === "string") {
        const t = v.trim();
        if (!t) return [];
        if (t.includes(",")) return t.split(",").map(s => s.trim()).filter(Boolean);
        return [t];
    }
    return [v];
}
/* -------------------------------- */

export default function RecommendResultPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLiking, setIsLiking] = useState(false);
    const [liked, setLiked] = useState(false);

    const raw = location.state?.result || location.state?.recipe || null;
    const data = raw && raw.recipe ? raw.recipe : raw; // recipe 안에 또 있으면 펼치기

    if (!data) {
        return (
            <div className={styles.page}>
                <div className={styles.wrap}>
                    <TopBar />
                    <main className={styles.content}>
                        <div className={styles.empty}>
                            <p>결과 데이터가 없어요. 재료를 다시 입력해 주세요.</p>
                            <button
                                type="button"
                                className={styles.backBtn}
                                onClick={() => navigate("/")}
                            >
                                재료 다시 입력하기
                            </button>
                        </div>
                    </main>
                    <TabBar />
                </div>
            </div>
        );
    }

    const {
        food,
        difficulty,
        cooking_time,
        use_ingredients,
        steps,
        tip,
        video,
        tag,
    } = data;

    const ingredientsList = toArray(use_ingredients).map(toText).filter(Boolean);
    const stepsList = toArray(steps).map(toText).filter(Boolean);
    const tagsList = toArray(tag).map(toText).filter(Boolean);

    const meta = `난이도 ${toText(difficulty)}${cooking_time ? ` · ${cooking_time} min` : ""}`;

    const handleAddLike = async () => {
        if (isLiking || liked) return;
        setIsLiking(true);
        try {
            const normalizedIngredients = Array.isArray(use_ingredients)
                ? use_ingredients
                : ingredientsList.map((txt) => ({ name: txt }));

            const payload = {
                food: food ?? toText(food),
                use_ingredients: normalizedIngredients,
                steps: stepsList,
                tip: tip ?? null,
                _ai_provider: data._ai_provider ?? "ollama",
            };

            await api.post("/recipe/like", payload);
            setLiked(true);
        } catch (err) {
            console.error("좋아요 처리 중 오류:", err?.response?.data || err);
        } finally {
            setIsLiking(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.wrap}>
                <TopBar />

                <main className={styles.content} role="main">
                    <TitleHeader title={toText(food) || "추천 요리"} meta={meta} tags={tagsList} />

                    <section className={styles.card}>
                        <h2 className={styles.cardTitle}>사용 재료</h2>
                        <ChipsList items={ingredientsList} />
                    </section>

                    <section className={styles.card}>
                        <h2 className={styles.cardTitle}>요리 순서</h2>
                        <StepsList steps={stepsList} />
                    </section>

                    {toText(tip) && (
                        <section className={styles.card}>
                            <h2 className={styles.cardTitle}>팁</h2>
                            <p className={styles.tip}>{toText(tip)}</p>
                        </section>
                    )}

                    {toText(video) && (
                        <section className={styles.card}>
                            <h2 className={styles.cardTitle}>관련 영상</h2>
                            <a className={styles.link} href={toText(video)} target="_blank" rel="noreferrer">
                                영상 보러가기
                            </a>
                        </section>
                    )}

                    <div className={styles.spacer} />

                    <LikeButton
                        onClick={handleAddLike}
                        disabled={isLiking || liked}
                        state={isLiking ? "loading" : liked ? "done" : "idle"}
                    />
                </main>

                <TabBar />
            </div>
        </div>
    );
}
