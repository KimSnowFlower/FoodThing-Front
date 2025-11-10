import React from "react";
import SectionCard from "./SectionCard";

export default function BoardSection({
    loading,
    items,
    onNavigateBoard,
    onItemClick,
    formatKST,
}) {
    return (
        <SectionCard
            badge="게시판"
            rightButtonText="게시판 이동"
            onRightButtonClick={onNavigateBoard}
            loading={loading}
            items={items}
            ariaLoadingText="게시글을 불러오는 중..."
            emptyText="게시글이 없습니다"
            className="board-card main-card"
            renderItem={(it) => {
                const title = it.title ?? "-";
                const nickname = it.author?.nickname ?? "-";
                const created = formatKST(it.created_at);
                const clickable = !!it.id;

                return (
                    <div 
                        className="board-item"
                        onClick={() => clickable && onItemClick(it.id)}
                    >
                        <div className="board-left">
                            <div className="board-title">{title}</div>
                            <div className="board-author">작성자: {nickname}</div>
                        </div>
                        <div className="board-right">
                            <div className="board-meta">
                                <span className="create-at">{created}</span>
                            </div>
                        </div>
                    </div>
                );
            }}
        />
    );
}