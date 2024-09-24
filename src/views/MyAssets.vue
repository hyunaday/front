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

    <!-- FooterNav 컴포넌트 사용 -->
    <FooterNav />
  </div>
</template>

<script>
import FooterNav from '../components/FooterNav.vue';

export default {
  name: 'MyAssets',
  components: {
    FooterNav,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
</style>
