<template>
  <div class="landing-page">
    <!-- 로고 중앙 배치 -->
    <img src="../assets/images/logo.png" alt="Logo" class="logo" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "LandingPage",
  setup() {
    const router = useRouter();

    // 컴포넌트가 마운트될 때 3초 후 로그인 페이지로 이동
    setTimeout(() => {
      router.push({ name: "Login" });
    }, 3000);
  },
};
</script>

<style scoped>
/* 전체 페이지 스타일 */
.landing-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #6981d9; /* 배경색 */
  margin: 0;
  padding: 0;
}

/* 로고 스타일 */
.logo {
  width: 300px; /* 로고 크기 조정 */
  height: auto;
}
</style>
