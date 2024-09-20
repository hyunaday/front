<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <h1>내 자산</h1>

    <!-- '나의 계좌' 버튼, 계좌 페이지로 이동 -->
    <router-link to="/accounts">
      <button class="button">나의 계좌</button>
    </router-link>

    <div class="divider"></div>

    <!-- '나의 카드' 버튼, 카드 페이지로 이동 -->
    <router-link to="/cards">
      <button class="button">나의 카드</button>
    </router-link>

    <div class="navbar">
      <!-- 홈 버튼, 홈 페이지로 이동 -->
      <router-link to="/" class="nav-item" exact-active-class="active">
        <i class="fas fa-home"></i>
        <span>홈</span>
      </router-link>

      <!-- 내 자산 버튼, 내 자산 페이지로 이동 -->
      <router-link to="/myassets" class="nav-item" exact-active-class="active">
        <i class="fas fa-wallet"></i>
        <span>내 자산</span>
      </router-link>

      <!-- 결제 버튼, 결제 페이지로 이동 -->
      <router-link to="/grouppay" class="pay-btn" exact-active-class="active">
        <i class="fas fa-credit-card"></i>
        <span>결제</span>
      </router-link>

      <!-- 가계부 버튼, 가계부 페이지로 이동 -->
      <router-link
        to="/accountbook"
        class="nav-item"
        exact-active-class="active"
      >
        <i class="fas fa-book"></i>
        <span>가계부</span>
      </router-link>

      <!-- 전자 명함 버튼, 전자 명함 페이지로 이동 -->
      <router-link
        to="/businesscard"
        class="nav-item"
        exact-active-class="active"
      >
        <i class="fas fa-id-card"></i>
        <span>전자 명함</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAssets',
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

/* 전체 컨테이너 스타일 */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
}

/* 제목 스타일 */
h1 {
  margin-bottom: 20px;
  font-weight: bold;
  margin-top: 0;
}

/* 버튼 스타일 */
.button {
  width: 200px;
  padding: 15px;
  margin: 10px 0;
  background-color: #7189ff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

/* 구분선 스타일 */
.divider {
  width: 200px;
  height: 1px;
  background-color: #ccc;
  margin: 15px 0;
}

/* 네비게이션 바 스타일 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: white;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  max-width: 360px;
  width: 100%;
}

/* 네비게이션 아이템 스타일 */
.navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #555;
  flex: 1;
}

/* 네비게이션 아이템 아이콘 스타일 */
.navbar .nav-item i {
  font-size: 24px;
  margin-bottom: 5px;
}

/* 결제 버튼 스타일 */
.pay-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 65px;
  height: 65px;
  background-color: #7189ff;
  border-radius: 50%;
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 활성화된 네비게이션 아이템 스타일 */
.navbar .nav-item.active {
  color: #7189ff; /* 텍스트 색상 변경 */
  font-weight: bold; /* 강조를 위해 볼드체로 */
}
/* 내 자산과 가계부 사이의 간격 조정을 위해 flex-grow 사용 */
.nav-item:nth-child(4) {
  flex-grow: 1.7; /* 가계부의 여유 공간을 살짝 늘림 */
}

.nav-item:nth-child(2) {
  flex-grow: 1.7; /* 내 자산의 여유 공간을 살짝 늘림 */
}
.navbar .nav-item.active i {
  color: #7189ff; /* 아이콘 색상 변경 */
}
</style>
