import m from "../components/LogoutModal.module.css";

export default function LogoutModal({ title, desc, onConfirm, onCancel }) {
    return (
        <div className={m.backdrop} role="dialog" aria-modal="true" aria-labelledby="logout-title">
            <div className={m.modal}>
                <h3 id="logout-title" className={m.title}>{title}</h3>
                <p className={m.desc}>{desc}</p>
                <div className={m.actions}>
                    <button className={m.btnLeft} onClick={onConfirm}>네</button>
                    <button className={m.btnRight} onClick={onCancel}>아니요</button>
                </div>
            </div>
        </div>
    )
};
