<template>
  <div class="main-container">
    <Header />
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
            <!-- img 자동 출력 : api로 받아온 은행에 따라 동적으로 출력 -->
            <img :src="bankLogos[account.name]" alt="입출금통장 아이콘" class="account-icon" />
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
            <img src="../../assets/images/kbbank.png" alt="적금 아이콘" class="account-icon" />
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
          <div v-for="(creditCard, index) in creditCards" :key="index" class="account-card">
            <img :src="creditCard.image" alt="신용카드 아이콘" class="account-icon" />
            <div class="account-info">
              <span class="transactions-title">{{ creditCard.name }}</span>
              <span class="account-balance credit-card-balance">{{ formatNumber(creditCard.amount_sum) }}원</span>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div class="loan-section">
        <span class="account-title">대출</span>
        <div class="account-list">
          <div class="account-card">
            <img src="../../assets/images/kbbank.png" alt="주택담보대출 아이콘" class="account-icon" />
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
import apiClient from '../../api/axios.js';  // axios 클라이언트 불러오기
import Header from '../../components/Header.vue';
import kbbankLogo from "../../assets/images/kbbank.png";
import shinhanLogo from "../../assets/images/shinhan.png";
import kakaobankLogo from "../../assets/images/kakaobank.png";
import hanabankLogo from "../../assets/images/hanabank.png";
import ibkbankLogo from "../../assets/images/IBKbank.png";
import wooriLogo from "../../assets/images/wooribank.png";
import tossLogo from "../../assets/images/toss.png";
import nhLogo from "../../assets/images/NHbank.png";
import copyIcon from "../../assets/images/copy.png";

export default {
  name: 'MyAssets',
  components: {
    FooterNav,
    Header,
  },
  data() {
    return {
      userName: '조현아',
      accounts: [],
      savingsAccount: {
        balance: 6000000,
      },
      creditCards: [],
      loanAmount: 480000000,
      bankLogos: {
        국민은행: kbbankLogo,
        신한은행: shinhanLogo,
        카카오뱅크: kakaobankLogo,
        하나은행: hanabankLogo,
        우리은행: wooriLogo,
        IBK기업은행: ibkbankLogo,
        토스은행: tossLogo,
        농협은행: nhLogo,
      },
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
    goToGroupPayPage() {
      this.$router.push("/grouppay");
    },
    formatNumber(num) {
      return num.toLocaleString();
    },
    async fetchAccounts() {
      try {
        const response = await apiClient.get('/account/all');
        
        if (response.data.isSuccess && response.data.result && response.data.result.accountList) {
          this.accounts = response.data.result.accountList.map(account => ({
            name: account.bankName,
            balance: account.amount,
            image: '../src/assets/images/default-account.png',
          }));
        } else {
          console.error('응답 데이터에서 계좌 정보를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('계좌 데이터를 불러오는 중 오류가 발생했습니다:', error);
      }
    },
    async fetchCreditCards() {
      try {
        const response = await apiClient.get(`/credit/all`);
        
        if (response.data.isSuccess && response.data.result && response.data.result.creditList) {
          this.creditCards = response.data.result.creditList.map(card => ({
            name: card.creditName,
            amount_sum: card.amountSum,
            image: card.imgUrl || '../src/assets/images/default-card.png',
          }));
        } else {
          console.error('응답 데이터에서 신용카드 정보를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('신용카드 데이터를 불러오는 중 오류가 발생했습니다:', error);
      }
    }
  },

  created() {
    this.fetchAccounts();
    this.fetchCreditCards();
  }
};
</script>

<style scoped>
.my-assets {
  margin-top: 70px;
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
  text-align: left;
  font-weight: bold; 
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
  text-align: right;

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

.banner-image {
  width: 50px;
  height: 50px;
}
.banner-content {
  margin-top: 20px;
  display: flex;
  align-items: center;
  background-color: #e3e3e39f;
  border-radius: 10px; /* 둥근 테두리 추가 */
  padding: 10px; /* 내용물에 여백 추가 */
}


.banner-text {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.banner-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0; /* margin-bottom 제거 */
}

.banner-subtitle {
  font-size: 12px;
  color: #777;
  margin: 0;
}

hr {
  margin: 20px 0;
}

.account-icon {
  width: 40px;
  height: 40px;
  object-fit: cover; /* 이미지를 비율에 맞춰서 자름 */
  border-radius: 50%; /* 이미지를 동그랗게 만듦 */
  margin-right: 10px; /* 이미지와 텍스트 사이 간격 추가 */
}
</style>
