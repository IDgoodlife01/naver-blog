# 🌐 Network Blog(AI chat gpt사용)
Node.js + Express + MySQL 기반의 회원제 블로그 프로젝트입니다.

## 🚀 핵심 기능
- **인증/보안**: `bcrypt` 암호화 및 세션 기반 로그인 유지
- **게시글(CRUD)**: 카드형 레이아웃 목록, 본인 글 수정/삭제 제한
- **관리자**: 회원 명단 조회 및 DB 구조 학습용 관리자 페이지

## 🛠 기술 스택
- **Backend**: Node.js, Express, MySQL
- **Frontend**: EJS, CSS3
- **Auth**: bcrypt, express-session



## 📂 프로젝트 구조
- `app.js`: 메인 서버 설정 및 라우팅
- `db.js`: MySQL DB 연결 (Pool)
- `routes/`: auth(인증/관리자), post(게시글) 로직 분리
- `views/`: EJS 화면 템플릿

## 📝 문제 해결 (Key Point)
- `mysql2` 구조 분해 할당을 활용한 데이터 출력 오류 해결
- 관리자 라우터 순서 조정을 통한 `Cannot GET` 에러 디버깅

## ⚙️ 실행 방법
1. `npm install`
2. `db.js` 정보 수정
3. `node app.js` 실행 (8080 포트)
