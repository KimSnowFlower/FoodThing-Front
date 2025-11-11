import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 비보호 라우트
import LoginPage from "./pages/LoginPage/LoginPage";

// 보호 라우트
import MainPage from "./pages/MainPage/MainPage";
import ReceiptPage from "./pages/ReceiptPage/ReceiptPage";
import LikePage from "./pages/LikePage/LikePage";
import RecipePage from "./pages/RecipePage/RecipePage";

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
          {/* 보호 라우트 (로그인 인증 후 접근 가능 */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/receipt" element={<ReceiptPage />} />
            <Route path="likes" element={<LikePage />} />
            <Route path="recipe" element={<RecipePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;