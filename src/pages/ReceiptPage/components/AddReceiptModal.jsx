// src/pages/ReceiptPage/components/AddReceiptModal.jsx
import styles from "../components/AddReceiptModal.module.css";

export default function AddReceiptModal({
    addReceipt,
    addIcon,
    onClose,
    onAddItem,
    onRemoveItem,
    onItemChange,
    onDateChange,
    onSubmit,
    submitting,
}) {
    const items = addReceipt?.items || [];
    const purchaseDate = addReceipt?.purchase_date || "";

    return (
        <div
            className={styles.receiptModalBackDrop}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            onClick={onClose}
        >
            <div className={styles.receiptModal} onClick={(e) => e.stopPropagation()}>
                <header className={styles.modalHeader}>
                    <h3 id="modalTitle">영수증 추가</h3>
                    <button className={styles.modalClose} onClick={onClose} aria-label="닫기" disabled={submitting}>
                        ✕
                    </button>
                </header>

                <div className={styles.modalBody}>
                    {/* 날짜 */}
                    <div className={styles.addDate}>
                        <p className={styles.purchaseDate}>등록 날짜</p>
                        <input
                            type="date"
                            id="purchase-date"
                            name="purchase-date"
                            className={styles.dateInput}
                            value={purchaseDate}
                            onChange={(e) => onDateChange?.(e.target.value)}
                            disabled={submitting}
                        />
                    </div>

                    {/* 품목 리스트 */}
                    <div className={styles.addItems}>
                        <div className={styles.addItemsHeader}>
                            <p className={styles.addItemsLabel}>품목 추가</p>
                            <button
                                type="button"
                                className={styles.addItemBtn}
                                onClick={onAddItem}
                                disabled={submitting}
                            >
                                <img src={addIcon} alt="add item icon" />
                            </button>
                        </div>

                        <ul className={styles.addItemsList}>
                            {items.map((item) => (
                                <li key={item.id} className={styles.addItem}>
                                    <div className={styles.addItemName}>
                                        <p>품목 이름</p>
                                        <input
                                            type="text"
                                            placeholder="ex) 고기"
                                            value={item.name}
                                            onChange={(e) => onItemChange(item.id, "name", e.target.value)}
                                            disabled={submitting}
                                        />
                                    </div>
                                    <div className={styles.addItemQuantity}>
                                        <p>수량</p>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            placeholder="ex) 1"
                                            min="1"
                                            max="15"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const onlyNum = e.target.value.replace(/\D/g, "");
                                                onItemChange(item.id, "quantity", onlyNum ? Number(onlyNum) : "");
                                            }}
                                            disabled={submitting}
                                        />
                                    </div>
                                    <div className={styles.addItemRemove}>
                                        <button
                                            type="button"
                                            className={styles.removeBtn}
                                            onClick={() => onRemoveItem?.(item.id)}
                                            disabled={submitting || items.length <= 1}
                                            aria-label="행 삭제"
                                            title="행 삭제"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 액션 */}
                    <div className={styles.addActions}>
                        <button type="button" className={styles.addCancelBtn} onClick={onClose} disabled={submitting}>
                            뒤로가기
                        </button>
                        <button type="button" className={styles.addSubmitBtn} onClick={onSubmit} disabled={submitting}>
                            {submitting ? "추가 중…" : "영수증 추가"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
