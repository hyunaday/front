<template>
  <div>
    <div class="main-container d-flex flex-column">
      <div class="header">
        <button @click="goBack" class="back-button">
          <i class="fas fa-chevron-left"></i>
        </button>
        <h2 class="title">결제완료</h2>
      </div>

      <div class="payment-success-page">
        <div class="Cards-icon">
          <div class="circle-background">
            <img :src="CardIcon" alt="Cards" />
          </div>
        </div>
        <p class="success-message">결제 성공</p>

        <div class="payment-card-container">
          <div class="payment-card">
            <img
              :src="paymentCardImage"
              alt="Payment Card"
              class="payment-card-image"
            />
            <div class="payment-info">
              <p class="merchant-name">{{ merchantName }}</p>
              <p class="payment-amount">{{ paymentAmount }} 원</p>
            </div>
          </div>
        </div>

        <!-- 확인 버튼 추가 -->
        <button @click="goToNextPage" class="confirm-button">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
import CardIcon from '../../assets/images/Cards.png';
import SelectedCardImage from '../../assets/images/국민카드1.png'; // 선택된 카드 이미지 경로

export default {
  data() {
    return {
      CardIcon,
      paymentCardImage: SelectedCardImage, // 초기값으로 선택된 카드 이미지 설정
      merchantName: '', // 가맹점 상호명
      paymentAmount: 0, // 결제 금액
    };
  },
  mounted() {
    this.fetchPaymentDetails(); // 컴포넌트가 마운트되면 결제 정보 가져오기
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 뒤로 가기
    },
    fetchPaymentDetails() {
      // 예시 API 호출 (실제 URL로 변경 필요)
      fetch('https://api.example.com/payment-details')
        .then((response) => response.json())
        .then((data) => {
          this.merchantName = data.merchantName; // API에서 가져온 가맹점 상호명
          this.paymentAmount = data.amount; // API에서 가져온 결제 금액
        })
        .catch((error) => {
          console.error('Error fetching payment details:', error);
        });
    },
    goToNextPage() {
      this.$router.push('/'); // 이동할 페이지 경로를 입력하세요.
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

.success-message {
  font-size: 20px; /* 원하는 크기로 설정 */
  font-weight: bold; /* 선택적으로 굵게 설정할 수 있음 */
  text-align: center; /* 선택적으로 중앙 정렬할 수 있음 */
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

.payment-success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.Cards-icon {
  margin-bottom: 20px; /* 아이콘과 텍스트 사이 간격 */
}

.circle-background {
  width: 160px; /* 원의 크기 조정 */
  height: 160px; /* 원의 크기 조정 */
  border-radius: 50%; /* 둥근 형태 만들기 */
  background-color: #6981d9; /* 파란색 배경 */
  border: 5px solid #8ff086; /* 빨간색 테두리 */
  display: flex;
  align-items: center;
  justify-content: center; /* 아이콘을 가운데 정렬 */
}

.circle-background img {
  max-width: 80%; /* 아이콘 크기 조정 */
  max-height: 80%; /* 아이콘 크기 조정 */
}

.payment-card-container {
  border: 2px solid #d8ddd7; /* 테두리 색상 설정 */
  border-radius: 10px; /* 테두리 둥글게 */
  padding: 15px; /* 상자 내부 여백 */
  margin-top: 20px; /* 카드 정보와 텍스트 간격 */
}

.payment-card {
  display: flex;
  align-items: center; /* 카드 이미지와 정보를 수평으로 배치 */
  min-height: 100px; /* 고정 높이 설정 */
}

.payment-card-image {
  width: 100px; /* 결제 카드 이미지 크기 조정 */
  height: auto; /* 비율 유지 */
  margin-right: 10px; /* 카드 이미지와 정보 사이 간격 */
}

.payment-info {
  display: flex;
  flex-direction: column; /* 가맹점 상호명과 결제 금액 수직 배치 */
  text-align: left; /* 텍스트 정렬 */
}

.merchant-name {
  font-size: 16px; /* 가맹점 상호명 크기 */
  margin: 5px 0; /* 간격 조정 */
}

.payment-amount {
  font-size: 18px; /* 결제 금액 크기 */
  font-weight: bold; /* 두껍게 표시 */
}

.confirm-button {
  margin-top: 20px; /* 버튼과 카드 간 간격 조정 */
  padding: 10px 20px; /* 버튼 내부 여백 */
  background-color: #4caf50; /* 버튼 색상 */
  color: white; /* 버튼 텍스트 색상 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 둥글게 */
  cursor: pointer; /* 마우스 포인터 변경 */
  font-size: 16px; /* 버튼 텍스트 크기 */
  width: 300px;
}

.confirm-button:hover {
  background-color: #45a049; /* 마우스 오버 시 색상 변경 */
}
</style>
