import styles from "../SettingsPage.module.css";

export default function ({ onBack }) {
    return (
        <header className={styles.topbar} role="banner">
            <button className={styles.backBtn} aria-label="뒤로가기" onClick={onBack}>
                <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M15 18l-6-6 6-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <h1 className={styles.topbarTitle}>설정</h1>
        </header>
    )
};
