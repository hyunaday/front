<template>
  <div class="main-container">
    <Header />
    <div class="complete-page">
      <div class="Cards-icon">
        <div class="circle-background">
          <h1 class="amount">{{ formatNumber(amount) }}원</h1>
          <h2 class="status">송금 완료</h2>
        </div>
      </div>
      <div class="details-container">
        <div class="details-label">
          <p><strong>받는 분:</strong></p>
          <p><strong>날짜:</strong></p>
        </div>
        <div class="details-value">
          <p>{{ recipient }}</p>
          <p>{{ date }}</p>
        </div>
      </div>
      <div class="button-container">
        <button class="stroke-button" @click="showConfirmModal = true">확인</button>
      </div>
    </div>

    <!-- 송금 확인 모달 -->
    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal-content">
        <p>계속 송금하시겠습니까?</p>
        <button @click="confirmTransfer" class="confirm-button">추가 송금하기</button>
        <button @click="goToHomePage" class="cancel-button">홈으로</button>
      </div>
    </div>

    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import FooterNav from "../../components/FooterNav.vue";
import Header from "../../components/Header.vue";
import { useTransferStore } from "../../stores/TransferStore.js";

export default {
  name: "Transfer3",
  components: {
    FooterNav,
    Header,
  },
  setup() {
    const transferStore = useTransferStore();
    return { transferStore };
  },
  computed: {
    amount() {
      return this.transferStore.transferAmount;
    },
    recipient() {
      return this.transferStore.recipient;
    },
  },
  data() {
    return {
      showConfirmModal: false,
      date: "",
    };
  },
  mounted() {
    this.date = this.getCurrentDate();
  },
  methods: {
    goToGroupPayPage() {
      this.$router.push("/grouppay");
    },
    confirmTransfer() {
      console.log("송금이 완료되었습니다.");
      this.showConfirmModal = false;
      this.$router.push("/transfer");
    },
    goToHomePage() {
      this.showConfirmModal = false;
      this.$router.push("/");
    },
    getCurrentDate() {
      const now = new Date();
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      return now
        .toLocaleString("ko-KR", options)
        .replace(",", "")
        .replace(/\//g, "-");
    },
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style scoped>
.complete-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  margin-top: 30px;
}

.Cards-icon {
  margin-bottom: 20px;
}

.circle-background {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #6981d9;
  border: 4px solid #71d785;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: glowing 2s infinite alternate;
  padding: 20px;
}

.amount {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 5px 0;
}

.status {
  font-size: 18px;
  color: #ffffff;
}

@keyframes glowing {
  0% {
    box-shadow: 0 0 10px #71d785, 0 0 20px #71d785, 0 0 30px #71d785;
  }
  100% {
    box-shadow: 0 0 30px #71d785, 0 0 40px #71d785, 0 0 50px #71d785;
  }
}

.details-container {
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  width: 100%; /* 전체 너비 사용 */
  margin-top: 100px; /* 버튼과의 여백 */
}

.details-label,
.details-value {
  text-align: left; /* 기본적으로 왼쪽 정렬 */
}

.details-value {
  text-align: right; /* 값은 오른쪽 정렬 */
}

.button-container {
  display: flex;
  justify-content: center; /* 버튼 중앙 정렬 */
  margin-top: 20px;
}

.stroke-button {
  background-color: #6981d9;
  color: white;
  border: 2px solid #6981d9;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  width: 260px;
  transition: background-color 0.3s, color 0.3s;
}

.stroke-button:hover {
  background-color: white;
  color: #6981d9;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
}

.confirm-button,
.cancel-button {
  margin: 5px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.confirm-button {
  background-color: #98b6ef;
  color: white;
}

.cancel-button {
  background-color: #6981d9;
  color: white;
}
</style>
