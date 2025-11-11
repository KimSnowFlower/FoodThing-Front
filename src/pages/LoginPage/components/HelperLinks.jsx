import React from "react";
import { useNavigate } from "react-router-dom";

// css
import styles from "../components/HelperLinks.module.css";

export default function HelperLinks() {
    const navigate = useNavigate();
    return (
        <div className={styles.helperLinks} aria-label="도움 링크">
            <button type="button" className={styles.textLink} onClick={() => navigate("/find-id")}>
                아이디 찾기
            </button>
            <span className={styles.divider} aria-hidden>│</span>
            <button type="button" className={styles.textLink} onClick={() => navigate("/forgot-password")}>
                비밀번호 찾기
            </button>
            <span className={styles.divider} aria-hidden>│</span>
            <button type="button" className={styles.textLink} onClick={() => navigate("/register")}>
                회원가입
            </button>
        </div>
    );
}