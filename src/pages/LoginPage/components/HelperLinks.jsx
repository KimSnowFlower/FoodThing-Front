import React from "react";
import { useNavigate } from "react-router-dom";

export default function HelperLinks() {
    const navigate = useNavigate();
    return (
        <div className="helper-links" aria-label="도움 링크">
            <button type="button" className="text-link" onClick={() => navigate("/find-id")}>
                아이디 찾기
            </button>
            <span className="divider" aria-hidden>│</span>
            <button type="button" className="text-link" onClick={() => navigate("/forgot-password")}>
                비밀번호 찾기
            </button>
            <span className="divider" aria-hidden>│</span>
            <button type="button" className="text-link" onClick={() => navigate("/register")}>
                회원가입
            </button>
        </div>
    );
}