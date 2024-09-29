<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <div class="my-assets">
      <h1>{{ userName }}님의 총 자산</h1>
      <div class="total-assets">
        <span class="amount">{{ formatNumber(totalAssets) }}원</span>
        <button class="analyze-button">분석</button>
      </div>
      
      <div class="account">
        <span class="account-title">계좌</span>
        <span class="account-amount">{{ formatNumber(totalAssets) }}원</span>
      </div>
      
      <div class="transactions-summary">
        <div class="transactions">
          <span class="transactions-title">입출금</span>
          <span class="transactions-amount">{{ formatNumber(transactionAmount) }}원</span>
        </div>
        
        <div class="account-list">
          <div v-for="(account, index) in accounts" :key="index" class="account-card">
            <div class="account-info">
              <span class="transactions-title">입출금통장</span>
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

      <div class="transactions-summary">
        <div class="transactions">
          <span class="transactions-title">예적금</span>
          <span class="transactions-amount">{{ formatNumber(transactionAmount) }}원</span>
        </div>
        
        <div class="account-list">
          <div v-for="(account, index) in accounts" :key="index" class="account-card">
            <div class="account-info">
              <span class="transactions-title">적금</span>
              <span class="account-balance">{{ formatNumber(account.balance) }}원</span>
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
      totalAssets: 8028652,
      accounts: [
        { balance: 1160112 },
        { balance: 3800 },
        { balance: 28400 },
      ]
    };
  },

  computed: {
    transactionAmount() {
      return this.accounts.reduce((total, account) => total + account.balance, 0);
    }
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString();
    }
  }
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

.transactions-summary {
  margin-top: 10px; /* 섹션 간격 조정 */
}

.transactions {
  font-size: 12px;
  color: #b0b0b0;
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
  margin-top: 10px; /* 리스트와 간격 조정 */
}

.account-card {
  display: flex;
  justify-content: space-between; /* 두 요소 간격 조정 */
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
  align-items: center; /* 수직 정렬 */
}

.transfer-button {
  background-color: #6981d9;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 10px;
  font-size: 12px;
}
</style>
