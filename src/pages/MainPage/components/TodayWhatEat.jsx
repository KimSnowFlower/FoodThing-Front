import todayIcon from "../../../assets/images/today_what_eat_icon.png";
import searchIcon from "../../../assets/images/search_icon.svg";
import sendIcon from "../../../assets/images/arrow_circle_icon.svg";

import styles from "../components/TodayWhatEat.module.css";


export default function TodayWhatEatSection({ value, onChange, onSubmit, loading, error }) {
    return (
        <section className={styles.wrap}>
            <div className={styles.headerRow}>
                <div className={styles.icon} aria-hidden>
                    <img src={todayIcon} alt="" width={32} height={32} />
                </div>
                <h2 className={styles.title}>오늘 뭐 해먹지?</h2>
            </div>

            <form
                className={styles.searchForm}
                role="search"
                aria-label="재료 검색"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit?.();
                }}
            >
                <div className={styles.searchField}>
                    <img src={searchIcon} alt="검색 아이콘" className={styles.iconLeft} width={20} height={20} />
                    <input
                        type="text"
                        name="ingredients"
                        placeholder="재료를 입력해 보세요 (예: 양파, 베이컨, 새우)"
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        autoComplete="off"
                        inputMode="text"
                        aria-label="재료 입력"
                        disabled={loading}
                    />
                    <button type="submit" className={styles.iconButton} aria-label="추천 요청" disabled={loading}>
                        <img src={sendIcon} alt="전송 아이콘" className={styles.iconRight} width={24} height={24} />
                    </button>
                </div>
            </form>


            {error ? (
                <p className={styles.errorText} role="alert">{error}</p>
            ) : null}
        </section>
    );
}