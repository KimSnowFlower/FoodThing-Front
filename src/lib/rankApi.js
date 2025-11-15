import api from "./api";

export const rankApi = {

    getRanking(config) {
        return api.get("/recipe/ranking", config);
    },
}