import styles from "../components/ReceiptGroupModal.module.css";

export default function ReceiptGroupList({ group, onClose }) {
    return (
        <div
            className={styles.receiptModalBackDrop}
            role="dialog"
            aria-modal="true"
            aria-labelledby="receipt-modal-title"
            onClick={onClose}
        >
            <div className={styles.receiptModal} onClick={(e) => e.stopPropagation()}>
                <header className={styles.modalHeader}>
                    <h3 id="modalTitle">{group.date}</h3>
                    <button className={styles.modalClose} onClick={onClose} aria-label="닫기">✕</button>
                </header>

                <div className={styles.modalBody}>
                    <ul className={styles.modalList}>
                        {group.items.map(item => (
                            <li key={item.id} className={styles.modalItem}>
                                <div className={modalItemName}>{item.ingredient_name}</div>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.modalSummary}>
                        <p className={styles.modalSummaryText}>총 품목 수:</p>
                        <p className={styles.modalSummaryCount}>{group.items.length}개</p>
                    </div>
                </div>
            </div>
        </div>
    )
}