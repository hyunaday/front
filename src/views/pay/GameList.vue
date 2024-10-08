<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <button @click="goBack" class="back-button">
      <i class="fas fa-chevron-left"></i>
    </button>
    <h3>
      <span style="color: #6981d9">게임</span>을 <br />
      선택해주세요
    </h3>

    <button class="custom-button" @click="navigateTo('PayInfo')">
      게임 건너뛰기
    </button>
    <button class="custom-button" @click="navigateTo('LotteryGame')">
      룰렛 돌리기
    </button>
  </div>
</template>

<script>
import { useNavigationStore } from '../../stores/navigation';

export default {
  name: 'GameList',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    navigateTo(routeName) {
      const navigationStore = useNavigationStore();
      navigationStore.setSelectedPage(routeName, this.$router); // 선택한 페이지를 저장합니다.

      // 페이지에 따라 이동
      if (routeName === 'PayInfo') {
        this.$router.push('/payinfo');
      } else if (routeName === 'LotteryGame') {
        this.$router.push('/lottery-game'); // 룰렛 돌리기 페이지로 수정
      }
    },
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  min-height: 100vh;
  background-color: #c0c0c0;
}

.main-container {
  width: 360px;
  height: 800px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

h3 {
  font-size: 20px;
  font-weight: 530;
  text-align: left;
  margin-left: 70px;
  margin-bottom: 100px;
  display: block;
  width: 100%;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  color: #000;
  text-align: left;
  margin-left: -270px;
  margin-top: -300px;
  margin-bottom: 30px;
}

.back-button:hover {
  color: #7189ff;
}

.custom-button {
  width: 300px;
  height: 100px;
  background-color: #ffffff;
  border: 1px solid gray;
  border-radius: 9px;
  color: #000000;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, color 0.3s;
}

.custom-button:hover {
  background-color: #f3f8fe;
  color: #333;
}
</style>
