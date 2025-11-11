import styles from "../components/AddReceiptModal.module.css";

export default function AddReceiptModal({ addReceipt, addIcon, onClose, onAddItem, onItemChange, onSubmit }) {
    return (
        <div className={styles.receiptModalBackDrop} role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={onClose}>
            <div className={styles.receiptModal} onClick={(e) => e.stopPropagation()}>
                <header className={styles.modalHeader}>
                    <h3 id="modalTitle">영수증 추가</h3>
                    <button className={styles.modalClose} onClick={onClose} aria-label="닫기">✕</button>
                </header>

                <div className={styles.modalBody}>
                    <div className={styles.addDate}>
                        <p className={styles.purchaseDate}>등록 날짜</p>
                        <input type="text" id="purchase-date" name="purchase-date" className={styles.dateInput} />
                    </div>

                    <div className={styles.addItems}>
                        <div className={styles.addItemsHeader}>
                            <p className={styles.addItemsLabel}>품목 추가</p>
                            <button
                                type="button"
                                className={styles.addItemBtn}
                                onClick={onAddItem}
                            >
                                <img src={addIcon} alt="add item icon" />
                            </button>
                        </div>

                        <ul className={styles.addItemsList}>
                            {(addReceipt?.items || []).map(item => (
                                <li key={item.id} className={styles.addItem}>
                                    <div className={styles.addItemName}>
                                        <p>품목 이름</p>
                                        <input 
                                            type="text" 
                                            placeholder="ex) 고기"
                                            value={item.name}
                                            onChange={(e) => onItemChange(item.id, "name", e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.addItemQuantity}>
                                        <p>수량</p>
                                        <input 
                                            type="text"
                                            placeholder="ex) 100"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => onItemChange(item.id, "quantity", e.target.value ? Number(e.target.value) : "")} 
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.addActions}>
                        <button type="button" className={styles.addCancelBtn} onClick={onClose}>
                            뒤로가기
                        </button>
                        <button type="button" className={styles.addSubmitBtn} onClick={onSubmit}>
                            영수증 추가
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}