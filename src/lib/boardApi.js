import api from "./api";

export const boardApi = {

    // 전체 게시글 조회
    getAllBoard(config) {
        return api.get("/board/list", config);
    },

    // id 값 특정 글 가져오기
    getBoardById(boardId) {
        return api.get(`/board/${boardId}`, {
            withCredentials: true,
        });
    },

    // id 값 특정 글의 댓글 가져오기
    getBoardCommentById(boardId) {
        return api.get(`/board/${boardId}/comments`);
    },

    // 댓글 추가
    addComment(boardId, form) {
        return api.post(`/board/${boardId}/comment`, form, {
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
    },

    // 글 쓰기
    addBoard(form) {
        return api.post("/board", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
            validateStatus: () => true,
        })
    },
    
    // 게시글 추천
    addBoardLike(boardId) {
        return api.post(`/board/${boardId}/like`, {
            withCredentials: true,
        });
    }
}