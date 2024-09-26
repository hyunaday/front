<template>
<<<<<<< HEAD
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
=======
  <div class="main-container">
    <h1>내 자산</h1>
    <!-- 나의 계좌, 나의 카드 버튼 -->
    <button class="custom-button">나의 계좌</button>
    <div class="separator"></div>
    <button class="custom-button">나의 카드</button>
>>>>>>> ed0dd9beb4a94c32e47f6fbe36f52ccc213bb00c
  </div>
</template>

<script>
<<<<<<< HEAD
import FooterNav from '../components/FooterNav.vue';

export default {
  name: 'MyAssets',
  components: {
    FooterNav,
  },
=======
export default {
  name: "MyAssets",
>>>>>>> ed0dd9beb4a94c32e47f6fbe36f52ccc213bb00c
};
</script>

<style scoped>
<<<<<<< HEAD
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
=======
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
  background-color: #6981d9;
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
}

.separator {
  width: 245.5px;
  height: 2px; /* 선의 두께 */
  background-color: #000; /* 선 색상 */
  margin-bottom: 25px; /* 선과 다음 버튼 사이의 간격 */
>>>>>>> ed0dd9beb4a94c32e47f6fbe36f52ccc213bb00c
}
</style>
