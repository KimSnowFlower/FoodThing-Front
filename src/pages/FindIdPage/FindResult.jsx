import { useLocation, useNavigate } from "react-router-dom";

// css
import styles from "./FindId.module.css";

// assets
import logo from "../../assets/images/FoodThing.png";

export default function FindIdResult() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const email = (() => {
        const raw = state?.email;
        if (typeof raw === "string") return raw;
        if (raw && typeof raw === "object") {
            const v = raw.user_email ?? raw.email ?? "";
            return typeof v === "string" ? v : JSON.stringify(v);
        }
        return "";
    })();

    if (!email) {
        return (
            <div className={styles.page}>
                <div className={styles.wrap}>
                    <div className={styles.logoBox} role="img" aria-label="FoodThing 로고">
                        <img src={logo} alt="FoodThing" className={styles.logoImg} />
                    </div>

                    <p className={styles.resultDesc}>조회 결과가 없습니다. 다시 시도해 주세요.</p>

                    <div className={styles.resultActions}>
                        <button className={styles.btnPrimary} onClick={() => navigate("/find-id")}>
                            다시 조회하기
                        </button>
                        <button className={styles.btnPrimary} onClick={() => navigate("/login")}>
                            로그인으로
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.wrap}>
                <div className={styles.logoBox} role="img" aria-label="FoodThing 로고">
                    <img src={logo} alt="FoodThing" className={styles.logoImg} />
                </div>

                <p className={styles.resultDesc}>고객님의 정보와 일치하는 이메일입니다.</p>

                <div className={styles.resultInput}>
                    <input type="text" value={email} readOnly aria-label="조회된 이메일" />
                </div>

                <div className={styles.resultActions}>
                    <button className={styles.btnPrimary} onClick={() => navigate("/login")}>
                        확인
                    </button>
                    <button
                        className={styles.btnPrimary}
                        onClick={() => navigate("/reset-password", { state: { email } })}
                    >
                        비밀번호 재설정
                    </button>
                </div>
            </div>
        </div>
    );
}
