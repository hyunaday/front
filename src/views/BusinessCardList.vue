<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <h3>추가할 명함을 선택해주세요.</h3>

    <!-- '나의 명함' 버튼, 나의 명함 등록 페이지로 이동 -->
    <router-link to="/my-card-registration">
      <button class="button">나의 명함 등록하기</button>
    </router-link>

    <div class="divider"></div>

    <!-- '친구 명함' 버튼, 친구 명함 등록 페이지로 이동 -->
    <router-link to="/friend-card-registration">
      <button class="button">친구 명함 등록하기</button>
    </router-link>

    <!-- FooterNav 컴포넌트 사용 -->
    <FooterNav />
  </div>
</template>

<script>
import FooterNav from '../components/FooterNav.vue';

export default {
  name: 'BusinessCardList',
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
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  margin-bottom: 60px;
  background-color: white;
  overflow-y: auto;
}

/* 제목 스타일 */
h3 {
  margin-bottom: 80px;
  font-weight: bold;
  font-size: 20px;
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
