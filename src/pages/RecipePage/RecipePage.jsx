import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// css
import TopBar from "../../components/TopBar";
import TabBar from "../../components/TabBar";

// api
import { recipeApi } from "../../lib/recipeApi";

import RecipeList from "../RecipePage/components/RecipeList";
import StateBlock from "../RecipePage/components/StateBlock";
import LoadingSkeleton from "../RecipePage/components/LoadingSkeleton";

import styles from "../RecipePage/RecipePage.module.css";

export default function RecipePage() {
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    // 중복 호출 방지
    const inFlight = useRef(false);
    const clickInFlight = useRef(false);

    const fetchSuggest = async () => {
        if (inFlight.current) return;
        inFlight.current = true;

        try {
            setErr("");
            setLoading(true);
            const res = await recipeApi.getSuggestRecipe();
            const list = res?.data?.recipes ?? [];
            setRecipes(Array.isArray(list) ? list.slice(0, 5) : []);
        } catch (e) {
            setErr("레시피 추천을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
            setRecipes([]);
        } finally {
            inFlight.current = false;
            setLoading(false);
        }
    };

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setErr("");
                setLoading(true);
                const res = await recipeApi.getSuggestRecipe();
                if (!alive) return;
                const list = res?.data?.recipes ?? [];
                setRecipes(Array.isArray(list) ? list.slice(0, 5) : []);
            } catch (e) {
                if (!alive) return;
                setErr("레시피 추천을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
                setRecipes([]);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, []);

    const handleRecipeClick = async (food, use_ingredients, difficulty) => {
        if (!food || clickInFlight.current) return;
        clickInFlight.current = true;

        try {
            setErr("");
            const requestBody = {
                food,
                use_ingredients: Array.isArray(use_ingredients) ? use_ingredients : [],
                difficulty: Number(difficulty) || 0,
            };

            const res = await recipeApi.getFoodRecipe(requestBody);

            const data = res?.data;
            if (!data) {
                setErr("레시피 상세를 불러오지 못했습니다.");
                return;
            }

            const normalized = {
                food: data.food ?? food,
                difficulty: data.difficulty ?? difficulty,
                use_ingredients: Array.isArray(data.use_ingredients) ? data.use_ingredients : [],
                steps: Array.isArray(data.steps) ? data.steps : Array.isArray(data.step) ? data.step : [],
                tip: data.tip ?? "",
                video: data.video ?? "",
            };

            navigate("/recommend/result", { state: { result: normalized } });
        } catch (e) {
            console.error("API Error:", e.response?.data || e);
            const resp = e?.response;
            if (resp?.data) setErr(resp.data.message ?? JSON.stringify(resp.data));
            else setErr("레시피 상세를 불러오지 못했습니다.");
        } finally {
            clickInFlight.current = false;
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.wrap}>
                <TopBar />

                <main className={styles.content} role="main" aria-label="레시피 콘텐츠 영역">
                    <header className={styles.header}>
                        <h1 className={styles.title}>추천 레시피</h1>
                    </header>

                    {loading && (
                        <StateBlock type="loading">
                            <LoadingSkeleton count={5} />
                        </StateBlock>
                    )}

                    {!loading && err && (
                        <StateBlock type="error" message={err} onRetry={fetchSuggest} />
                    )}

                    {!loading && !err && recipes.length === 0 && (
                        <StateBlock type="empty" message="추천 결과가 없습니다." />
                    )}

                    {!loading && !err && recipes.length > 0 && (
                        <RecipeList recipes={recipes} onItemClick={handleRecipeClick} />
                    )}
                </main>
            </div>

            <TabBar />
        </div>
    );
}
