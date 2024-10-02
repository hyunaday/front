<template>
  <div class="main-container">
      <div class="center-container">
          <div class="coin">
              <span class="coin-text">₩</span>
          </div>
          <div class="timer">
              <span>{{ formattedTime }}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
      return {
          remainingTime: 120, // 초기 남은 시간 설정 (초)
      };
  },
  computed: {
      formattedTime() {
          const minutes = Math.floor(this.remainingTime / 60);
          const seconds = this.remainingTime % 60;
          return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      },
  },
  mounted() {
      this.startTimer();
  },
  methods: {
      startTimer() {
          const interval = setInterval(() => {
              if (this.remainingTime > 0) {
                  this.remainingTime--;
              } else {
                  clearInterval(interval); // 타이머 종료
              }
          }, 1000); // 1초마다 감소
      },
  },
}
</script>

<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 높이 전체 사용 */
}

.coin {
  width: 70px; /* 크기 줄임 */
  height: 90px; /* 두께를 줄임 */
  background: linear-gradient(145deg, #f9d71c, #d4af37); /* 금색 그라데이션 */
  border-radius: 50%;
  box-shadow: 
      0 10px 30px rgba(0, 0, 0, 0.4), /* 하단 그림자 강화 */
      0 -5px 20px rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: spin 1s linear infinite;
}

.coin-text {
  font-size: 30px; /* 텍스트 크기 조정 */
  font-weight: bold;
  color: white;
  position: absolute;
  z-index: 2;
}

.timer {
  margin-top: 20px; /* 코인과의 간격 */
  font-size: 24px; /* 텍스트 크기 조정 */
  color: #333; /* 텍스트 색상 */
}

@keyframes spin {
  from {
      transform: rotateY(0);
  }
  to {
      transform: rotateY(1turn);
  }
}
</style>
