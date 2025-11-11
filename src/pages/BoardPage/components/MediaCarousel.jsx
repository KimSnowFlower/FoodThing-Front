import { useState, useMemo } from "react";
import styles from "../components/MediaCarousel.module.css";

export default function MediaCarousel({ images = [], square = true, imgClassName, dotLight = false }) {
    const list = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);
    const [idx, setIdx] = useState(0);
    const has = list.length > 0;
    const cur = has ? list[Math.min(idx, list.length - 1)] : null;

    const prev = () => setIdx((v) => (v - 1 + list.length) % list.length);
    const next = () => setIdx((v) => (v + 1) % list.length);

    return (
        <div className={`${styles.wrap} ${square ? styles.square : ""}`}>
            {has ? (
                <>
                    <img
                        className={`${styles.img} ${imgClassName || ""}`}
                        src={cur}
                        alt="게시물 이미지"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const cap = e.currentTarget.parentElement.querySelector(`.${styles.inner}`);
                            if (cap) cap.style.display = "flex";
                        }}
                    />
                    {list.length > 1 && (
                        <>
                            <button className={`${styles.nav} ${styles.prev}`} onClick={prev} aria-label="이전 이미지">‹</button>
                            <button className={`${styles.nav} ${styles.next}`} onClick={next} aria-label="다음 이미지">›</button>
                        </>
                    )}
                    {list.length > 1 && (
                        <div className={`${styles.dots} ${dotLight ? styles.light : ""}`}>
                            {list.map((_, i) => (
                                <div key={i} className={`${styles.dot} ${i === idx ? styles.active : ""}`} />
                            ))}
                        </div>
                    )}
                    <div className={styles.inner} style={{ display: "none" }}>
                        <div className={styles.caption}>이미지를 불러오지 못했습니다.</div>
                    </div>
                </>
            ) : (
                <div className={styles.inner}>
                    <div className={styles.caption}>이미지가 첨부되지 않은 게시물입니다.</div>
                </div>
            )}
        </div>
    );
}
