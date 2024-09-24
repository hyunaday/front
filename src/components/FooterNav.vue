<!-- components/FooterNav.vue -->
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

    <!-- 버튼 모양을 prop으로 제어하여 + 또는 등록 표시 -->
    <button @click="handleButtonClick" class="pay-btn">
      <!-- 아이콘과 텍스트 함께 표시 -->
      <i v-if="iconClass" :class="iconClass + ' button-icon'"></i>
      <span>{{ buttonText }}</span>
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
    buttonText: {
      type: String,
      default: "결제", // 기본값은 "결제"
    },
    iconClass: {
      type: String,
      default: "fas fa-credit-card", // 기본 아이콘 클래스
    },
  },
  methods: {
    handleButtonClick() {
      if (this.buttonText === "결제") {
        this.$router.push("/grouppay");
      } else {
        this.$emit("button-click");
      }
    },
  },
};
</script>

<style scoped>
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

/* 결제 버튼 스타일 */
.pay-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  min-width: 65px;
  height: 65px;
  background-color: #6981d6;
  border-radius: 32.5px;
  color: white;
  font-size: 17px;
  white-space: nowrap;
  padding: 0 10px;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: none;
}

/* 아이콘 스타일 */
.button-icon {
  font-size: 20px;
  margin-bottom: 5px; /* 아이콘과 텍스트 사이의 간격 */
}

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
