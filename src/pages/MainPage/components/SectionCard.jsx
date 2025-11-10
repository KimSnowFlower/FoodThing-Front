import React from "react";

export default function SectionCard({
    badge,
    rightButtonText,
    onRightButtonClick,
    loading,
    items,
    renderItem,
    emptyText = "항목이 없습니다",
    ariaLoadingText = "불러오는 중...",
    className="main-card",
    roleList = "list",
    roleListItem ="listitem",
}) {
    const showLoading = loading && (!items || items.length === 0);
    const showEmpty = !loading && (!items || items.length === 0);
    const showList = items && items.length > 0;

    return (
        <div className={`${className}`}>
            <div className="section-card-header">
                <div className="badge">{badge}</div>
                {rightButtonText && (
                    <button
                        className="board-navigate-button"
                        type="button"
                        onClick={onRightButtonClick}
                    >
                        {rightButtonText}
                    </button>
                )}
            </div>

            
            {showLoading ? (
                <div className="empty" aria-live="polite">{ariaLoadingText}</div>
            ): showList ? (
                <ul className="section-list" role={roleList}>
                    {items.map((item, idx) => (
                        <li key={item.id ?? `${badge}-${idx}`} role={roleListItem}>
                            {renderItem(item, idx)}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty" aria-live="polite">{emptyText}</div>
            )}
        </div>
    );
}