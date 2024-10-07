<template>
    <div class="main-container">
      <Header />
  
      <!-- Reusable ProgressBar Component -->
      <ProgressBar :currentStep="1" :totalSteps="4" />
  
      <div class="title">
        <h5>연결할 <span class="text">금융사</span>를 <br />선택해 주세요</h5>
        <p class="sub-title">선택한 금융사에서 모든 계좌를 모아 볼 수 있어요.</p>
      </div>
  
      <div class="bank-list">
        <h6>은행</h6>
        <hr />
        <div class="bank-item">
          <img
            src="../../assets/images/kbbank.png"
            alt="Bank-Logo"
            class="bank-logo"
          />
          <span>국민은행</span>
          <input type="checkbox" class="custom-checkbox" v-model="selectedBanks.kbbank" />
        </div>
        <div class="bank-item">
          <img
            src="../../assets/images/kakaobank.png"
            alt="Bank-Logo"
            class="bank-logo"
          />
          <span>카카오뱅크</span>
          <input type="checkbox" class="custom-checkbox" v-model="selectedBanks.kakaobank" />
        </div>
        <div class="bank-item">
          <img
            src="../../assets/images/shinhan.png"
            alt="Bank-Logo"
            class="bank-logo"
          />
          <span>신한은행</span>
          <input type="checkbox" class="custom-checkbox" v-model="selectedBanks.shinhan" />
        </div>
        <div class="bank-item">
          <img
            src="../../assets/images/wooribank.png"
            alt="Bank-Logo"
            class="bank-logo"
          />
          <span>우리은행</span>
          <input type="checkbox" class="custom-checkbox" v-model="selectedBanks.wooribank" />
        </div>
        <div class="bank-item">
          <img
            src="../../assets/images/toss.png"
            alt="Bank-Logo"
            class="bank-logo"
          />
          <span>토스</span>
          <input type="checkbox" class="custom-checkbox" v-model="selectedBanks.toss" />
        </div>
        <div class="bank-item">
          <img
            src="../../assets/images/kbank.png"
            alt="Bank-Logo"
            class="bank-logo"
          />
          <span>케이뱅크</span>
          <input type="checkbox" class="custom-checkbox" v-model="selectedBanks.kbank" />
        </div>
        <div class="bank-item">
          <img
            src="../../assets/images/hanabank.png"
            alt="Bank-Logo"
            class="bank-logo"
          />
          <span>하나은행</span>
          <input type="checkbox" class="custom-checkbox" v-model="selectedBanks.hanabank" />
        </div>
        <div class="bank-item">
          <img
            src="../../assets/images/NHbank.png"
            alt="Bank-Logo"
            class="bank-logo"
          />
          <span>농협은행</span>
          <input type="checkbox" class="custom-checkbox" v-model="selectedBanks.nhbank" />
        </div>
        <div class="bank-item">
          <img
            src="../../assets/images/IBKbank.png"
            alt="Bank-Logo"
            class="bank-logo"
          />
          <span>기업은행</span>
          <input type="checkbox" class="custom-checkbox" v-model="selectedBanks.ibkbank" />
        </div>
      </div>
  
      <FooterNav :buttonType="'next'" :buttonAction="goToNextStep" :disabled="!isAnyBankSelected" />
    </div>
  </template>
  
  <script>
  import Header from "../../components/Header.vue";
  import FooterNav from "../../components/FooterNav.vue";
  import ProgressBar from "../../components/ProgressBar.vue"; // Import the ProgressBar component
  
  export default {
    name: "Agree1",
    components: {
      FooterNav,
      Header,
      ProgressBar, // Register ProgressBar component
    },
    data() {
      return {
        selectedBanks: {
          kbbank: false,
          kakaobank: false,
          shinhan: false,
          wooribank: false,
          toss: false,
          kbank: false,
          hanabank: false,
          nhbank: false,
          ibkbank: false
        }
      };
    },
    computed: {
      // Check if at least one bank is selected
      isAnyBankSelected() {
        return Object.values(this.selectedBanks).some(checked => checked);
      }
    },
    methods: {
      goToNextStep() {
        this.$router.push("/agree2");
      }
    }
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
  
  .title {
    margin-left: -70px;
    margin-top: 30px;
  }
  h5 {
    text-align: left;
    font-weight: bold;
  }
  .text {
    color: #6981d9;
  }
  .sub-title {
    text-align: left;
    color: #6981d991;
    font-size: 10px;
    margin-left: 1px;
  }
  .bank-list {
    text-align: left;
    margin-left: 7px;
    margin-top: 15px;
    width: 75%;
  }
  hr {
    border-width: 1.5px;
    margin-top: 10px;
    margin-bottom: -5px;
  }
  .bank-item {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  .bank-item span {
    margin-left: 10px;
  }
  .bank-logo {
    margin-left: 5px;
    height: 30px;
    width: 30px;
  }
  .custom-checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin-left: auto;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 60%;
    transition: background-color 0.2s;
    cursor: pointer;
  }
  
  .custom-checkbox:checked {
    background-color: #6981d9;
    background-image: url("../../assets/images/checked-icon.png"); /* Replace with your checkmark icon image */
  }
  </style>
  