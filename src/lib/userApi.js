import api from "./api";

export const userApi = {

    // crendentials => { email, password 객체 }
    login(credentials) {
        return api.post("/users/log-in", credentials);
    }
}