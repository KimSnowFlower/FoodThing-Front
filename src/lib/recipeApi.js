import api from "./api"

export const recipeApi = {

    // 레시피 추천
    getSuggestRecipe() {
        return api.get("/recipe/suggest", {
            headers: { accept: "application/json "},
        })
    },

    // 레시피 가져오기
    getFoodRecipe(foodInput) {
        return api.post("/recipe/cook", foodInput, {
            headers: { accept: "application/json"},
        })
    },

    // 메인 페이지 - 오늘 뭐 해먹지?
    generateRecipeByIngredients(chat) {
        return api.post("recipe/ingredient-cook", { chat })
    },
}