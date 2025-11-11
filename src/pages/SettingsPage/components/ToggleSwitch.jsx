import t from "../components/ToggleSwitch.module.css";

export default function ToggleSwitch({ value, onChange }) {
    return (
        <span
            className={`${t.toggle} ${value ? t.on : t.off}`}
            onClick={(e) => {
                e.stopPropagation();
                onChange?.();
            }}
            role="switch"
            aria-checked={value}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange?.();
                }
            }}
        >
            <span className={t.knob} />
        </span>
    );
};
