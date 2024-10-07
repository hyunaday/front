<template>
    <div class="main-container">
      <Header />
      <ProgressBar :currentStep="4" :totalSteps="4" />
  
      <div class="content-container">
        <!-- Title -->
        <h5>
          마지막으로 내용을 <span class="text-highlight">확인</span>하고<br />
          동의해 주세요
        </h5>
  
        <!-- Description -->
        <p class="sub-title">상세정보 전송요구 및 개인신용정보 수집이용 동의서</p>
        <p class="sub-description">
          앞에서 선택하신 항목을 아래 금융사에게 전송하라고 요청하는 것에 동의 하시나요?
        </p>
  
        <!-- Info Section -->
        <div class="info-section">
          <p><strong>정보제공 금융사</strong><br />우리은행, 신한은행</p>
          <p><strong>전송받는자</strong><br />모두의 결제</p>
          <p><strong>전송요구·수집이용목적</strong><br />전송요구를 통한 본인신용정보 통합조회, 데이터분석 <br />서비스의 이용</p>
          <p><strong>전송요구 종료시점 / 보유·이용기간</strong><br />서비스 이용 종료 시 또는 삭제요구 시까지</p>
        </div>
  
        <!-- Additional Info -->
        <div class="transfer-info">
          <p><strong>전송항목정보</strong></p>
          <ul>
            <li><span class="text-highlight">은행</span> - 수시계좌 정보, 대출상품 정보</li>
            <li><span class="text-highlight">카드</span> - 카드계정 정보, 대출상품 정보</li>
          </ul>
        </div>
      </div>
  
      <FooterNav :buttonType="'next'" :buttonAction="goToNextStep" />
    </div>
  </template>
  
  <script>
  import Header from "../../components/Header.vue";
  import FooterNav from "../../components/FooterNav.vue";
  import ProgressBar from "../../components/ProgressBar.vue"; // Import the ProgressBar component
  
  export default {
    name: "Agree5",
    components: {
      FooterNav,
      Header,
      ProgressBar, // Register ProgressBar component
    },
    methods: {
      goToNextStep() {
        // You can define what happens when the "next" button is clicked
        this.$router.push("/agree6"); // Change to the next page route
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
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 30px;
  }
  
  h5 {
    font-weight: bold;
    line-height: 1.4;
  }
  
  .text-highlight {
    color: #6981d9;
  }
  
  .sub-title {
    margin-top: 50px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  
  .sub-description {
    margin-top: 5px;
    font-size: 12px;
    color: #555;
    line-height: 1.6;
  }
  
  .info-section {
    margin-top: 20px;
    font-size: 12px;
    color: #333;
    line-height: 1.6;
  }
  
  .info-section p {
    margin-bottom: 10px;
  }
  
  .transfer-info {
    margin-top: 20px;
    font-size: 12px;
    color: #555;
  }
  
  .transfer-info ul {
    margin-top: 10px;
    padding-left: 15px;
  }
  
  .transfer-info li {
    margin-bottom: 5px;
  }
  </style>
  