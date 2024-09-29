<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <div class="my-assets" v-if="!loading">
      <h1>{{ userName }}님의 총 자산</h1>
      <div class="total-assets">
        <span class="amount">{{ formatNumber(totalAssets) }}원</span>
        <button class="analyze-button">분석</button>
      </div>
      
      <div class="account">
        <span class="account-title">계좌</span>
        <span class="account-amount">{{ formatNumber(totalAssets) }}원</span>
      </div>
      
      <div class="transactions">
        <span class="transactions-title">입출금</span>
        <span class="transactions-amount">{{ formatNumber(transactionAmount) }}원</span>
      </div>
      
      <div class="account-list">
        <div v-for="(account, index) in accounts" :key="index" class="account-card">
          <span class="account-balance">{{ formatNumber(account.balance) }}원</span>
          <router-link to="/transfer">
            <button class="transfer-button">송금</button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <p>로딩 중...</p>
    </div>
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';
import axios from 'axios';

export default {
  name: 'MyAssets',
  components: {
    FooterNav,
  },
  data() {
    return {
      userName: '',
      totalAssets: 0,
      transactionAmount: 0,
      accounts: [],
      loading: true,
    };
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString();
    },
    async fetchData() {
      try {
        const response = await axios.get('https://your-api-endpoint.com/assets');
        this.userName = response.data.userName;
        this.totalAssets = response.data.totalAssets;
        this.transactionAmount = response.data.transactionAmount;
        this.accounts = response.data.accounts;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>




<style scoped>
.my-assets {
  padding: 20px 0;  /* 상하 20px 패딩, 좌우 0px */
  width: 100%;      /* 가로 크기 100% */
  max-width: 300px; /* 최대 가로 크기 300px */
}

h1 {
  font-size: 16px;  /* h1 크기 작게 설정 */
  font-weight: normal; /* 기본 두께로 설정 */
  margin-bottom: 20px; /* 아래 여백 추가 */
}

.total-assets {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 양쪽 정렬 */
}

.amount {
  font-size: 28px; /* 가장 큰 폰트 */
  font-weight: bold;
}

.analyze-button {
  background-color: #6981d9;
  color: white;
  border: none;
  padding: 5px 15px;  /* 버튼 크기 조정 */
  border-radius: 10px;
  font-size: 14px;  /* 폰트 크기 조정 */
}

.account {
  display: flex;
  justify-content: space-between; /* 양쪽 정렬 */
  margin-top: 20px;
}

.account-title {
  font-size: 20px; /* 두 번째로 큰 폰트 */
  font-weight: bold; /* 굵게 표시 */
  text-align: left; /* 왼쪽 정렬 */
}

.account-amount {
  font-size: 20px; /* 같은 크기의 폰트 */
  text-align: right; /* 오른쪽 정렬 */
}

.transactions {
  font-size: 12px; /* 작게 표시 */
  color: #b0b0b0;
  margin-top: 10px;
  display: flex;
  justify-content: space-between; /* 양쪽 정렬 */
}

.transactions-title {
  font-size: 12px; /* 작게 표시 */
}

.transactions-amount {
  font-size: 12px; /* 작게 표시 */
  text-align: right; /* 오른쪽 정렬 */
}

.account-list {
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
}

.account-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.account-balance {
  font-size: 12px; /* 작게 표시 */
}

.transfer-button {
  background-color: #6981d9;
  color: white;
  border: none;
  padding: 5px 15px;  /* 버튼 크기 조정 */
  border-radius: 10px;
  margin-left: 20px;
  font-size: 12px;  /* 작게 표시 */
}
</style>
