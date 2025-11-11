import styles from "../SettingsPage.module.css";

export default function ProfileRow({ name }) {
    return (
        <section className={styles.profileRow} aria-label="프로필">
            <div className={styles.avatar} aria-hidden="true" />
            <div className={styles.profileName}>{name}</div>
        </section>
    )
};
