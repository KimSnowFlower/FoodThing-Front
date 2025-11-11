import rowStyles from "../components/SettingItemRow.module.css";

export default function SettingItemRow({
    title,
    sub,
    iconVariant,   // 'bell' | 'utensil'
    iconImg,       // optional image src
    chevron = false,
    right,         // right-side element (e.g., toggle)
    onClick,
}) {
    return (
        <button
            className={rowStyles.row}
            onClick={onClick}
            type="button"
            aria-pressed={undefined}
        >
            <div className={rowStyles.left}>
                <div
                    className={`${rowStyles.icon} ${iconVariant === "bell" ? rowStyles.bell : rowStyles.utensil
                        }`}
                    aria-hidden="true"
                >
                    {iconImg ? (
                        <img src={iconImg} alt="" className={rowStyles.iconImg} />
                    ) : iconVariant === "bell" ? (
                        <svg width="22" height="22" viewBox="0 0 24 24">
                            <path
                                d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z"
                                fill="currentColor"
                            />
                        </svg>
                    ) : null}
                </div>

                <div className={rowStyles.texts}>
                    <div className={rowStyles.title}>{title}</div>
                    {sub && <div className={rowStyles.sub}>{sub}</div>}
                </div>
            </div>

            {right ? (
                right
            ) : chevron ? (
                <svg className={rowStyles.chevron} width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M9 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : null}
        </button>
    );
};
