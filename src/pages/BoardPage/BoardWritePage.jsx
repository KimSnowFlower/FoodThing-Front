import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import TopBar from "../../components/TopBar";
import TabBar from "../../components/TabBar";

// api
import { boardApi } from "../../lib/boardApi";

// css
import styles from "../BoardPage/BoardWritePage.module.css";

export default function BoardWritePage() {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [err, setErr] = useState("");

    const inputRef = useRef(null);

    const onPickImage = () => inputRef.current?.click();

    const onFileChange = (e) => {
        setErr("");
        const f = e.target.files?.[0];
        if (!f) return;

        if (!/^image\//.test(f.type)) {
            setErr("이미지 파일만 업로드할 수 있어요.");
            e.target.value = "";
            return;
        }
        const MAX = 10 * 1024 * 1024;
        if (f.size > MAX) {
            setErr("파일이 너무 커요. 10MB 이하로 올려 주세요.");
            e.target.value = "";
            return;
        }

        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const onRemoveImage = () => {
        setFile(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview("");
        if (inputRef.current) inputRef.current.value = "";
    };

    const onCancel = () => {
        if (preview) URL.revokeObjectURL(preview);
        navigate(-1);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");

        if (!title.trim()) { setErr("제목을 입력해 주세요."); return; }
        if (!content.trim()) { setErr("내용(캡션)을 입력해 주세요."); return; }

        setSubmitting(true);
        try {
            const form = new FormData();
            form.append("title", title.trim());
            form.append("content", content.trim());
            if (file) form.append("images", file);

            const res = await boardApi.addBoard(form);

            if (res.status === 201) {
                navigate("/board", { replace: true });
            } else if (res.status === 401) {
                setErr("로그인이 필요해요. 로그인 후 다시 시도해 주세요.");
            } else {
                setErr("업로드에 실패했어요. 잠시 후 다시 시도해 주세요.");
            }
        } catch (e) {
            console.error("[게시글 작성 실패]", e);
            setErr("업로드 중 오류가 발생했어요.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.wrap}>
                <TopBar />
                <main className={styles.content} role="main" aria-label="게시글 작성">
                    <h1 className={styles.title}>새 게시물</h1>

                    <section className={styles.media}>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className={styles.srOnly}
                            onChange={onFileChange}
                            aria-label="사진 파일 선택"
                        />

                        {!preview ? (
                            <button type="button" className={styles.drop} onClick={onPickImage} aria-label="사진 넣기">
                                <span className={styles.dropText}>사진 넣기</span>
                            </button>
                        ) : (
                            <div className={styles.preview} role="img" aria-label="선택한 사진 미리보기">
                                <img src={preview} alt="선택한 사진" />
                                <button type="button" className={styles.remove} onClick={onRemoveImage} aria-label="사진 지우기">×</button>
                            </div>
                        )}
                    </section>

                    <section className={styles.inputArea}>
                        <label htmlFor="title" className={styles.srOnly}>제목</label>
                        <input
                            id="title"
                            className={styles.input}
                            type="text"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                            inputMode="text"
                        />
                    </section>

                    <section className={styles.inputArea}>
                        <label htmlFor="content" className={styles.srOnly}>내용</label>
                        <input
                            id="content"
                            className={styles.input}
                            type="text"
                            placeholder="캡션 추가..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={300}
                            inputMode="text"
                        />
                    </section>

                    {err && <p className={styles.error} role="alert">{err}</p>}

                    <div className={styles.actions}>
                        <button type="button" className={`${styles.btn} ${styles.cancel}`} onClick={onCancel} disabled={submitting}>취소</button>
                        <button type="button" className={`${styles.btn} ${styles.submit}`} onClick={onSubmit} disabled={submitting}>
                            {submitting ? "공유 중..." : "공유하기"}
                        </button>
                    </div>
                </main>

                <TabBar />
            </div>
        </div>
    );
}
