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
/* 스타일 정의 */
</style>
