# 민수몰

민수몰은 여러 브랜드 신발을 구매 할 수 있는 서비스입니다!

도메인은 20:00 에 종료 하겠습니다 (07:00 ~ 19:59) 

front - npm i 


back 
1. npm i
2. .env 파일 생성 후 
3. COOKIE_SECRET, DB_PASSWORD 설정 해 주기. 


## TECH 

### FRONT 

- Next.js 
- React.js
- Redux
- Saga 

### Back 

- Node.js
- Express.js 
- Mysql 
- Sequelize 
- AWS 


# Frontend structure

<h3>index.js</h3>

1. Header.js (헤더 영역) 
2. Slider.js (Slick 광고 영역)
3. Relation.js (각 브랜드 클릭하면 브랜드 각 신발로 이동하는 영역) 
4. Promotion.js (각 스타일 신발 7개씩 서버에서 가져와 홍보 하는 영역) 
5. Footer.js (Footer 영역) 

<h3>mypage.js</h3>

- 각 회원 정보를 수정 할 수 있는 페이지 입니다. 

<h3>shoppbasket.js</h3>

- 신발 상품 페이지에서 (상품 구독을 누르면 이 페이지에 저장이 됩니다.)

<h3>uploadPage.js</h3>

- 신발 상품을 업로드 할 수 있는 페이지 입니다!

<h3>Error page</h3>

- 400, 500 Error 페이지 입니다.

<h3>search [name].js</h3

- 상품 이름을 검색 할 수 있는 페이지 입니다.

<h3>ProductList</h3>

- 모든 신발 상품을 볼 수 있는 페이지 입니다.

<h3>Product\info</h3>

각 해당 신발 상품 페이지 입니다.

<h3>member</h3>

- join.js 우리 페이지 에 와서 환영 한다는 페이지.
- login.js 로그인 페이지
- register.js 회원가입 페이지 입니다!



# Background structure

## Product 

- / (상품 업로드 라우터) 
- image (이미지 업로드)
- /info/:productId/comment (댓글 업로드) 
- /search/:name (상품 이름을 검색 할 수 있는 라우터) 
- /info/:productId/basket (해당 상품 Cart 에 저장 라우터)
- /info/:productId (해당 상품 라우터) 
- /AllLists (모든 신발 상품이 저장되어 있는 라우터)

- new (새로운 신발 보여주는 라우터)
- heap (힙한 신발 보여주는 라우터)
- Casual (캐주얼 신발 보여주는 라우터) 
- Exercise (운동 신발 보여주는 라우터) 


## User 

- / (회원가입 라우터)
- /login (로그인 라우터)
- /Carts (카트 라우터) 
- /regid (닉네임 수정 라우터)
- /name (이름 수정 라우터)
- /email (이메일 수정 라우터)
- /logout (로그아웃 라우터) 





