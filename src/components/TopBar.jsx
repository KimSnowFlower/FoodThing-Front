// css
import styles from "./Bar.module.css";

// assets
import foodThingLogo from "../assets/images/FoodThing.png";

export default function TopBar () {
    return (
        <header className={styles.topBar} aria-label="브랜드 헤더">
            <div className={styles.logo}>
                <img src={foodThingLogo} alt="FoodThing"/>
            </div>
        </header>
    );
}