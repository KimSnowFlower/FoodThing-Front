import { useNavigate, useLocation } from "react-router-dom";

// css
import styles from "./Bar.module.css";

// assets
import receiptIcon from "../assets/images/box.svg";
import recipeIcon from "../assets/images/recipe.svg";
import homeIcon from "../assets/images/home.png";
import likeIcon from "../assets/images/like.svg";
import settingsIcon from "../assets/images/settings.svg";

export default function TabBar() {
    const navigate = useNavigate();
    const { pathName } = useLocation();

    const isActive = (to) => pathName === to;

    return (
        <footer className={styles.tabBar} aria-label="하단 탭바">
            <div className={styles.tabInner}>
                <button
                    type="button"
                    className={`${styles.tabItem} ${isActive("/receipt") ? "active" : ""}`}
                    onClick={() => navigate("/receipt")}
                >
                    <img src={receiptIcon} alt="receipt" width="36" height="36"/>
                    <span>Receipt</span>
                </button>
                <button
                    type="button"
                    className={`${styles.tabItem} ${isActive("/recipes") ? "active" : ""}`}
                    onClick={() => navigate("/recipe")}
                >
                    <img src={recipeIcon} alt="recipe" width="36" height="36"/>
                    <span>Recipe</span>
                </button>
                <button
                    type="button"
                    className={`${styles.tabItem} ${isActive("/") ? "active" : ""}`}
                    onClick={() => navigate("/")}
                >
                    <img src={homeIcon} alt="home" width="36" height="36"/>
                    <span>Home</span>
                </button>
                <button
                    type="button"
                    className={`${styles.tabItem} ${isActive("/likes") ? "active" : ""}`}
                    onClick={() => navigate("/likes")}
                >
                    <img src={likeIcon} alt="like" width="36" height="36"/>
                    <span>Like</span>
                </button>
                <button
                    type="button"
                    className={`${styles.tabItem} ${isActive("/settings") ? "active" : ""}`}
                    onClick={() => navigate("/settings")}
                >
                    <img src={settingsIcon} alt="settings" width="36" height="36"/>
                    <span>Settings</span>
                </button>
            </div>
        </footer>
    )
}