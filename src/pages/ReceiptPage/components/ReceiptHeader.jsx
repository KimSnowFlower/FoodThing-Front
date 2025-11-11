import styles from "../components/ReceiptHeader.module.css";

export default function ReceiptHeader({ moneyIcon, addIcon, totalCount, onOpenAdd }) {
    return (
        <header className={styles.receiptHeader}>
            <div className={styles.receiptHeaderIcon}>
                <img src={moneyIcon} alt="money icon"/>
            </div>
            <div className={styles.receiptHeaderText}>
                <h3>재료 보관함</h3>
                <p>{totalCount}개의 영수증</p>
            </div>
            <button
                className={styles.addReceiptBtn}
                type="button"
                onClick={onOpenAdd}
                aria-label="영수증 추가"
            >
                <img src={addIcon} alt="add receipt icon" />
                <div className={styles.addReceiptBtnText}>영수증 추가</div>
            </button>
        </header>
    )
}