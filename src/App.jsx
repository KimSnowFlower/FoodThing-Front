import { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";

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
    <Router>
      <Route path="/" element={<MainPage/>}></Route>
    </Router>
  )
}

export default App;