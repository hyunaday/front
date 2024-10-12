<template>
  <div class="main-container">
    <Header />

    <!-- Circular container with icon shuffle inside -->
    <div class="progress-container">
      <div class="circle" :class="{ 'completed-circle': completed }">
        <div v-if="!completed" class="icon-container">
          <!-- Icon Shuffle inside the circle -->
          <div class="image" v-html="currentIcon"></div>
          <!-- Progress text below the icon -->
          <div class="progress-text">{{ Math.round(percentage) }}%</div>
        </div>
        <div v-else class="success-text">자산 연결 성공</div>
      </div>
      <p class="loading-message" v-if="!completed">
        잠시만 기다려주세요<br />자산을 연결하는 중이에요!
      </p>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";

export default {
  name: "Agree_Loading",
  components: {
    Header,
  },
  data() {
    return {
      counter: 0,
      percentage: 0,
      completed: false, // State to track if loading has completed
      icons: [
        '<i class="fa fa-credit-card"></i>',
        '<i class="fa fa-users"></i>',
        '<i class="fa fa-university"></i>',
      ],
    };
  },
  computed: {
    currentIcon() {
      return this.icons[this.counter];
    },
  },
  mounted() {
    this.startIconShuffle();
    this.startPercentageCounter();
  },
  methods: {
    startIconShuffle() {
      setInterval(() => {
        this.counter = (this.counter + 1) % this.icons.length;
      }, 3000); // Change icon every 3 seconds
    },
    startPercentageCounter() {
      let num = 0;
      const interval = setInterval(() => {
        this.percentage = num;
        num++;

        if (num > 100) {
          clearInterval(interval); // Stop when reaching 100%
          this.completed = true; // Set completed to true to show the success message

          // Add 1-second delay before navigating to the main page
          setTimeout(() => {
            this.$router.push("/"); // Navigate to the main page
          }, 2500); // 1 second (1000 ms) delay
        }
      }, 87); // 87ms for each percentage increment to reach 100% in 8.7 seconds
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900);
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}

* {
  font-family: "Pretendard", sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: "Lato", sans-serif;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.progress-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 185px;
}

.circle {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #6981d9;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.completed-circle {
  background-color: #6981d9;
  border: 4px solid #71d785; /* Green border when completed */
  animation: glowing 1.5s infinite alternate; /* Glowing animation effect */
}

@keyframes glowing {
  0% {
    box-shadow: 0 0 10px #71d785, 0 0 20px #71d785, 0 0 30px #71d785;
  }
  100% {
    box-shadow: 0 0 20px #71d785, 0 0 30px #71d785, 0 0 40px #71d785;
  }
}

.success-text {
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: center;
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image {
  font-size: 40px;
  color: white;
  animation: 3s rotate infinite;
}

.progress-text {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-top: 10px;
}

.loading-message {
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: bold;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
