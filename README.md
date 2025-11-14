# 🍳 FoodThing

> **냉장고 속 재료로 오늘 먹을 음식을 추천하는 웹 서비스**

"오늘 뭐 해먹지?"라는 일상적인 고민을 덜어주기 위해,

사용자의 재료 데이터를 기반으로 음식 추천과 레시피 정보를 제공하는 React 기반 웹 프로젝트

---

## 🏁 Overview

- **프로젝트 명:** FoodThing
- **프로젝트 기간:** 2025.03 ~ 2025.11
- **담당 역할:** 기획 및 프론트엔드 개발
- **배포 주소:** https://web-react-mg87or0t2e08bd72.sel3.cloudtype.app/

---
## 기획 및 설계

| 항목 | 내용 |
|------|------|
| **기획 도구** | Notion (기능 설계 / 일정 관리), Google Drive (리소스 공유), Draw.io (플로우 설계) |
| **기획 의도** | “냉장고 속 재료로 오늘의 메뉴를 추천받는 간편한 서비스” |
| **UX 설계 포인트** | 재료 → 추천 → 상세 → 좋아요/저장으로 이어지는 자연스러운 사용자 흐름 |
| **UI 설계 방향** | 모바일 중심의 카드형 구조 + 공통 컴포넌트(TopBar, TabBar, LikeButton) 일관성 유지 |

---

## 💻 Frontend Development

### ⚙️ 사용 기술
| 구분 | 기술 |
|------|------|
| **Frontend** | React.js (Vite), JavaScript(ES6+), Axios, CSS Module |
| **Docs & Design** | Notion, Draw.io, Google Drive |
| **Deployment** | Cloudtype |
| **Version Control** | Git, GitHub 

---

### 🧩 주요 구현 기능

- 🔍 **재료 기반 음식 추천**
- 🍽️ **추천 결과 페이지 (RecommendResultPage)**  
  → 백엔드 API 연동 후 음식명, 재료, 조리 단계를 리스트 형태로 표시
- 💬 **레시피 단계 안내 (StepsList)**  
  → 각 조리 과정을 순서대로 시각화
- ❤️ **좋아요/찜 기능 (LikePage)**  
  → 사용자가 저장한 음식 목록을 관리
- 🧭 **탐색 및 내비게이션 바 (TopBar, TabBar)**  
  → 앱형 UI로 직관적인 페이지 이동 구현
- ⚡ **로딩/에러 상태 관리**  
  → 사용자 경험을 고려한 조건부 렌더링 적용