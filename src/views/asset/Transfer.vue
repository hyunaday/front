<template>
  <div class="main-container">
    <Header />
    <div class="transfer-page">
      <div class="transfer-form">
        <label for="recipient">
          <span class="point">누구</span>에게<br /> 보내겠습니까?
        </label>
        <input
          type="text"
          id="recipient"
          v-model="recipient"
          placeholder="계좌번호 입력"
          @input="validateInput"
          @keyup.enter="sendMoney"
          maxlength="13"
        />

        <!-- 11자리 이상 입력되면 받는 분에게 표시될 내용 입력란과 송금하기 버튼 표시 -->
        <div v-if="recipient.length >= 11">
          <input
            type="text"
            id="message"
            v-model="message"
            placeholder="받는 분에게 표시될 내용"
          />
          <router-link to="/transfer2">
          <button 
            type="button" 
            class="stroke-button" 
            @click="sendMoney" 
            v-if="recipient.length >= 11"
          >
            송금하기
          </button>
        </router-link>

        </div>
      </div>

      <div class="recent-transactions">
        <h3 class="recent-title">최근 거래</h3>
        <div v-if="recentTransactions.length > 0">
          <div 
            v-for="transaction in recentTransactions" 
            :key="transaction.id" 
            class="transaction-item"
          >
            <img class="transaction-image" src="../../assets/images/kbbank.png" alt="KB Bank" />
            <div class="transaction-details">
              <p class="transaction-name">{{ transaction.name }}</p>
              <p 
                class="transaction-account" 
                @click="copyAccountNumber(transaction.accountNumber)"
              >
                {{ formatAccountNumber(transaction.accountNumber) }}
              </p>
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
import axios from 'axios';
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
      message: '', // 메모 내용 추가
      recentTransactions: [],
    };
  },
  methods: {
    validateInput() {
      // 숫자만 입력하고 최대 13자리로 제한
      this.recipient = this.recipient.replace(/[^0-9]/g, '').slice(0, 13);
    },
    async sendMoney() {
      if (this.recipient.length >= 11) {
        // 여기서 다른 페이지로 이동하는 로직을 추가하세요
      } else {
        alert("송금할 계좌번호를 확인해주세요.");
      }
    },
    formatAccountNumber(accountNumber) {
      return `${accountNumber.slice(0, 3)}-${accountNumber.slice(3, 7)}-${accountNumber.slice(7, 11)}-${accountNumber.slice(11)}`;
    },
    fetchTransactions() {
      this.recentTransactions = [
        { id: 1, name: '홍길동', accountNumber: '3604562599743', image: '/path/to/image1.jpg' },
        { id: 2, name: '김철수', accountNumber: '1234567890123', image: '/path/to/image2.jpg' },
      ];
    },
    copyAccountNumber(accountNumber) {
      this.recipient = accountNumber;
      navigator.clipboard.writeText(this.formatAccountNumber(accountNumber))
        .then(() => {
          alert("계좌번호가 복사되었습니다.");
        })
        .catch(err => {
          console.error('복사 실패:', err);
        });
    },
  },
  mounted() {
    this.fetchTransactions();
  },
};
</script>

<style scoped>
.transfer-page {
  width: 330px; /* 고정된 너비를 설정 */
  max-width: 100%; /* 반응형을 유지하기 위한 설정 */
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
  max-width: 400px; /* 고정된 최대 너비를 설정 */
  width: 100%; /* 너비는 부모 요소에 따라 확장 */
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
  font-size: 12px; 
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 6px;
}

.transaction-account {
  font-size: 12px; 
  color: #6981d9; 
  margin-bottom: 6px;
  cursor: pointer;
}

.no-transactions {
  font-size: 12px;
  color: #555;
}

.transaction-divider {
  border: none;
  border-top: 1px solid #ccc; 
  margin: 5px 0; 
}

.stroke-button {
  background-color: #6981d9;
  color: white;
  border: 2px solid #6981d9;
  padding: 8px 13px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.stroke-button:hover {
  background-color: white;
  color: #6981d9;
}
</style>
