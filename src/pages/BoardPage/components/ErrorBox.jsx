export default function ErrorBox({ error }) {
    if (!error) return null;
    const msg =
        error?.code === "ERR_CANCELED"
            ? "요청이 취소되었습니다. (개발모드/HMR 중복 호출일 수 있어요)"
            : error?.message || String(error);
    return <div style={{
        padding: '10px 12px',
        border: '1px solid #eee',
        borderRadius: 10,
        background: '#fff8f6',
        color: '#b00020',
        fontSize: 14,
        marginBottom: 12
    }}>⚠ {msg}</div>;
}
