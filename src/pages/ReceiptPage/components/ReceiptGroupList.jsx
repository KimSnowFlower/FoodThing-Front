import styles from "../components/ReceiptGroupList.module.css";

export default function ReceiptGroupList({ groups, calendarIcon, arrowIcon, onOpenGroup }) {
    return (
        <div className={styles.receiptContent} role="list">
            {groups.map(group => (
                <button
                    key={group.date}
                    className={styles.receiptGroup}
                    type="button"
                    onClick={() => onOpenGroup(group)}
                    aria-label={`영수증 ${group.date} 보기`}
                    role="listItem"
                >
                    <div className={styles.receiptGroupIconWrap} aria-hidden="true">
                        <img src={calendarIcon} alt="" className={styles.receiptGroupIcon} />
                    </div>
                    <div className={styles.receiptGroupInfo}>
                        <h4 className={styles.receiptDate}>{group.date}</h4>
                        <p className={styles.receiptCount}>{group.items.length}개의 품목</p>
                    </div>
                    <img src={arrowIcon} alt="" className={styles.receiptArrowBtn}/>
                </button>
            ))}
        </div>
    )
}