import styles from "../SettingsPage.module.css";

export default function FooterActions({ onClose, onSave }) {
    return (
        <div className={styles.footerActions} role="group" aria-label="설정 액션">
            <button className={`${styles.btn} ${styles.btnGhost}`} onClick={onClose}>
                닫기
            </button>
            <button className={`${styles.btn} ${styles.btnSolid}`} onClick={onSave}>
                저장
            </button>
        </div>
    )
};
