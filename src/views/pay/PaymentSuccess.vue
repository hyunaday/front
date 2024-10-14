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

        <!-- 확인 버튼 추가 -->
        <button @click="goToNextPage" class="confirm-button">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
import CardIcon from '../../assets/images/Cards.png';

export default {
  data() {
    return {
      CardIcon,
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
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
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
  margin-bottom: 20px;
}

.circle-background {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background-color: #6981d9;
  border: 4px solid #71d785;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: glowing 2s infinite alternate;
}

.circle-background img {
  max-width: 80%;
  max-height: 80%;
}

.confirm-button {
  margin-top: 60px;
  padding: 10px 20px;
  background-color: #6981d9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 200px;
}

.confirm-button:hover {
  background-color: #5266b1;
}

@keyframes glowing {
  0% {
    box-shadow: 0 0 10px #71d785, 0 0 20px #71d785, 0 0 30px #71d785;
  }
  100% {
    box-shadow: 0 0 30px #71d785, 0 0 40px #71d785, 0 0 50px #71d785;
  }
}
</style>
