import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 쿠키
import { useAuth } from "../../context/AuthContext";

// 분리 컴포넌트
import Topbar from "../SettingsPage/components/TopBar";
import ProfileRow from "../SettingsPage/components/ProfileRow";
import Section from "../SettingsPage/components/Section";
import SettingItemRow from "../SettingsPage/components/SettingItemRow";
import ToggleSwitch from "../SettingsPage/components/ToggleSwitch";
import FooterActions from "../SettingsPage/components/FooterActions";
import LogoutModal from "../SettingsPage/components/LogoutModal";

// assets
import fork_spoon from "../../assets/images/fork_spoon.png";

// css
import styles from "../SettingsPage/SettingsPage.module.css";

export default function SettingsPage() {
    const nav = useNavigate();
    const { user, logout } = useAuth(); // ★ 쿠키/디코딩은 컨텍스트 내부에서 이미 처리됨

    const [notifyOn, setNotifyOn] = useState(true);
    const [profileName, setProfileName] = useState("게스트");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        // ★ user에서 바로 이름 가져오기 (컨텍스트가 토큰 디코딩/쿠키 읽기 끝낸 상태)
        const name =
            user?.name ||
            user?.email ||
            user?.id ||
            "게스트";
        setProfileName(String(name));
    }, [user]);

    const onBack = () => nav(-1);
    const onClose = () => nav("/");
    const onSave = () => {
        alert(`저장 완료\n알림: ${notifyOn ? "ON" : "OFF"}`);
        nav("/");
    };

    const onLogout = () => setShowLogoutModal(true);
    const onCancelLogout = () => setShowLogoutModal(false);
    const onConfirmLogout = async () => {
        try {
            // ★ 공통 로그아웃: AuthContext가 쿠키 삭제/동기화까지 담당
            logout();
        } finally {
            nav("/login");
        }
    };

    const onResetTaste = () => {
        alert("음식 성향을 초기화 합니다.");
    };

    return (
        <div className={styles.root}>
            <Topbar onBack={onBack} />

            <main className={styles.content} role="main">
                <ProfileRow name={profileName} />

                <hr className={styles.sep} />

                <Section title="알림 설정">
                    <SettingItemRow
                        title="알림 받기"
                        sub="좋아요, 댓글, 이벤트 참여 등 소식"
                        iconVariant="bell"
                        right={
                            <ToggleSwitch
                                value={notifyOn}
                                onChange={() => setNotifyOn(v => !v)}
                            />
                        }
                        onClick={() => setNotifyOn(v => !v)}
                    />
                    <hr className={styles.subSep} />
                </Section>

                <Section title="음식 성향">
                    <SettingItemRow
                        title="음식 성향 초기화"
                        iconVariant="utensil"
                        iconImg={fork_spoon}
                        chevron
                        onClick={onResetTaste}
                    />
                </Section>

                <FooterActions onClose={onClose} onSave={onSave} />

                <button className={styles.logout} onClick={onLogout}>
                    로그아웃
                </button>
            </main>

            {showLogoutModal && (
                <LogoutModal
                    title="로그아웃 하시겠어요?"
                    desc="네를 누르면 로그인 화면으로 이동합니다."
                    onConfirm={onConfirmLogout}
                    onCancel={onCancelLogout}
                />
            )}
        </div>
    );
};
