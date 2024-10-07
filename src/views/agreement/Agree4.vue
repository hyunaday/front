<template>
    <div class="main-container">
      <Header />
      <ProgressBar :currentStep="3" :totalSteps="4" />
  
      <div class="content-container">
        <div class="title">
          <h5>
            연결할 <span class="text-highlight">자산</span>을<br />
            선택해 주세요
          </h5>
        </div>
  
        <div class="select-all">
          <span>카드</span>
          <a href="#" class="select-all-text" @click.prevent="toggleSelectAll">전체선택</a>
        </div>
  
        <hr />
  
        <div class="card-list">
          <!-- Woori Card -->
          <div class="card-item">
            <img
              src="../../assets/images/wooribank.png"
              alt="우리카드"
              class="card-logo"
            />
            <div class="card-details">
              <span class="card-name">우리카드</span>
              <p class="card-info">보유하고 계신 카드 정보를 가져옵니다.</p>
            </div>
            <input type="checkbox" class="custom-checkbox" v-model="selectedCards" value="woori" />
          </div>
  
          <!-- Shinhan Card -->
          <div class="card-item">
            <img
              src="../../assets/images/shinhan.png"
              alt="신한은행"
              class="card-logo"
            />
            <div class="card-details">
              <span class="card-name">신한은행</span>
              <p class="card-info">보유하고 계신 카드 정보를 가져옵니다.</p>
            </div>
            <input type="checkbox" class="custom-checkbox" v-model="selectedCards" value="shinhan" />
          </div>
        </div>
      </div>
  
      <FooterNav :buttonType="'next'" :buttonAction="goToNextStep" :disabled="!isAnyCardSelected" />
    </div>
  </template>
  
  <script>
  import Header from "../../components/Header.vue";
  import FooterNav from "../../components/FooterNav.vue";
  import ProgressBar from "../../components/ProgressBar.vue"; // Import the ProgressBar component
  
  export default {
    name: "Agree4",
    components: {
      FooterNav,
      Header,
      ProgressBar, // Register ProgressBar component
    },
    data() {
      return {
        selectedCards: [],
        allCards: ['woori', 'shinhan']
      };
    },
    computed: {
      // Check if at least one card is selected
      isAnyCardSelected() {
        return this.selectedCards.length > 0;
      }
    },
    methods: {
      goToNextStep() {
        // Define what happens when the "next" button is clicked
        this.$router.push("/agree5"); // Navigate to the next page
      },
      toggleSelectAll() {
        if (this.selectedCards.length === this.allCards.length) {
          this.selectedCards = [];
        } else {
          this.selectedCards = [...this.allCards];
        }
      },
    },
  };
  </script>
  
  <style scoped>
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
  
  .content-container {
    width: 72.5%;
    margin-top: 30px;
  }
  
  .title h5 {
    font-weight: bold;
  }
  
  .text-highlight {
    color: #6981d9;
  }
  
  .select-all {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: -10px;
    font-size: 13px;
    font-weight: bold;
  }
  
  .select-all-text {
    color: #6981d9;
    text-decoration: none;
    cursor: pointer;
  }
  
  .card-list {
    margin-top: 20px;
  }
  
  .card-item {
    display: flex;
    align-items: center;
  }
  
  .card-logo {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    margin-bottom: 14px;
  }
  
  .card-details {
    flex: 1;
  }
  
  .card-name {
    font-size: 12px;
    font-weight: bold;
  }
  
  .card-info {
    font-size: 10px;
    color: #555;
  }
  
  .custom-checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 50%;
    margin-left: 10px;
    margin-bottom: 12px;
    cursor: pointer;
    position: relative;
  }
  
  .custom-checkbox:checked {
    background-color: #6981d9;
    background-image: url("../../assets/images/checked-icon.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 12px;
  }
  </style>
  