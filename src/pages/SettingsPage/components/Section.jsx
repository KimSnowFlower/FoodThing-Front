import styles from "../SettingsPage.module.css";

export default function ({ title, children }) {
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            {children}
        </section>
    )
};
