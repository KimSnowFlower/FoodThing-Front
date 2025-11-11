import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// assets
import logo from "../../assets/images/FoodThing.png";

// css
import styles from "./Password.module.css";

export default function ResetPassword() {
    const { state } = useLocation();
    const email = state?.email || "";
    const navigate = useNavigate();

    const [pw, setPw] = useState("");
    const [pw2, setPw2] = useState("");
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const validate = () => {
        if (pw.length < 6) return alert("비밀번호는 6자 이상 입력해 주세요.");
        if (pw !== pw2) return alert("비밀번호가 서로 일치하지 않습니다.");
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        // 실제 API 연동
        // await api.post('/users/reset-password', { token: state.token, password: pw });

        alert("비밀번호가 재설정되었습니다.");
        navigate("/login");
    };

    return (
        <div className={styles.page}>
            <div className={styles.wrap}>
                <div className={styles.logoBox}>
                    <img src={logo} alt="FoodThing" className={styles.logoImg} />
                </div>

                {email && <p className={styles.hintEmail}>{email}</p>}

                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.pwField}>
                        <label className={styles.srOnly} htmlFor="newPw">새 비밀번호</label>
                        <input
                            id="newPw"
                            type={show ? "text" : "password"}
                            placeholder="새 비밀번호"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            minLength={6}
                            required
                        />
                        <button
                            type="button"
                            className={styles.pwToggle}
                            onClick={() => setShow((s) => !s)}
                            aria-label="비밀번호 보기 토글"
                        >
                            {show ? "숨김" : "표시"}
                        </button>
                    </div>

                    <div className={styles.pwField}>
                        <label className={styles.srOnly} htmlFor="newPw2">새 비밀번호 확인</label>
                        <input
                            id="newPw2"
                            type={show2 ? "text" : "password"}
                            placeholder="새 비밀번호 확인"
                            value={pw2}
                            onChange={(e) => setPw2(e.target.value)}
                            minLength={6}
                            required
                        />
                        <button
                            type="button"
                            className={styles.pwToggle}
                            onClick={() => setShow2((s) => !s)}
                            aria-label="비밀번호 보기 토글"
                        >
                            {show2 ? "숨김" : "표시"}
                        </button>
                    </div>

                    <button type="submit" className={styles.btnPrimary}>비밀번호 재설정</button>
                </form>
            </div>
        </div>
    );
}
