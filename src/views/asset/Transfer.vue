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
        <button 
          type="button" 
          class="stroke-button" 
          @click="sendMoney" 
          v-if="recipient.length === 13"
        >
          송금하기
        </button>
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
      recentTransactions: [],
    };
  },
  methods: {
    validateInput() {
      this.recipient = this.recipient.replace(/[^0-9]/g, '').slice(0, 13);
    },
    async sendMoney() {
      if (this.recipient.length === 13) {
        try {
          const response = await axios.post('/account/{accountIdx}/history', {
            fromAccountNumber: '333-3333-3333',  // 사용자의 계좌 번호로 설정
            toAccountNumber: this.recipient,
            amount: 1000000,  // 예시 금액 (필요시 수정)
            name: '이체',
          });
          if (response.data.isSuccess) {
            console.log(`송금 성공: ${response.data}`);
            alert("송금이 완료되었습니다.");
          }
        } catch (error) {
          console.error('송금 실패:', error);
          if (error.response && error.response.data && error.response.data.errorCode) {
            const errorCode = error.response.data.errorCode;
            if (errorCode === 'ACCOUNT4001') {
              alert("해당 계좌가 존재하지 않습니다.");
            } else if (errorCode === 'ACCOUNT4003') {
              alert("계좌 잔액이 부족합니다.");
            } else {
              alert("송금에 실패했습니다. 다시 시도해주세요.");
            }
          } else {
            alert("송금에 실패했습니다. 다시 시도해주세요.");
          }
        }
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
