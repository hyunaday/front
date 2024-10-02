<template>
  <div>
    <div class="main-container d-flex flex-column">
      <div class="header">
        <button @click="goBack" class="back-button">
          <i class="fas fa-chevron-left"></i>
        </button>
        <h2 class="title">결제확인</h2>
      </div>

      <div class="merchant-info">
        <h3 class="merchant-name">{{ merchantName }} 에서</h3>
        <h4 class="payment-amount">
          총
          <span class="amount">{{ paymentAmount.toLocaleString() }}</span
          >원
        </h4>
        <p class="payment-question">결제 하시겠습니까?</p>
      </div>

      <hr class="divider" />

      <div class="payment-details">
        <div
          class="payer-info"
          v-for="(name, index) in payerNames"
          :key="index"
        >
          <div class="profile-section">
            <div class="profile-icon">
              <img :src="getProfileIcon(index)" alt="Profile Icon" />
            </div>
            <div class="payer-name">{{ maskedPayerName(name) }}</div>
          </div>

          <div class="requested-amount">
            <input
              type="number"
              v-model.number="requestedAmounts[index]"
              @input="validateAmount"
              placeholder="수정할 금액을 입력하세요"
              class="amount-input"
            />
            <span>원</span>
          </div>
        </div>
      </div>

      <button
        @click="handleSplitByAmount"
        class="split-button"
        :disabled="!isAmountValid"
      >
        결제 요청하기
      </button>

      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
import profileIcon1 from '../../assets/images/profile1.png';
import profileIcon2 from '../../assets/images/profile2.png';
import profileIcon3 from '../../assets/images/profile3.png';
import profileIcon4 from '../../assets/images/profile4.png';
import profileIcon5 from '../../assets/images/profile5.png';

export default {
  data() {
    return {
      merchantName: 'KFC 군자능동점',
      paymentAmount: 95600,
      payerNames: ['공희진', '백도현', '서석현', '이동훈', '조현아'],
      requestedAmounts: Array(5).fill(Number((95600 / 5).toFixed(0))),
      isAmountValid: true,
    };
  },
  computed: {
    maskedPayerName() {
      return (name) => {
        if (name.length > 1) {
          return name.charAt(0) + '*' + name.charAt(name.length - 1);
        }
        return name;
      };
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getProfileIcon(index) {
      const profileIcons = [
        profileIcon1,
        profileIcon2,
        profileIcon3,
        profileIcon4,
        profileIcon5,
      ];
      return profileIcons[index];
    },
    validateAmount() {
      const totalRequestedAmount = this.requestedAmounts.reduce(
        (acc, amount) => acc + (Number(amount) || 0),
        0
      );
      this.isAmountValid = totalRequestedAmount === this.paymentAmount;
    },
    handleSplitByAmount() {
      const totalRequestedAmount = this.requestedAmounts.reduce(
        (acc, amount) => acc + Number(amount),
        0
      );

      if (totalRequestedAmount !== this.paymentAmount) {
        this.showErrorMessage('결제 금액이 맞지 않습니다. 다시 확인해주세요');
      } else {
        // 결제 요청하기 버튼 클릭 시 대기 화면으로 이동
        this.$router.push('/solopay');
      }
    },
    splitByAmount() {
      // 이 메서드는 PaymentWaiting.vue에서 호출되어야 하므로 비워두거나
      // PaymentWaiting.vue에서 결제 완료 후 호출하여 solopay로 이동
    },
    showErrorMessage(message) {
      // 사용자 친화적인 에러 메시지 UI 구현 (예: 모달 또는 toast)
      alert(message); // 단순 alert 대신 다른 UI로 대체할 수 있음
    },
  },
};
</script>

<style scoped>
.amount-input {
  width: 100px;
  padding: 5px;
  margin-right: 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  outline: none;
}
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  overflow: hidden;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  width: 100%;
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
.title {
  font-size: 18px;
  margin: 0;
  text-align: center;
}
.merchant-info {
  text-align: right;
  margin-top: 80px;
  margin-right: -90px;
  margin-bottom: -25px;
}
.merchant-name {
  font-size: 25px;
}
.payment-amount {
  font-size: 25px;
  margin: 5px 0;
}
.payment-question {
  font-size: 25px;
}
.divider {
  width: 100%;
  height: 2px;
  background-color: #ccc;
  margin: 10px 0;
}
.payment-details {
  width: 100%;
  padding: 0 10px;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 5px;
}
.payer-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.profile-icon {
  width: 35px;
  height: 35px;
  margin-bottom: 5px;
}

.profile-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.payer-name {
  font-size: 15px;
  font-weight: bold;
  color: #555;
  text-align: center;
}

.requested-amount {
  display: flex;
  align-items: center;
}

.split-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 20px;
}
.split-button:hover {
  background-color: #6981d9;
  color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
.spacer {
  flex-grow: 1;
}
.amount {
  color: #6981d9; /* 이 스타일은 여전히 여기서 사용할 수 있습니다. */
}
</style>
