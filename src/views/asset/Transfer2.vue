<template>
  <div class="main-container">
    <Header />
    <div class="transfer-page">
      <div class="transfer-form">
        <label for="amount">
          <span class="point">얼마</span>를<br /> 보내겠습니까?
        </label>
        <input
          type="text"
          id="amount"
          :value="formattedInputAmount"
          placeholder="보낼 금액"
          @input="updateAmount"
          @keyup.enter="sendMoney"
        />
        
        <div class="amount-info">
          <span class="available-amount">이체 가능 금액</span>
          <span class="currency">{{ formattedAmount }} 원</span>
        </div>

        <button 
          type="button" 
          class="stroke-button" 
          @click="sendMoney"
        >
          송금하기
        </button>
      </div>
    </div>
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';
import Header from '../../components/Header.vue';
import apiClient from '../../api/axios';

export default {
  name: 'Transfer2',
  components: {
    FooterNav,
    Header,
  },
  data() {
    return {
      amount: '', // 원래는 숫자를 저장하는 변수
      availableAmount: 0, // 계좌 잔액을 저장할 데이터
    };
  },
  computed: {
    formattedAmount() {
      return this.availableAmount.toLocaleString(); // 천 단위로 콤마 표시
    },
    formattedInputAmount() {
      // 입력한 숫자를 천 단위로 포맷
      return this.amount ? this.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
    }
  },
  methods: {
    updateAmount(event) {
      // 입력값을 숫자로만 변환하고 저장
      this.amount = event.target.value.replace(/[^0-9]/g, '');
    },
    async sendMoney() {
      const amount = parseInt(this.amount);
      if (amount >= 1 && amount <= this.availableAmount) {
        // 여기에 송금 API 호출 로직을 추가하세요.
        this.$router.push({ path: '/transfer3' });
      } else {
        alert("송금하실 금액을 확인해주세요.");
      }
    },
    async fetchAccountBalance() {
      try {
        const response = await apiClient.get('/account/all');
        if (response.data.isSuccess) {
          // idx가 1인 계좌의 잔액 설정
          const account = response.data.result.accountList.find(acc => acc.idx === 1); // 여기서 idx 값 조정
          if (account) {
            this.availableAmount = account.amount; // 잔액 설정
          }
        }
      } catch (error) {
        console.error("계좌 잔액을 불러오는 중 오류가 발생했습니다:", error);
      }
    },
  },
  mounted() {
    this.fetchAccountBalance();
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

.amount-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 10px 0;
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
