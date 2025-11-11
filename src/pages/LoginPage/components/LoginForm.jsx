import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [form, setForm] = useState({ email: "", password: ""});
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
            alert("아이디/비밀번호를 입력해 주세요.");
            return;
        }

        try {
            setSubmitting(true);

            // 쿠키 세션 심기
            const { ok, error } = await login(email, password);
            
            if (!ok) {
                alert(error || "로그인에 실패했습니다. 입력 정보를 확인해 주세요.");
                return;
            }

            const dest = location.state?.form.pathname || "/";

            navigate(dest, { replace: true });
        } catch (error) {
            console.error("[로그인 실패]", error);

            const msg =
                error?.response?.data?.message ||
                error?.response?.data?.detail ||
                "로그인에 실패했습니다. (정보를 확인해 주세요.)";

            alert(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form className="login-form" onSubmit={onSubmit} autoComplete="on">
            <label className="sr-only" htmlFor="email">아이디</label>
            <input
                id="email"
                name="email"
                type="text"
                inputMdoe="text"
                placeholder="아이디"
                value={form.email}
                onChange={onChange}
                required
            />

            <label className="sr-only" htmlFor="password">비밀번호</label>
            <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                value={form.password}
                onChange={onChange}
                required
            />

            <button type="submit" className="login-button" disabled={submitting}>
                {submitting ? "로그인 중..." : "로그인" } 
            </button>
        </form>
    );
}