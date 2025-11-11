import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// assets
import logo from "../../assets/images/FoodThing.png";

// css
import styles from "./Password.module.css";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        name: "",
        phone: "",
        birth8: "",
        gender: "", // "M" | "F"
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            return setForm((p) => ({ ...p, phone: value.replace(/\D/g, "").slice(0, 11) }));
        }
        if (name === "birth8") {
            return setForm((p) => ({ ...p, birth8: value.replace(/\D/g, "").slice(0, 8) }));
        }
        setForm((p) => ({ ...p, [name]: value }));
    };

    const selectGender = (g) => setForm((p) => ({ ...p, gender: g }));

    const validate = () => {
        if (!/^\S+@\S+\.\S+$/.test(form.email)) return alert("이메일 형식을 확인해 주세요.");
        if (!form.name.trim()) return alert("이름을 입력해 주세요.");
        if (!/^\d{10,11}$/.test(form.phone)) return alert("전화번호는 하이픈 없이 10~11자리 숫자만 입력해 주세요.");
        if (!/^\d{8}$/.test(form.birth8)) return alert("생년월일 8자리를 YYYYMMDD로 입력해 주세요.");
        if (!form.gender) return alert("성별을 선택해 주세요.");
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        // 실제 API 연동 시 토큰 등과 함께 넘겨주세요.
        // const { data } = await api.post('/users/forgot-password', form);
        // navigate('/reset-password', { state: { email: data.email, token: data.token } });

        navigate("/reset-password", { state: { email: form.email } }); // 데모용
    };

    return (
        <div className={styles.page}>
            <div className={styles.wrap}>
                <div className={styles.logoBox}>
                    <img src={logo} alt="FoodThing" className={styles.logoImg} />
                </div>

                <form className={styles.form} onSubmit={onSubmit} autoComplete="on">
                    <label className={styles.srOnly} htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={onChange}
                        required
                    />

                    <label className={styles.srOnly} htmlFor="name">이름</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="이름"
                        value={form.name}
                        onChange={onChange}
                        required
                    />

                    <label className={styles.srOnly} htmlFor="phone">전화번호</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="전화번호"
                        value={form.phone}
                        onChange={onChange}
                        required
                    />

                    <label className={styles.srOnly} htmlFor="birth8">생년월일 8자리</label>
                    <input
                        id="birth8"
                        name="birth8"
                        type="text"
                        inputMode="numeric"
                        placeholder="생년월일 8자리(YYYYMMDD)"
                        value={form.birth8}
                        onChange={onChange}
                        required
                        maxLength={8}
                    />

                    <div className={styles.genderRow} role="group" aria-label="성별 선택">
                        <button
                            type="button"
                            className={`${styles.genderBtn} ${form.gender === "M" ? styles.genderBtnActive : ""}`}
                            onClick={() => selectGender("M")}
                            aria-pressed={form.gender === "M"}
                        >
                            남자
                        </button>
                        <button
                            type="button"
                            className={`${styles.genderBtn} ${form.gender === "F" ? styles.genderBtnActive : ""}`}
                            onClick={() => selectGender("F")}
                            aria-pressed={form.gender === "F"}
                        >
                            여자
                        </button>
                    </div>

                    <button type="submit" className={styles.btnPrimary}>PW 찾기</button>
                </form>
            </div>
        </div>
    );
}
