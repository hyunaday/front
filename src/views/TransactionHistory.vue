<template>
    <div class="main-container d-flex flex-column justify-content-center align-items-center">
      <div>
        <h1 class="title">거래 내역 조회</h1>
        <div class="container">
          <div class="transaction-details">
            <img :src="imageSrc" alt="Bank Logo" class="bank-logo" />
            <div class="account-info">
              <span class="bank-name">국민</span>
              <span class="account-number">{{ formattedAccountNumber }}</span>
              <button @click="copyAccountNumber" class="copy-button">
                <i class="fa-regular fa-copy"></i>
              </button>
            </div>
          </div>
          <div class="account-description">국민은행 입출금 통장</div>
          <div class="amount-div" v-if="amount !== null">{{ formattedAmount }}</div>
          
          <router-link to="/transfer">
            <div class="button-container">
              <button class="transfer-button">이체</button>
            </div>
          </router-link>
        </div>
    
        <div class="search-filter">
          <input type="text" class="search-input" @keyup.enter="performSearch" v-model="searchQuery" />
          <button class="filter-icon" @click="performSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <div class="filter-icon">
            <i class="fa-solid fa-filter"></i>
          </div>
        </div>

        <!-- 거래 내역 목록 추가 -->
        <div class="transaction-list">
          <div class="transaction-item" v-for="transaction in transactions" :key="transaction.id">
            <span class="date-label">{{ transaction.date }}</span>
            <span class="name">{{ transaction.name }}</span>
            <span class="amount">{{ formatTransactionAmount(transaction.amount) }}</span>
          </div>
        </div>
      </div>
      <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
    </div>
</template>

<script>
import FooterNav from '../components/FooterNav.vue';

export default {
  name: 'TransactionHistory',
  components: {
    FooterNav,
  },
  data() {
    return {
      imageSrc: 'src/assets/images/kbbank.png',
      accountNumber: '3333091416050',
      amount: 1000000000,
      searchQuery: '', // 검색어를 저장하는 변수
      transactions: [
        { id: 1, date: '09/12', name: '홍길동', amount: -30000 },
        { id: 2, date: '09/18', name: '이순신', amount: 8000 },
        { id: 3, date: '09/21', name: '김유신', amount: -50000 },
        { id: 4, date: '09/27', name: '조국민', amount: 10000 },
        { id: 5, date: '09/30', name: '네이버', amount: 2000000 },
        // 추가 거래 내역을 여기에 삽입
      ],
    };
  },
  computed: {
    formattedAccountNumber() {
      return this.accountNumber.replace(/(\d{4})(\d{2})(\d{6})/, '$1-$2-$3');
    },
    formattedAmount() {
      return this.amount.toLocaleString() + '원';
    },
  },
  methods: {
    copyAccountNumber() {
      navigator.clipboard.writeText(this.accountNumber)
        .then(() => {
          alert('계좌번호가 복사되었습니다!');
        })
        .catch(err => {
          console.error('복사 실패:', err);
        });
    },
    performSearch() {
      if (this.searchQuery) {
        console.log(`검색어: ${this.searchQuery}`);
      } else {
        console.log('검색어가 비어 있습니다.');
      }
    },
    formatTransactionAmount(amount) {
      const formattedAmount = Math.abs(amount).toLocaleString();
      return (amount < 0 ? '-' : '+') + formattedAmount + '원';
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0;
}

.container {
  background-color: #6981D9;
  padding: 20px;
  width: 360px;
  color: white;
}

.transaction-details {
  display: flex;
  align-items: center;
}

.bank-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.account-info {
  align-items: center;
  flex-grow: 1;
  justify-content: space-between; /* 좌우 정렬 */
}

.copy-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.account-description {
  font-size: 12px;
  margin-left: 40px;
}

.amount-div {
  text-align: center; /* 중앙 정렬 */
  font-size: 20px; /* 폰트 크기 조정 */
  margin-top: 10px; /* 상단 여백 추가 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.transfer-button {
  background-color: white;
  border: none;
  padding: 5px 30px;
  border-radius: 7px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.search-filter {
  display: flex;
  align-items: center;
  margin: 20px 13px;
}

.search-input {
  flex: 1;
  padding: 5px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5); /* 연한 배경색 추가 */
  border: 1px solid #ccc; /* 테두리 추가 (원하는 경우) */
}

.filter-icon {
  margin-left: 10px;
  cursor: pointer;
}

.transaction-list {
  padding: 15px;
  width: 100%; /* 전체 폭 사용 */
}

.transaction-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc; /* 가로줄 */
  padding: 10px 0; /* 위 아래 여백 */
  font-size: 10px; /* 폰트 크기 조정 */
}

.date-label {
  margin-right: 5px; /* 날짜와 이름 사이의 간격 조정 */ 
}

.name {
  font-weight: bold; /* 이름 bold 처리 */
  font-size: 12px; /* 이름 폰트 크기 조정 */
}

.transaction-item .amount {
  margin-left: auto; /* amount를 오른쪽으로 밀어줌 */
  text-align: right; /* 우측 정렬 */
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.bank-name {
  margin-right: 5px;
  font-size: 12px; /* 폰트 크기 조정 */
}

.account-number {
  font-size: 12px; /* 계좌번호 폰트 크기 조정 */
}
</style>
