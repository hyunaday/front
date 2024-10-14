<template>
    <div class="main-container">
      <Header />
      <div class="container mt-3">
        <h1 class="display-4 text-primary">자산관리의 첫걸음,</h1>
        <h2 class="display-5 text-secondary">마이데이터 연동하는 법</h2>
  
        <h3 class="h4 text-dark">🤔 마이데이터는 무엇이고 연동하면 뭐가 좋은가요?</h3>
        <p class="lead">
          마이데이터는 ‘정보(계좌)’를 한곳에 모아 관리하는 서비스를 말해요.
          핀다는 마이데이터 연동을 통해 흩어진 자산을 효과적으로 관리할 수 있는 다양한 서비스를 제공합니다.
          가장 유리한 현금자산·대출·신용점수 관리 방법을 안내하고,
          조건에 딱 맞는 대출 상품 등을 추천해 드려요.
        </p>
  
        <p class="lead">
          그럼 이제부터 마이데이터 연동 방법을 안내해 드릴게요.
          참고로 마이데이터 연동은 안전하고 정확한 정보 취합을 위해 2번의 인증 과정을 거치는데요.
          이점 유의하시고 따라와 주세요!
        </p>
  
        <h2 class="h4 text-info">1️⃣ 마이데이터 서비스 이용약관 동의 및 연동 시작</h2>
        <p class="lead">
          핀다 앱 홈 화면에서 우측 상단의 🔍 아이콘을 눌러주세요.
          이후 ‘마이데이터 서비스 이용약관’ 팝업 창의 ‘동의하고 연결하기’ 버튼을 눌러 연동을 시작해주세요.
        </p>
  
        
      </div>
      <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
    </div>
  </template>
  
  <script>
  import FooterNav from "../components/FooterNav.vue";
  import Header from "../components/Header.vue";
  
  export default {
    name: "UsagePage",
    components: {
      FooterNav,
      Header,
    },
    methods: {
      goToGroupPayPage() {
        // 그룹 결제 페이지로 이동하는 함수
        this.$router.push("/group-pay");
      },
    },
  };
  </script>
  
  <style scoped>
  .main-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 20px;
    background-color: #f8f9fa; /* 배경색 추가 */
  }
  
  .container {
    max-width: 90%;
    overflow-y: auto;
    padding-bottom: 80px;
    padding: 20px;
  }
  
  .date {
    font-size: 1rem;
    color: #6c757d;
    margin-bottom: 1.5rem;
  }
  
  .container::-webkit-scrollbar {
    display: none;
  }
  
  .screenshot {
    max-width: 100%;
    margin-top: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  