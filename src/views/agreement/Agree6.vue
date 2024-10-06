<template>
    <div class="main-container">
      <Header />
      <ProgressBar :currentStep="4" :totalSteps="4" />
  
      <div class="content-container">
        <!-- Payment Frequency Section -->
        <div class="selection-section">
          <label class="section-label">유효기간</label>
          <div class="dropdown">
            <select class="dropdown-select">
              <option>12개월</option>
              <option>6개월</option>
              <option>3개월</option>
            </select>
          </div>
        </div>
  
        <!-- Information Notice -->
        <p class="info-notice">
          <strong>거부 권리 및 불이익</strong><br />
          개인(신용)정보 수집·이용에 관한 동의를 거부하실 수 있습니다. 다만,
          개인(신용)정보의 수집·이용에 관한 동의를 거부하실 경우 통합조회, 데이터
          분석 서비스 이용을 위해 필수적 사항이므로 동의하셔야 서비스 제공이
          가능합니다.
        </p>
  
        <!-- Agreement Checkboxes -->
        <div class="checkboxes">
          <div class="checkbox-card">
            <label>
              <input type="checkbox" class="custom-checkbox" />
              <span>[선택] 카드 결제처 정보 표시</span>
            </label>
            <p class="checkbox-description">
              카드 결제를 유추할 수 있는 가맹점명 및 사업자번호 정보를 보여줍니다.
            </p>
          </div>
  
          <div class="checkbox-card">
            <label>
              <input type="checkbox" class="custom-checkbox" />
              <span>[선택] 계좌 출처·메모 표시</span>
            </label>
            <p class="checkbox-description">
              거래 내역에서 정확한 계좌명·출금처를 보여줍니다.
            </p>
          </div>
  
          <div class="checkbox-card">
            <label>
              <input type="checkbox" class="custom-checkbox" v-model="isRequiredChecked" />
              <span>[필수] 개인(신용)정보 수집·이용동의</span>
            </label>
          </div>
        </div>
      </div>
  
      <FooterNav :buttonType="'next'" :buttonAction="goToNextStep" :disabled="!isRequiredChecked" />
    </div>
  </template>
  
  <script>
  import Header from "../../components/Header.vue";
  import FooterNav from "../../components/FooterNav.vue";
  import ProgressBar from "../../components/ProgressBar.vue"; // Import the ProgressBar component
  
  export default {
    name: "Agree6",
    components: {
      FooterNav,
      Header,
      ProgressBar, // Register ProgressBar component
    },
    data() {
      return {
        isRequiredChecked: false,
      };
    },
    methods: {
      goToNextStep() {
        if (this.isRequiredChecked) {
          this.$router.push("/agree_loading"); // Change to the next page route
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
  
  strong {
    font-size: 14px;
  }
  .content-container {
    margin: 50px;
    margin-top: 10px;
  }
  
  .section-label {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 14px;
  }
  
  .selection-section {
    margin-top: 20px;
  }
  
  .dropdown-select {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .info-notice {
    margin-top: 50px;
    font-size: 12px;
    color: #555;
    line-height: 1.6;
  }
  
  .checkboxes {
    margin-top: 30px;
  }
  
  .checkbox-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  .checkboxes label {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
  }
  
  .custom-checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 50%;
    margin-right: 10px;
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
  
  .custom-checkbox:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .checkbox-description {
    margin-top: 10px;
    margin-left: 2.5px;
    font-size: 12px;
    color: #555;
    line-height: 1.6;
  }
  </style>
