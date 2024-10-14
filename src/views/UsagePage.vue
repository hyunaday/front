<template>
  <div class="main-container">
    <Header />
    <div class="container mt-3">
      <h1 class="title display-4 text-primary">편리함의 첫걸음,</h1>
      <h2 class="subtitle display-5 text-secondary">모두의 결제 사용하는 방법</h2>

      <h3 class="subheading h4 text-dark">🤔 모두의 결제는 무엇이고 사용하면 뭐가 좋은가요?</h3>
      <p class="content lead">
        모두의 결제는 더치페이를 빠르고 쉽게 할 수 있는 서비스를 말해요.
        모두의 결제는 다른사람들과 연동을 통해 편리하고 재미있는 더치페이 서비스를 제공합니다.
        또한 결제 내역과 가계부 등을 통해 수입과 지출을 관리하고
        조건에 딱 맞는 카드 상품 등을 추천해 드려요.
      </p>

      <p class="content lead">
        그럼 이제부터 모두의 결제 사용 방법을 안내해 드릴게요.
      </p>

      <h2 class="step-title h4 text-info">1️⃣ 모두의 결제 이용약관 동의 및 <br>연동 시작</h2>
      <p class="content lead">
        모두의 결제 앱 홈 화면에서 내 자산 연결 버튼을 눌러주세요.
        이후 ‘모두의 결제 서비스 이용약관’창의 ‘동의하고 연결하기’ 버튼을 눌러 연동을 시작해주세요.
      </p>

      <h2 class="step-title h4 text-info">2️⃣ 결제 방식 선택</h2>
      <p class="content lead">
        결제 버튼을 클릭하고 결제 방식을 선택해주세요.
        결제 방식은 2가지로 그냥 혼자 결제하는 개인 결제 방식과 친구와 함께 결제하는 함께 결제 방식이 있습니다.
      </p>

      <h2 class="step-title h4 text-info">3️⃣ 식당에 배치 된 큐알을 <br>찍어주세요</h2>
      <p class="content lead">
        대표자 한분이 식당에 배치 된 큐알을 찍고, 고객님이 시키신 메뉴와 가격을 확인해주세요.
      </p>

      <h2 class="step-title h4 text-info">4️⃣ 대표자 큐알 생성</h2>
      <p class="content lead">
        대표자 화면에 큐알이 생성 되면 함께 결제를 진행 할 팀원 분들은 대표자 화면에 보이는 큐알을 통해 함께 결제에 참여해 주세요.
      </p>

      <h2 class="step-title h4 text-info">5️⃣ 빠르고 간단한 벌칙 게임</h2>
      <p class="content lead">
        게임 하기 버튼을 클릭하고 간단한 게임 리스트 중 하나를 선택해 주세요. 게임을 통해 벌칙을 받을 사람을 정할 수 있습니다. 
      </p>

      <h2 class="step-title h4 text-info">6️⃣ 결제 하기</h2>
      <p class="content lead">
        벌칙자에게 어떤 벌칙을 줄지 상의하고, 각자 자기가 결제 하고 싶은 메뉴나 금액을 입력하고 결제 버튼을 통해 결제를 진행한다.
        결제가 완료되면 개개인에 카드에 선택한 금액이 결제 된다.
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
      this.$router.push("/grouppay");
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
  padding-bottom: 60px;
  background-color: white;
}

.container {
  max-width: 90%;
  overflow-y: auto;
  padding-bottom: 80px;
  padding: 20px;
}

.title {
  font-size: 1.75rem; /* h1 크기 줄임 */
  margin-top: 20px;
}

.subtitle {
  font-size: 1.5rem; /* h2 크기 줄임 */
  margin-bottom: 50px;
}

.subheading {
  font-size: 1.25rem; /* h3 크기 줄임 */
}

.step-title {
  font-size: 1.25rem; /* 다른 h2 요소와 일관성 유지 */
}

.content {
  font-size: 0.875rem; /* p 태그 크기 줄임 */
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
