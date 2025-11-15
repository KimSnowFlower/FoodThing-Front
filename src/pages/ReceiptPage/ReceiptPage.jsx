import { useEffect, useState, useCallback } from "react";
import TabBar from "../../components/TabBar";
import ReceiptHeader from "./components/ReceiptHeader";
import ReceiptGroupList from "./components/ReceiptGroupList";
import ReceiptGroupModal from "./components/ReceiptGroupModal";
import AddReceiptModal from "./components/AddReceiptModal";

// api
import { receiptApi } from "../../lib/ReceiptApi";

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
    const [addReceipt, setAddReceipt] = useState(null); // { purchase_date: 'YYYY-MM-DD', items: [{id,name,quantity}] }
    const [submitting, setSubmitting] = useState(false);

    // ====== 데이터 조회 함수(재사용) ======
    const fetchReceipts = useCallback(async () => {
        try {
            const res = await receiptApi.fetchIngredientsDetail();

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
    }, []);

    useEffect(() => { fetchReceipts(); }, [fetchReceipts]);

    // ====== 아이템 추가/변경 ======
    const handleAddItem = () => {
        setAddReceipt(prev => ({
            ...prev,
            items: [...(prev?.items || []), { id: Date.now(), name: "", quantity: 1 }],
        }));
    };

    const handleItemChange = (id, field, value) => {
        setAddReceipt(prev => ({
            ...prev,
            items: (prev?.items || []).map(it =>
                it.id === id ? { ...it, [field]: value } : it
            ),
        }));
    };

    const handleRemoveItem = (id) => {
        setAddReceipt(prev => ({
            ...prev,
            items: (prev?.items || []).filter(it => it.id !== id),
        }));
    };

    // 모달 열 때 기본값(오늘 날짜 + 1개 행)
    const openAddModal = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const todayStr = `${yyyy}-${mm}-${dd}`;

        setAddReceipt({
            purchase_date: todayStr,
            items: [{ id: Date.now(), name: "", quantity: 1 }],
        });
    };

    // ====== 제출 로직 ======
    const handleSubmitAddReceipt = async () => {
        if (!addReceipt) return;

        const { purchase_date, items } = addReceipt;

        // 유효성 체크
        if (!purchase_date || !/^\d{4}-\d{2}-\d{2}$/.test(purchase_date)) {
            alert("등록 날짜(YYYY-MM-DD)를 선택해 주세요.");
            return;
        }
        if (!items || items.length === 0) {
            alert("최소 1개 이상의 품목을 추가해 주세요.");
            return;
        }
        // 각 품목 검사
        for (const it of items) {
            if (!it.name?.trim()) {
                alert("모든 품목의 이름을 입력해 주세요.");
                return;
            }
            const cat = Number(it.quantity);
            if (!Number.isInteger(cat) || cat <= 0) {
                alert("수량(=카테고리)은 1 이상의 정수로 입력해 주세요.");
                return;
            }
        }


        setSubmitting(true);
        try {
            // 여러 품목 동시 전송 (배치)
            const requests = items.map(it =>
                receiptApi.addIngredients({
                    ingredient_name: it.name.trim(),
                    category_id: String(Number(it.quantity)),
                    purchase_date,
                })
            );

            const results = await Promise.allSettled(requests);
            const failed = results.filter(r => r.status === "rejected");
            if (failed.length === 0) {
                alert("영수증 품목이 모두 추가되었습니다.");
            } else if (failed.length < results.length) {
                alert(`일부 품목 추가에 실패했습니다. (실패 ${failed.length}건)`);
            } else {
                alert("모든 품목 추가에 실패했습니다.");
            }

            // 성공/부분성공 시 리스트 새로고침
            await fetchReceipts();
            setAddReceipt(null);
        } catch (e) {
            console.error("영수증 추가 중 오류:", e);
            alert("영수증 추가 중 오류가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
    };

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
                    onOpenAdd={openAddModal}
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
                        onAddItem={handleAddItem}
                        onRemoveItem={handleRemoveItem}
                        onItemChange={handleItemChange}
                        onDateChange={(v) => setAddReceipt(prev => ({ ...prev, purchase_date: v }))}
                        onSubmit={handleSubmitAddReceipt}
                        submitting={submitting}
                    />
                )}
            </div>
            <TabBar />
        </div>
    );
}
