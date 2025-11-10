import React from "react";

export default function TodayWhatEat({
    ingredientInput,
    setIngredientInput,
    loading,
    error,
    onSumbit,
    todayIconSrc,
    searchIconSrc,
    sendIconSrc,
}) {
    return (
        <section className="main-today-what-eat">
            <div className="card-header">
                <div className="card-icon" aria-hidden="true"><img src={todayIconSrc}/></div>
                <h2 className="card-title" id="todayTitle">오늘 뭐 해먹지?</h2>
            </div>

            <form className="search-from" onSumbit={onSumbit} role="search" aria-label="재료 검색">
                <div className="search-field">
                    <img className="search-icon" src={searchIconSrc} alt="검색 아이콘"/>
                    <input 
                        type="text"
                        name="ingredients"
                        className="ingredientsInput"
                        placeholder="재료 입력 (예: 양파, 베이컨, 새우)"
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                        autoComplete="off"
                        inputMode="text"
                        aria-label="재료 입력"
                        disabled={loading} 
                    />
                    <button className="send-button" type="submit" aria-label="추천 요청" disabled={loading}>
                        <img className="send-icon" src={sendIconSrc} alt="전송 아이콘"/>
                    </button>
                </div>
            </form>

            {error && <p className="error-text" role="alert">{error}</p>}
        </section>
    )
}