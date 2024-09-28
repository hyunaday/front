<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <h1>내 자산</h1>

    <!-- '나의 계좌' 버튼, 계좌 페이지로 이동 -->
    <button class="custom-button" @click="goToAccountPage">나의 계좌</button>

    <div class="separator"></div>

    <!-- '나의 카드' 버튼, 카드 페이지로 이동 -->
    <button class="custom-button" @click="goToCardsPage">나의 카드</button>

    <!-- FooterNav 컴포넌트 사용 -->
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';

export default {
  name: 'MyAssets',
  components: {
    FooterNav,
  },
  methods: {
    goToAccountPage() {
      this.$router.push('/account'); // 계좌 페이지로 이동
    },
    goToCardsPage() {
      this.$router.push('/cards'); // 카드 페이지로 이동
    },
    goToGroupPayPage() {
      this.$router.push('/grouppay'); // 그룹 결제 페이지로 이동
    },
  },
};
</script>

<style scoped>
/* 전체 템플릿 */
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  min-height: 100vh;
  background-color: #c0c0c0; /* 나머지 화면은 회색 */
}

.main-container {
  width: 360px; /* 고정된 너비 */
  height: 800px; /* 고정된 높이 */
  background-color: white; /* 흰색 배경 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 살짝 그림자 추가 */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  position: relative;
}

h1 {
  font-size: 28.55px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 130px; /* 제목과 버튼 사이의 여백 */
}

.custom-button {
  width: 197px;
  height: 57px;
  background-color: #6981d9; /* 버튼 배경색 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 9px;
  color: #fff; /* 텍스트 색상 */
  font-size: 16px;
  cursor: pointer; /* 마우스 커서 변경 */
  outline: none; /* 포커스 시 기본 테두리 제거 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px; /* 버튼 사이의 간격 */
  text-decoration: none; /* 링크의 밑줄 제거 */
  box-shadow: none; /* 버튼의 그림자 제거 */
}

.custom-button:hover {
  background-color: #5770b9; /* hover 시 배경색 변경 (선택 사항) */
}

/* 선 스타일 */
.separator {
  width: 200px;
  height: 2px; /* 선의 두께 */
  background-color: #908f8f; /* 선 색상 */
  margin-bottom: 25px; /* 선과 다음 버튼 사이의 간격 */
}
</style>
