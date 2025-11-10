import React from "react"
import SectionCard from "./SectionCard"

function Stars({ score }) {
    const star = Math.max(0, Math.min(5, Math.round(score || 0)));
    return <span className="stars">{"★".repeat(star)}{"☆".repeat(5 - star)}</span>;
}

export default function RankingSection({ loading, items }) {
    return(
        <SectionCard
            badge="랭킹"
            loading={laoding}
            items={items}
            ariaLoadingText="랭킹을 불러오는 중..."
            emptyText="랭킹이 없습니다..!"
            className="ranking-card main-card"
            renderItem={(it, idx) => {
                const title = it.food_name ?? it.title ?? "-";
                const rawScore =
                    typeof it.count === "number"
                    ? it.count : typeof it.score ==="number"
                    ? it.score : 0;
                const reviewCount = typeof it.count === "number" ? it.count : undefined;

                return (
                    <div className="ranking-item">
                        <div className="rank-left">
                            <div className="rank-title">{idx + 1}위: {title}</div>
                            <div className="rank-sub">
                                별점: <Stars score={rawScore}/>
                                {typeof reviewCount === "number" && (
                                    <span className="count">&nbsp;(리뷰 {reviewCount}개)</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            }}  
        />
    );
}