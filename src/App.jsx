import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 비보호 라우트
import LoginPage from "./pages/LoginPage/LoginPage";
import FindId from "./pages/FindIdPage/FindId";
import FindIdResult from "./pages/FindIdPage/FindResult";
import ForgotPassword from "./pages/PasswordPage/ForgotPassword";
import ResetPassword from "./pages/PasswordPage/ResetPassword";

// 보호 라우트
import MainPage from "./pages/MainPage/MainPage";
import ReceiptPage from "./pages/ReceiptPage/ReceiptPage";
import LikePage from "./pages/LikePage/LikePage";
import RecipePage from "./pages/RecipePage/RecipePage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import BoardPage from "./pages/BoardPage/BoardPage";
import BoardWrite from "./pages/BoardPage/BoardWritePage";
import BoardDetail from "./pages/BoardPage/BoardDetailPage";
import RecommendResultPage from "./pages/RecommendPage/RecommendResultPage";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import './App.css';

function App() {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  };

  useEffect(() => {
    setScreenSize(); // 최초 1회
    window.addEventListener('resize', setScreenSize);
    window.addEventListener('orientationchange', setScreenSize);
    return () => {
      window.removeEventListener('resize', setScreenSize);
      window.removeEventListener('orientationchange', setScreenSize);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-id/result" element={<FindIdResult />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* 보호 라우트 (로그인 인증 후 접근 가능 */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/receipt" element={<ReceiptPage />} />
            <Route path="likes" element={<LikePage />} />
            <Route path="recipe" element={<RecipePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/board/write" element={<BoardWrite />} />
            <Route path="/board/details" element={<BoardDetail />} />
            <Route path="/recommend/result" element={<RecommendResultPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;