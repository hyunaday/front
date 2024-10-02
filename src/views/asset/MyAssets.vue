<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <div class="my-assets">
      <h1><strong>{{ userName }}</strong>님의 총 자산</h1>

      <div class="total-assets">
        <span class="amount">{{ formatNumber(transactionAmount) }}원</span>
        <button class="analyze-button">분석</button>
      </div>
      <div class="advertisement-banner">
        <div class="banner-content">
          <img src="../../assets/images/kbpay.png" alt="광고 배너" class="banner-image" />
          <div class="banner-text">
            <p class="banner-title">KB Pay</p>
            <p class="banner-subtitle">편리한 국민 생활 파트너</p>
          </div>
        </div>
      </div>

      <div class="account">
        <span class="account-title">계좌</span>
        <span class="account-amount">{{ formatNumber(totalAccountBalance) }}원</span>
      </div>
      <div class="withdraw-deposit-section">
        <div class="transactions">
          <span class="transactions-title">입출금</span>
          <span class="transactions-amount">{{ formatNumber(totalWithdrawDeposit) }}원</span>
        </div>

        <div class="account-list">
          <div v-for="(account, index) in accounts" :key="index" class="account-card">
            <img :src="account.image" alt="입출금통장 아이콘" class="account-icon" />
            <div class="account-info">
              <span class="transactions-title">{{ account.name }}</span>
              <span class="account-balance">{{ formatNumber(account.balance) }}원</span>
            </div>
            <div class="transfer-button-container">
              <router-link to="/transfer">
                <button class="transfer-button">송금</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="savings-section">
        <div class="transactions savings">
          <span class="transactions-title">예적금</span>
          <span class="transactions-amount">{{ formatNumber(savingsAccount.balance) }}원</span>
        </div>

        <div class="account-list">
          <div class="account-card">
            <div class="account-info">
              <span class="transactions-title">KB국민프리미엄적금</span>
              <span class="account-balance">{{ formatNumber(savingsAccount.balance) }}원</span>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div class="credit-card-section">
        <span class="account-title">카드</span>
      </div>

      <div>
        <div class="transactions">
          <span class="transactions-title">신용카드</span>
        </div>

        <div class="account-list">
          <div v-for="(card, index) in creditCards" :key="index" class="account-card">
            <img :src="card.image" alt="신용카드 아이콘" class="account-icon" />
            <div class="account-info">
              <span class="transactions-title">{{ card.name }}</span>
              <span class="account-balance credit-card-balance">{{ formatNumber(card.balance) }}원</span>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div class="loan-section">
        <span class="account-title">대출</span>
        <div class="account-list">
          <div class="account-card">
            <div class="account-info">
              <span class="transactions-title">주택담보대출</span>
              <span class="account-balance credit-card-balance">{{ `${formatNumber(loanAmount)}` }}원</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';

export default {
  name: 'MyAssets',
  components: {
    FooterNav,
  },
  data() {
    return {
      userName: '조현아',
      accounts: [
        { name: 'KB국민은행', balance: 1960112, image: '../src/assets/images/kbbank.png' },
        { name: '카카오뱅크', balance: 5800, image: '../src/assets/images/kakaobank.png' },
        { name: '우리은행', balance: 82400, image: '../src/assets/images/wooribank.png' },
      ],
      savingsAccount: {
        balance: 6000000,
      },
      creditCards: [
        { name: 'KB알파원', balance: 150000, image: '../src/assets/images/KB카드알파원.png' },
        { name: 'KB청춘대로 톡톡', balance: 100000000, image: '../src/assets/images/KB카드청춘대로톡톡.png' },
        { name: '현대 네이버페이', balance: 1385290000, image: '../src/assets/images/현대카드네이버페이.png' },
      ],
      loanAmount: 480000000,
    };
  },

  computed: {
    totalAccountBalance() {
      return this.accounts.reduce((total, account) => total + account.balance, 0) + this.savingsAccount.balance;
    },
    transactionAmount() {
      return this.totalAccountBalance;
    },
    totalWithdrawDeposit() {
      return this.accounts.reduce((total, account) => total + account.balance, 0);
    }
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString();
    },
  },
}
</script>

<style scoped>
.main-container {
  position: relative; /* 전체 컨테이너 */
}

.my-assets {
  padding: 20px;
  width: 100%;
  max-width: 320px;
  overflow-y: auto; /* 세로 스크롤 추가 */
  max-height: 80vh; /* 최대 높이 설정 */
  position: absolute; /* 페이지 안에서의 위치 설정 */
  top: 0; /* 페이지 상단에 고정 */

   /* 스크롤바 숨기기 */
   scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.my-assets::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

h1 {
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 20px;
}

.total-assets {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.amount {
  font-size: 28px;
  font-weight: bold;
}

.analyze-button {
  background-color: #6981d9;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 10px;
  font-size: 14px;
}

.account {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.account-title {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}

.account-amount {
  font-size: 20px;
  text-align: right;
}

.transactions {
  font-size: 12px;
  color: #b0b0b0;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.transactions-title {
  font-size: 12px;
}

.transactions-amount {
  font-size: 12px;
  text-align: right;
}

.account-list {
  display: flex;
  flex-direction: column;
}

.account-card {
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: space-between; /* 좌우 정렬 */
  margin-top: 10px;
}

.account-info {
  display: flex;
  flex-direction: column;
  text-align: left; /* 좌측 정렬 */
  margin-left: 10px; /* 이미지와 텍스트 사이 여백 추가 */
}

.account-balance {
  font-size: 12px;
}

.credit-card-balance::before {
  content: '- ';
}

.transfer-button-container {
  display: flex;
  align-items: center;
  margin-left: auto; /* 버튼을 오른쪽으로 정렬 */
}

.transfer-button {
  background-color: #6981d9;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 10px;
  font-size: 12px;
}

.withdraw-deposit-section {
  margin-bottom: 40px;
}

.advertisement-banner {
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 5px;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.banner-content {
  display: flex;
  align-items: center;
}

.banner-image {
  width: 45px;
  height: auto;
  margin-right: 10px;
}

.banner-text {
  text-align: left;
}

.banner-title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.banner-subtitle {
  margin: 0;
  font-size: 12px;
  font-weight: 300;
}

.loan-section {
  margin-top: 20px;
}

.account-icon {
  width: 40px; /* 가로 크기 설정 */
  height: 40px; /* 세로 크기 설정 */
  object-fit: contain; /* 비율을 유지하며 크기 조정 */
}
</style>
