<template>
  <div class="navbar">
    <router-link to="/" class="nav-item" exact-active-class="active">
      <i class="fas fa-home"></i>
      <span>홈</span>
    </router-link>
    <router-link to="/myassets" class="nav-item" exact-active-class="active">
      <i class="fas fa-wallet"></i>
      <span>내 자산</span>
    </router-link>

    <!-- 버튼 타입에 따라 다르게 렌더링 -->
    <button @click="handleButtonClick" class="pay-btn">
      <template v-if="buttonType === 'pay'">
        <div class="icon-container">
          <i class="fas fa-credit-card"></i>
          <span>결제</span>
        </div>
      </template>

      <template v-else-if="buttonType === 'plus'">
        <i class="fas fa-plus" style="font-size: 50px"></i>
      </template>
      <template v-else-if="buttonType === 'register'">
        <div class="icon-container">
          <i class="fas fa-pencil-alt"></i>
          <span>등록</span>
        </div>
      </template>

      <!-- 2024.09.26 back 버튼 생성 ========== -->
      <template v-else-if="buttonType === 'back'">
        <div class="icon-container">
          <i class="fa-solid fa-arrow-rotate-left"></i>
          <span>취소</span>
        </div>
      </template>
      <!-- =================================== -->

    </button>

    <router-link to="/accountbook" class="nav-item" exact-active-class="active">
      <i class="fas fa-book"></i>
      <span>가계부</span>
    </router-link>
    <router-link
      to="/businesscard"
      class="nav-item"
      exact-active-class="active"
    >
      <i class="fas fa-id-card"></i>
      <span>전자 명함</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    // 2024.09.26 back 버튼 생성===============
    buttonType: {
      type: Function,
      default: 'back', // 기본값은 'back'
    },
    // ========================================
    buttonType: {
      type: String,
      default: "pay", // 기본값은 'pay'
    },
    buttonAction: {
      type: Function,
      required: true, // 버튼 클릭 시 호출할 함수
    },
    customRoute: {
      type: String,
      default: "/grouppay",
    },
  },
  methods: {
    handleButtonClick() {
      // 현재 라우트가 'BusinessCard'일 때만 /addbusinesscard 경로로 이동
      if (this.buttonType === 'plus' && this.$route.name === 'BusinessCard') {
        this.$router.push('/addbusinesscard');
      } else {
        this.buttonAction(); // 전달된 action 호출
      }
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}

body,
h2,
label,
button,
input,
span {
  font-family: "Pretendard", sans-serif;
}

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
  z-index: 999;
}

.navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #555;
  flex: 1;
  text-decoration: none;
}

.navbar .nav-item i {
  font-size: 24px;
  margin-bottom: 5px;
}

/* 버튼 스타일 */
.pay-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background-color: #6981d6;
  border-radius: 40px;
  color: white;
  font-size: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: none;
}

/* 아이콘과 텍스트를 수직으로 쌓기 위한 스타일 */
.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 활성화된 네비게이션 아이템 스타일 */
.navbar .nav-item.active {
  color: #7189ff;
  font-weight: bold;
}

.nav-item:nth-child(4) {
  flex-grow: 1.7;
}

.nav-item:nth-child(2) {
  flex-grow: 1.7;
}

.navbar .nav-item.active i {
  color: #7189ff;
}
</style>
