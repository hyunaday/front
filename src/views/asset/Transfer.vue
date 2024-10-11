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

        <div v-if="recipient.length >= 11">
          <input
            type="text"
            id="message"
            v-model="message"
            placeholder="받는 분에게 표시될 내용"
          />
          <button 
            type="button" 
            class="stroke-button" 
            @click="sendMoney" 
            v-if="recipient.length >= 11"
          >
            송금하기
          </button>
        </div>
      </div>

      <div class="recent-transactions">
        <h3 class="recent-title">최근 거래</h3>
        <div v-if="recentTransactions.length > 0">
          <div 
            v-for="transaction in recentTransactions" 
            :key="transaction.idx" 
            class="transaction-item"
          >
            <img class="transaction-image" src="../../assets/images/kbbank.png" alt="KB Bank" />
            <div class="transaction-details">
              <p class="transaction-name">{{ transaction.name }}</p>
              <p 
                class="transaction-account" 
                @click="copyAccountNumber(transaction.accountNumber)"
              >
                {{ transaction.accountNumber }}
              </p>
              <p class="transaction-date">{{ transaction.createdAt }}</p>
            </div>
            <hr class="transaction-divider" />
          </div>
        </div>
        <p v-else class="no-transactions">최근 거래 내역이 없습니다.</p>
      </div>
    </div>
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
    
    <!-- 모달 -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p>{{ modalMessage }}</p>
      </div>
    </div>
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
      message: '',
      recentTransactions: [],
      showModal: false,
      modalMessage: '',
    };
  },
  methods: {
    validateInput() {
      this.recipient = this.recipient.replace(/[^0-9]/g, '').slice(0, 13);
    },
    goToGroupPayPage() {
      this.$router.push("/grouppay");
    },

    fetchTransactions() {
      const dummyTransactions = [
        {
          idx: 1,
          name: '홍길동',
          accountNumber: '123-456-789012',
          createdAt: new Date().toLocaleString(),
        },
        {
          idx: 2,
          name: '김철수',
          accountNumber: '234-567-890123',
          createdAt: new Date().toLocaleString(),
        },
        {
          idx: 3,
          name: '이영희',
          accountNumber: '345-678-901234',
          createdAt: new Date().toLocaleString(),
        },
      ];

      this.recentTransactions = dummyTransactions;
    },
    copyAccountNumber(accountNumber) {
      this.recipient = accountNumber;
      navigator.clipboard.writeText(accountNumber)
        .then(() => {
          this.showModal = true;
          this.modalMessage = "계좌번호가 복사되었습니다.";
        })
        .catch(err => {
          console.error('복사 실패:', err);
        });
    },
    closeModal() {
      this.showModal = false;
    },
    sendMoney() {
      // 송금 로직을 여기에 추가하세요
      this.showModal = true;
      this.modalMessage = "송금이 완료되었습니다."; // 예시 메시지
    }
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
  overflow-y: hidden; /* 세로 스크롤 제거 */
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
  max-width: 400px;
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

.transaction-date {
  font-size: 10px;
  color: #888;
  margin-top: 2px;
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

/* 모달 스타일 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달의 z-index 설정 */
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 300px; /* 모달 너비 */
}

.close {
  cursor: pointer;
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
