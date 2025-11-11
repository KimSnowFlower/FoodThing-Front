import RecipeCard from "./RecipeCard";
import styles from "../RecipePage.module.css";

export default function RecipeList({ recipes, onItemClick }) {
    return (
        <ul className={styles.list} aria-label="추천 레시피 목록">
            {recipes.map((r, idx) => (
                <li key={`${r.food ?? "recipe"}-${idx}`} className={styles.card}>
                    <RecipeCard
                        food={r.food}
                        describe={r.describe}
                        useIngredients={r.use_ingredients}
                        difficulty={r.difficulty}
                        cookingTime={r.cooking_time}
                        onClick={() => onItemClick(r.food, r.use_ingredients, r.difficulty)}
                    />
                </li>
            ))}
        </ul>
    );
};
