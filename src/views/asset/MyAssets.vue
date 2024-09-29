<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <div class="my-assets">
      <h1>{{ userName }}님의 총 자산</h1>

      <!-- 계좌 총 합 -->
      <div class="total-assets">
        <span class="amount">{{ formatNumber(transactionAmount) }}원</span>
        <button class="analyze-button">분석</button>
      </div>

      <!-- 광고 배너 -->
      <div class="advertisement-banner">
        <div class="banner-content">
          <img src="/Users/hyuna/Desktop/teamirum/front/src/assets/images/kbpay.png" alt="광고 배너" class="banner-image" />
          <div class="banner-text">
            <p class="banner-title">KB Pay</p>
            <p class="banner-subtitle">편리한 국민 생활 파트너</p>
          </div>
        </div>
      </div>

      <!-- 위의 계좌 총 합과 동일한 값 return -->
      <div class="account">
        <span class="account-title">계좌</span>
        <span class="account-amount">{{ formatNumber(transactionAmount) }}원</span>
      </div>

      <!-- 입출금 섹션 -->
      <div class="withdraw-deposit-section">
        <!-- 입출금 내역 합 -->
        <div class="transactions">
          <span class="transactions-title">입출금</span>
          <span class="transactions-amount">{{ formatNumber(totalWithdrawDeposit) }}원</span>
        </div>

        <!-- 입출금 개별 통장 -->
        <div class="account-list">
          <div v-for="(account, index) in accounts" :key="index" class="account-card">
            <div class="account-info">
              <span class="transactions-title">입출금통장 {{ index + 1 }}</span>
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

      <!-- 예적금 섹션 -->
      <div class="savings-section">
        <!-- 예적금 내역 합 -->
        <div class="transactions savings">
          <span class="transactions-title">예적금</span>
          <span class="transactions-amount">{{ formatNumber(savingsAccount.balance) }}원</span>
        </div>

        <!-- 예적금 개별 통장 -->
        <div class="account-list">
          <div class="account-card">
            <div class="account-info">
              <span class="transactions-title">KB국민프리미엄적금</span>
              <span class="account-balance">{{ formatNumber(savingsAccount.balance) }}원</span>
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
        { balance: 1960112 },
        { balance: 5800 },
        { balance: 82400 },
      ],
      savingsAccount: {
        balance: 6000000, // 예적금 잔액
      },
    };
  },

  computed: {
    transactionAmount() {
      return this.accounts.reduce((total, account) => total + account.balance, 0) + this.savingsAccount.balance;
    },
    totalWithdrawDeposit() {
      return this.accounts.reduce((total, account) => total + account.balance, 0); // 입출금 통장 총합
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
.my-assets {
  padding: 20px 0;
  width: 100%;
  max-width: 300px;
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
  justify-content: space-between;
  margin-top: 10px;
}

.account-info {
  display: flex;
  flex-direction: column;
}

.account-balance {
  font-size: 12px;
}

.transfer-button-container {
  display: flex;
  align-items: center;
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
  align-items: center; /* 세로 정렬 */
}

.banner-image {
  width: 45px; /* 원하는 너비 */
  height: auto; /* 비율 유지 */
  margin-right: 10px; /* 텍스트와의 간격 */
}

.banner-text {
  text-align: left; /* 텍스트 왼쪽 정렬 */
}

.banner-title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.banner-subtitle {
  margin: 0;
  font-size: 12px; /* 폰트 크기 줄임 */
  font-weight: 300; /* 폰트 연하게 */
}
</style>
