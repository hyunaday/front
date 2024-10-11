<template>
  <div class="main-container">
    <Header />
    
    <div class="transfer-page">
      <!-- <button @click="goBack" class="back-button">
          <i class="fas fa-chevron-left"></i>
        </button> -->
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
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    validateInput() {
      this.recipient = this.recipient.replace(/[^0-9]/g, '').slice(0, 13);
    },
    goToGroupPayPage() {
      this.$router.push("/grouppay");
    },

    // 더미 거래 내역을 fetch하는 메서드
    fetchTransactions() {
      // 더미 거래 내역
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

      // 더미 데이터 설정
      this.recentTransactions = dummyTransactions;
    },
    
    copyAccountNumber(accountNumber) {
      this.recipient = accountNumber;
      navigator.clipboard.writeText(accountNumber)
        .then(() => {
          // 계좌번호 복사 성공 시 알림 추가
          console.log("계좌번호가 복사되었습니다.");
        })
        .catch(err => {
          console.error('복사 실패:', err);
        });
    },
    
    sendMoney() {
      // 송금 로직 (여기에 필요한 송금 로직을 추가하세요)
      this.$router.push('/transfer2'); // /transfer2로 이동
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
  overflow-y: hidden; /* 세로 스크롤 제거 */
}

.point {
  color: #6981d9;
}

.transfer-form {
  margin-bottom: 70px;
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
</style>
