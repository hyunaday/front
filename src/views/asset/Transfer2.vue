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
          <span class="currency">{{ formattedAvailableAmount }} 원</span>
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
import { useTransferStore } from "../../stores/TransferStore.js";

export default {
  name: 'Transfer2',
  components: {
    FooterNav,
    Header,
  },
  setup() {
    const transferStore = useTransferStore();
    return { transferStore };
  },
  computed: {
    formattedAvailableAmount() {
      return this.transferStore.availableAmount.toLocaleString();
    },
    formattedInputAmount() {
      return this.transferStore.transferAmount
        ? this.transferStore.transferAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : '';
    }
  },
  methods: {
    updateAmount(event) {
      const amount = event.target.value.replace(/[^0-9]/g, '');
      this.transferStore.setTransferAmount(parseInt(amount) || 0);
    },
    async sendMoney() {
      const amount = this.transferStore.transferAmount;
      const fromAccountNumber = this.transferStore.selectedAccount.accountNumber;
      const toAccountNumber = this.transferStore.recipient;
      
      if (amount >= 1 && amount <= this.transferStore.availableAmount) {
        try {
          const response = await apiClient.post('/account/sendAccount', {
            fromAccountNumber: fromAccountNumber,
            toAccountNumber: toAccountNumber,
            amount: amount,
            name: '이체' // 필요에 따라 변경 가능합니다.
          });

          if (response.data.isSuccess) {
            this.$router.push('/transfer3');
          } else {
            alert("송금에 실패했습니다. 다시 시도해주세요.");
          }
        } catch (error) {
          console.error("송금 요청 중 오류 발생:", error);
          alert("송금 중 오류가 발생했습니다.");
        }
      } else {
        alert("잔액이 부족합니다.");
      }
    }
  },
  mounted() {
    this.transferStore.fetchAccountBalance(this.transferStore.selectedAccount?.idx);
  }
}
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