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
import { useAccountStore } from '../../stores/accountStore';
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'Transfer',
  components: {
    FooterNav,
    Header,
  },
  setup() {
    const accountStore = useAccountStore();
    const amount = ref(''); // 송금할 금액을 저장하는 반응형 변수

    // 사용 가능한 금액을 포맷하여 반환
    const formattedAmount = computed(() => {
      return accountStore.availableAmount.toLocaleString();
    });

    // 입력 금액을 포맷하여 반환
    const formattedInputAmount = computed(() => {
      return amount.value ? amount.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
    });

    // 금액을 업데이트하는 메서드
    const updateAmount = (event) => {
      amount.value = event.target.value.replace(/[^0-9]/g, ''); // 숫자만 남김
    };

    // 송금 메서드
    const sendMoney = async () => {
      const parsedAmount = parseInt(amount.value);
      if (parsedAmount >= 1 && parsedAmount <= accountStore.availableAmount) {
        // 송금 API 호출 로직 추가
        await apiClient.post('/account/sendAccount', { toAccountNumber: accountStore.accountIdx, amount: parsedAmount }); // 예시 API 호출
        this.$router.push({ path: '/transfer3' });
      } else {
        alert("송금하실 금액을 확인해주세요.");
      }
    };

    // 계좌 잔액을 가져오는 메서드
    const fetchAccountBalance = async () => {
      try {
        const response = await apiClient.get('/account/all');
        if (response.data.isSuccess) {
          const account = response.data.result.accountList.find(acc => acc.idx === parseInt(this.$route.params.idx));
          if (account) {
            accountStore.setAvailableAmount(account.amount); // 사용 가능한 금액 설정
            accountStore.setAccountIdx(account.idx); // 계좌 인덱스 설정
          }
        }
      } catch (error) {
        console.error("계좌 잔액을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    onMounted(() => {
      fetchAccountBalance(); // 컴포넌트가 마운트될 때 계좌 잔액을 가져옴
    });

    return { 
      amount,
      formattedAmount, 
      formattedInputAmount, 
      updateAmount, 
      sendMoney 
    };
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
