<template>
  <div>
    <div class="main-container d-flex flex-column">
      <div class="header">
        <button @click="goBack" class="back-button">
          <i class="fas fa-chevron-left"></i>
        </button>
        <h2 class="title">결제 취소</h2>
      </div>

      <div class="payment-failure-page">
        <div class="broken-card-icon">
          <div class="circle-background">
            <img :src="brokenCardIcon" alt="Broken Card" />
          </div>
        </div>
        <p>결제 승인이 취소 되었습니다.</p>
        <button class="request-payment-button" @click="goToPaymentRequest">
          결제 요청하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import brokenCardIcon from '../../assets/images/brokencard.png';

export default {
  data() {
    return {
      brokenCardIcon,
    };
  },
  methods: {
    retryPayment() {
      this.$router.push('/solopay'); // SoloPay 페이지의 경로를 입력하세요.
    },
    goToPaymentRequest() {
      // 결제 요청 페이지로 이동
      this.$router.push('/payment-request'); // 결제 요청 페이지의 경로를 입력하세요.
    },
  },
};
</script>

<style scoped>
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  width: 100%;
}

.back-button {
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #000;
}

.title {
  font-size: 18px;
  margin: 0;
  text-align: center;
}

.payment-failure-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.broken-card-icon {
  margin-bottom: 20px; /* 아이콘과 텍스트 사이 간격 */
}

.circle-background {
  width: 160px; /* 원의 크기 조정 */
  height: 160px; /* 원의 크기 조정 */
  border-radius: 50%; /* 둥근 형태 만들기 */
  background-color: #6981d9; /* 파란색 배경 */
  border: 5px solid #fb3232; /* 빨간색 테두리 */
  display: flex;
  align-items: center;
  justify-content: center; /* 아이콘을 가운데 정렬 */
}

.circle-background img {
  max-width: 100%; /* 아이콘 크기 조정 */
  max-height: 100%; /* 아이콘 크기 조정 */
}

.request-payment-button {
  margin-top: 70px; /* 텍스트와 버튼 사이 간격 조정 */
  padding: 10px 20px; /* 버튼 패딩 */
  background-color: #6981d9; /* 버튼 배경색 */
  color: white; /* 버튼 텍스트 색상 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 둥근 모서리 */
  cursor: pointer; /* 포인터 커서 */
  font-size: 16px; /* 버튼 텍스트 크기 조절 */
  width: 300px;
}
</style>
