<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <!-- <Header /> -->
    <div class="transfer-page">
      <div class="transfer-form">
        <label for="recipient">
          <span class="point">누구</span>에게<br /> 보내겠습니까?
        </label>
        <input
          type="text"
          id="recipient"
          v-model="recipient"
          placeholder="이름, 계좌번호 입력"
          @input="validateInput"
          maxlength="13"
        />
        <!-- <button type="button" class="stroke-button" @click="sendMoney">송금하기</button> -->
      </div>

      <div class="recent-transactions">
        <h3 class="recent-title">최근 거래</h3>
        <div v-if="recentTransactions.length > 0">
          <div v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
            <img class="transaction-image" src="../../assets/images/kbbank.png" alt="KB Bank" />
            <div class="transaction-details">
              <p class="transaction-name">{{ transaction.name }}</p>
              <p class="transaction-account">{{ formatAccountNumber(transaction.accountNumber) }}</p>
            </div>
            <hr class="transaction-divider" />
          </div>
        </div>
        <p v-else class="no-transactions">최근 거래 내역이 없습니다.</p>
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
      recipient: '',
      recentTransactions: [], // 거래 내역을 저장할 배열
    };
  },
  methods: {
    validateInput() {
      this.recipient = this.recipient.replace(/[^0-9]/g, '').slice(0, 13);
    },
    sendMoney() {
      if (this.recipient.length === 13) {
        console.log(`송금할 계좌번호: ${this.recipient}`);
      } else {
        alert("송금할 계좌번호를 확인해주세요.");
      }
    },
    formatAccountNumber(accountNumber) {
      // 계좌번호 포맷팅 함수
      return `${accountNumber.slice(0, 3)}-${accountNumber.slice(3, 7)}-${accountNumber.slice(7, 11)}-${accountNumber.slice(11)}`;
    },
    fetchTransactions() {
      // 여기에 DB에서 거래 내역을 불러오는 로직 추가
      // 예시 데이터
      this.recentTransactions = [
        { id: 1, name: '홍길동', accountNumber: '3604562599743', image: '/path/to/image1.jpg' },
        { id: 2, name: '김철수', accountNumber: '1234567890123', image: '/path/to/image2.jpg' },
      ];
    },
  },
  mounted() {
    this.fetchTransactions(); // 컴포넌트가 마운트될 때 거래 내역 가져오기
  },
};
</script>

<style scoped>
.main-container {
  height: 100vh;
  padding: 20px;
}

.transfer-page {
  max-width: 400px;
  border-radius: 10px;
  padding: 30px;
  text-align: left;
}

.point {
  color: #6981d9;
}

.transfer-form {
  margin-bottom: 70px;
}

label {
  font-size: 20px;
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
}

input[type="text"] {
  width: 100%;
  padding: 10px 90px 3px 2px;
  border: none;
  border-bottom: 2px solid #6981d9;
  font-size: 16px;
  margin-bottom: 10px;
  outline: none;
  background-color: transparent;
}

input[type="text"]::placeholder {
  color: #aaa;
}

.recent-transactions {
  margin-top: 20px;
}

.recent-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
}

.transaction-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.transaction-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.transaction-details {
  flex-grow: 1;
}

.transaction-name {
  font-size: 12px; /* 이름 폰트 크기 작게 설정 */
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 6px;
}

.transaction-account {
  font-size: 12px; /* 계좌번호 폰트 크기 */
  color: #6981d9; /* 계좌번호 색상 변경 */
  margin-bottom: 6px;
}

.no-transactions {
  font-size: 12px;
  color: #555;
}

.transaction-divider {
  border: none;
  border-top: 1px solid #ccc; /* 수평선 색상 */
  margin: 5px 0; /* 수평선 위아래 간격 */
}
</style>
