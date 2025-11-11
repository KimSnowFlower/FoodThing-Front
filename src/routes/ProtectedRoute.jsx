import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { authed, loading }  = useAuth();
    const location = useLocation();

    // Auth 초기화/로그인 진행 중이면 리다이렉트하지 말고 로딩만
    if (loading) {
        return <div style={{ padding: 24, textAlign: "center" }}>Loading...</div>
    }

    // 미인증이면 페이지 이동
    if (!authed) {
        return <Navigate to="/login" replace state={{ form: location }}/>;
    }

    // 인증 0K -> 자식 라우트 표시
    return <Outlet/>
}