import React from "react";

// components
import AuthLogo from "./components/AuthLogo";
import LoginForm from "./components/LoginForm";
import HelperLinks from "./components/HelperLinks";

// css
import styles from "../LoginPage/LoginPage.module.css";

// assets
import foodthingLogo from "../../assets/images/FoodThing.png";

const LoginPage = () => {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginWrap}>
                { /* 로고 부분 */}
                <AuthLogo src={foodthingLogo} alt="FoodThing 로고"/>

                {/* 로그인 폼*/}
                <LoginForm />

                { /* 아이디 찾기, 비밀번호 찾기, 회원가입 */}
                <HelperLinks/>
            </div>
        </div>
    );
}

export default LoginPage;