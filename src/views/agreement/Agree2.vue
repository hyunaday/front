<template>
    <div class="main-container">
      <Header />
  
      <!-- Reusable ProgressBar Component -->
      <ProgressBar :currentStep="currentStep" :totalSteps="4" />
  
      <div class="title">
        <h5>금융사 <span class="text">연결약관</span>에 <br />동의해 주세요</h5>
        <p class="sub-title">1~2번 약관을 모두 확인해주세요.</p>
      </div>
  
      <div class="main-text">
        <h6>1. 가입상품 목록 전송요구 및<br />개인(신용)정보 수집이용 동의서</h6>
        <p>
          모두의 결제는 [신용정보의 이용 및 보호에 관한 법률], [개인정보 보호법]
          등 관련 법령에 따라 다음과 같이 귀하의 개인(신용)정보를 처리합니다.
        </p>
  
        <h6>정보제공 금융사</h6>
        <p>
          신한은행, 기업은행, 케이뱅크, 새마을금고, 지역농협, SC제일은행,
          대구은행, 부산은행, 수협은행, 토스뱅크,<br />
          씨티은행, 경남은행, KDB산업은행, 광주은행, 전북은행, 제주은행,
          웰컴저축은행, 제주은행, SBI저축은행,<br />
          NH저축은행, 저비지저축은행, 페퍼저축은행, DB은행, 스마트저축은행,
          KB저축은행, 키움저축은행
        </p>
  
        <br />
  
        <h6>전송받는자</h6>
        <p>모두의 결제</p>
      </div>
  
      <FooterNav :buttonType="'next'" :buttonAction="goToNextStep" />
    </div>
  </template>
  
  <script>
  import Header from "../../components/Header.vue";
  import FooterNav from "../../components/FooterNav.vue";
  import ProgressBar from "../../components/ProgressBar.vue"; // Import the ProgressBar component
  
  export default {
    name: "Agree2",
    components: {
      FooterNav,
      Header,
      ProgressBar, // Register ProgressBar component
    },
    data() {
      return {
        currentStep: 2, // Track the current step
      };
    },
    methods: {
      goToNextStep() {
        if (this.currentStep < 4) {
          this.currentStep++;
        } else {
          this.$router.push("/agree3"); // Navigate to the next page if on the last step
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
  
  .title {
    margin-left: -120px;
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
  
  .main-text {
    margin: 50px;
    margin-top: 15px;
    text-align: left;
    font-size: 12px;
    color: #333;
    line-height: 1.6;
  }
  
  .main-text h6 {
    font-weight: bold;
    margin-top: 10px;
  }
  
  .main-text p {
    margin-top: 5px;
  }
  </style>
  