import api from "./api";

export const receiptApi = {

    // 재료 추가
    addIngredients(ingredientInput) {
        return api.post("/ingredients", ingredientInput);
    },

    // 데이터 조회 (detail)
    fetchIngredientsDetail() {
        return api.get("/ingredients/detail");
    }
}