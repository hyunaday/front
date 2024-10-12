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
        <button class="stroke-button" @click="showConfirmModal = true">확인</button>
      </div>
    </div>

    <!-- 송금 확인 모달 -->
    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal-content">
        <p>계속 송금하시겠습니까?</p>
        <button @click="confirmTransfer" class="confirm-button">계속 송금하기</button>
        <button @click="showConfirmModal = false" class="cancel-button">취소</button>
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
      recipient: '김국민', // 받는 사람
      date: '', // 송금 날짜
      showConfirmModal: false, // 모달 표시 상태
    };
  },
  methods: {
    goToGroupPayPage() {
      this.$router.push("/grouppay");
    },
    confirmTransfer() {
      // 여기에 송금 완료 후 필요한 로직 추가
      console.log('송금이 완료되었습니다.'); // 임시 로그
      this.showConfirmModal = false; // 모달 닫기
      this.$router.push('/transfer'); // 송금 완료 후 페이지 이동
    },
    getCurrentDate() {
      const now = new Date();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      return now.toLocaleString('ko-KR', options).replace(',', '').replace(/\//g, '-');
    }
  },
  mounted() {
    this.date = this.getCurrentDate(); // 현재 날짜 설정
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

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
}

.confirm-button,
.cancel-button {
  margin: 5px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.confirm-button {
  background-color: #98b6ef;
  color: white;
}

.cancel-button {
  background-color: #6981d9;
  color: white;
}
</style>
