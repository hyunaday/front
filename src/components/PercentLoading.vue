<template>
    <div class="main-container">
      <Header />
  
      <!-- ProgressContainer 컴포넌트를 사용 -->
      <ProgressContainer
        :percentage="percentage"
        :completed="completed"
        :currentIcon="currentIcon"
      />
    </div>
  </template>
  
  <script>
  import Header from "../../components/Header.vue";
  import ProgressContainer from "../../components/PercentLoading.vue"; // 경로에 맞게 변경
  
  export default {
    name: "Agree_Loading",
    components: {
      Header,
      ProgressContainer,
    },
    data() {
      return {
        counter: 0,
        percentage: 0,
        completed: false, // 완료 상태 여부
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
        }, 3000); // 3초마다 아이콘 변경
      },
      startPercentageCounter() {
        let num = 0;
        const interval = setInterval(() => {
          this.percentage = num;
          num++;
  
          if (num > 100) {
            clearInterval(interval); // 100%에 도달하면 중지
            this.completed = true; // 완료 상태로 변경
          }
        }, 87); // 87ms마다 증가하여 8.7초에 100% 도달
      },
    },
  };
  </script>
  
  <style scoped>
  /* 기존 스타일 유지 */
  @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900);
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
  
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
  </style>
  