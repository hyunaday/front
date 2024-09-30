<template>
    <div class="main-container">
      <div class="loading-page">
        <div class="loader-container">
          <div class="coin" :style="{ animationDuration: `${totalDuration}s` }">
            <svg viewBox="0 0 100 100" class="coin-icon">
              <circle cx="50" cy="50" r="45" fill="gold" />
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="12" fill="#333">COIN</text>
            </svg>
          </div>
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path
              class="circle"
              stroke-dasharray="100, 100"
              :stroke-dasharray="`${progress}, 100`"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div class="time">{{ formattedTime }}</div>
        </div>
      </div>
      <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
    </div>
  </template>
  
  <script>
  import FooterNav from '../components/FooterNav.vue';
  
  export default {
    name: "Loading",
    components: {
      FooterNav,
    },
    data() {
      return {
        totalDuration: 120, // 로딩 시간, 120초 (2분)
        timeRemaining: 120,
        interval: null,
      };
    },
    computed: {
      formattedTime() {
        const minutes = String(Math.floor(this.timeRemaining / 60)).padStart(2, "0");
        const seconds = String(this.timeRemaining % 60).padStart(2, "0");
        return `${minutes}:${seconds}`;
      },
      progress() {
        return ((this.totalDuration - this.timeRemaining) / this.totalDuration) * 100;
      },
    },
    mounted() {
      this.startTimer();
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    methods: {
      startTimer() {
        this.interval = setInterval(() => {
          if (this.timeRemaining > 0) {
            this.timeRemaining--;
          } else {
            clearInterval(this.interval);
            // 로딩 완료 후 처리할 내용 추가
          }
        }, 1000);
      },
    },
  };
  </script>
  
  <style scoped>
  .loading-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .loader-container {
    position: relative;
    width: 150px;
    height: 150px;
  }
  
  .coin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: rotate 120s linear infinite; /* totalDuration에 따라 회전 속도 조절 */
  }
  
  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  
  .circular-chart {
    width: 100%;
    height: 100%;
  }
  
  .circle {
    fill: none;
    stroke: #6981d6;
    stroke-width: 2.8;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: center;
    transition: stroke-dasharray 0.3s ease;
  }
  
  .time {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  </style>
  