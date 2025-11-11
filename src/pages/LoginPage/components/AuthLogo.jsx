import React from "react";

// css
import styles from "../components/AuthLogo.module.css"

export default function AuthLogo({ src, alt = "logo" }) {
    return (
        <div className={styles.logoContent} role="img" aria-label="FoodThing 로고">
            <img src={src} className={styles.logoImg} alt={alt} />
        </div>
    );
}