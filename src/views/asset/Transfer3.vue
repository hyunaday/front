<template>
  <div class="main-container">
    <Header />
    <div class="complete-page">
      <div class="logo">
        <i class="fa-solid fa-circle-check logo-icon"></i>
      </div>
      <h1 class="amount">{{ amount }}원</h1>
      <h2 class="status">송금 완료</h2>
      <div class="details-container">
        <div class="details-label">
          <p><strong>받는 분:</strong></p>
          <p><strong>날짜:</strong></p>
        </div>
        <div class="details-value">
          <p>{{ recipient }}</p>
          <p>{{ date }}</p>
        </div>
      </div>
      <div class="button-container">
        <button class="stroke-button" @click="confirm">확인</button>
      </div>
    </div>
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';
import Header from '../../components/Header.vue';

export default {
  name: 'Transfer',
  components: {
    FooterNav,
    Header,
  },
  data() {
    return {
      amount: 10000, // 송금 금액
      recipient: '박비바', // 받는 사람
      date: '2020년 3월 12일 12:45', // 송금 날짜
    };
  },
  methods: {
    goToGroupPayPage() {
      this.$router.push("/grouppay");
    },
    confirm() {
      const userConfirmed = confirm('계속 송금하시겠습니까?');
      if (userConfirmed) {
        this.$router.push('/transfer'); // 예일 경우 /transfer로 이동
      } else {
        this.$router.push('/'); // 아니오일 경우 홈으로 이동
      }
    },
  },
}
</script>

<style scoped>
.complete-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%; /* 전체 너비 */
  max-width: 400px; /* 최대 너비 설정 */
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  margin-top: 30px;
}

.logo-icon {
  font-size: 60px; /* 아이콘 크기 조정 */
  color: #6981d9; /* 아이콘 색상 설정 */
  margin-bottom: 15px; /* 아이콘과 텍스트 사이의 여백 */
}

.amount {
  font-size: 32px;
  font-weight: bold;
  margin: 15px 0;
}

.status {
  font-size: 30px;
  color: #333;
  font-weight: bold;
}

.details-container {
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  width: 100%; /* 전체 너비 사용 */
  margin-top: 210px; /* 버튼과의 여백 */
}

.details-label,
.details-value {
  text-align: left; /* 기본적으로 왼쪽 정렬 */
}

.details-value {
  text-align: right; /* 값은 오른쪽 정렬 */
}

.button-container {
  display: flex;
  justify-content: center; /* 버튼 중앙 정렬 */
  margin-top: 20px;
}

.stroke-button {
  background-color: #6981d9;
  color: white;
  border: 2px solid #6981d9;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  width: 260px;
  transition: background-color 0.3s, color 0.3s;
}

.stroke-button:hover {
  background-color: white;
  color: #6981d9;
}
</style>
