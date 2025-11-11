import { useEffect, useState } from "react";

// component
import TabBar from "../../components/TabBar";
import ReceiptHeader from "./components/ReceiptHeader";
import ReceiptGroupList from "./components/ReceiptGroupList";
import ReceiptGroupModal from "./components/ReceiptGroupModal";
import AddReceiptModal from "./components/AddReceiptModal";

// api
import api from "../../lib/api";

// css
import styles from "../ReceiptPage/ReceiptPage.module.css";

// assets
import moneyIcon from "../../assets/images/money_icon.png";
import addButtonIcon from "../../assets/images/add_button.svg";
import calendarIcon from "../../assets/images/calendar_icon.png";
import arrowIcon from "../../assets/images/arrow_circle_icon.svg";
import receiptAddButtonIcon from "../../assets/images/add_button.png";

export default function ReceiptPage() {
    const [receipts, setReceipts] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [addReceipt, setAddReceipt] = useState(null);

    // 품목 추가/수정 핸들러 (추가 모달)
    const handelAddItem = () => {
        setAddReceipt(prev => ({
            ...prev,
            items: [
                ...ReceiptPage(prev?.items || []),
                { id: Date.now(), name: "", quantity: 1},
            ],
        }));
    };

    const handleItemChange = (id, field, value) => {
        setAddReceipt(prev => ({
            ...prev,
            items: (prev?.items || []).map(it =>
                it.id === id? { ...it, [field]: value } : it
            ),
        }));
    };

    // 추가 모달 최초 오픈 시 최소 1개 아이템 보장
    useEffect(() => {
        if (addReceipt && (!addReceipt.items || addReceipt.items.length === 0)) {
            setAddReceipt(prev => ({
                ...prev,
                items: [{ id: Date.now(), name: "", quantity: 1}],
            }));
        }
    }, [addReceipt]);

    // 데이터 가져오기
    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const res = await api.get("/ingredients/detail");

                const grouped = (res?.data?.ingredients || []).reduce((acc, cur) => {
                    const d = cur.purchase_date;
                    (acc[d] ??= []).push(cur);

                    return acc;
                }, {});
                const sorted = Object.entries(grouped)
                .map(([date, items]) => ({ date, items }))
                .sort((a, b) => new Date(b.date) - new Date(a.date));

                setReceipts(sorted);
            } catch (error) {
                console.error("Error fetching receipts:", error);
            }
        };

        fetchReceipts();
    }, []);

    // ESC 닫기
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") setSelectedGroup(null); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div className={styles.receiptPage}>
            <div className={styles.receiptWrap}>
                <ReceiptHeader
                    moneyIcon={moneyIcon}
                    addIcon={receiptAddButtonIcon}
                    totalCount={receipts.length}
                    onOpenAdd={() => setAddReceipt({ items: [{ id: Date.now(), name: "", quantity: 1 }] })}
                />

                <ReceiptGroupList
                    groups={receipts}
                    calendarIcon={calendarIcon}
                    arrowIcon={arrowIcon}
                    onOpenGroup={setSelectedGroup}
                />

                {/* 그룹 상세 모달 */}
                {!!selectedGroup && (
                    <ReceiptGroupModal
                        group={selectedGroup}
                        onClose={() => setSelectedGroup(null)}
                    />
                )}

                {/* 영수증 추가 모달 */}
                {!!addReceipt && (
                <AddReceiptModal
                    addReceipt={addReceipt}
                    addIcon={addButtonIcon}
                    onClose={() => setAddReceipt(null)}
                    onAddItem={handelAddItem}
                    onItemChange={handleItemChange}
                    onSubmit={() => {
                    // TODO: 영수증 추가 제출 로직
                    // ex) api.post('/ingredients/receipt', addReceipt).then(() => setAddReceipt(null))
                    setAddReceipt(null);
                    }}
                />
                )}
            </div>
            <TabBar/>
        </div>
    );
}