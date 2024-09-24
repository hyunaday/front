<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <h1>내 계좌</h1>

    <!-- FooterNav 컴포넌트 사용 -->
    <FooterNav />
  </div>

  <!-- 추가적인 코드 -->
</template>

<script>
import FooterNav from "../components/FooterNav.vue";

export default {
  name: "MyAssets",
  components: {
    FooterNav,
  },
};
</script>

<style scoped>
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
  font-size: 50px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center; /* 글자 가운데 정렬 */
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
