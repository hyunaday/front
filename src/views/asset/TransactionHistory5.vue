<template>
  <div class="main-container">
    <Header />

    <div>
      <h1 class="title">계좌 조회</h1>
      <div class="container">
        <div class="transaction-details">
          <img :src="imageSrc" alt="Bank Logo" class="bank-logo" />
          <div class="account-info">
            <span class="bank-name">{{ bankName }}</span>
            <span class="account-number">{{ formattedAccountNumber }}</span>
            <img
              src="../../assets/images/copy.png"
              class="copy-icon"
              @click="copyAccountNumber"
              alt="Copy Account Number"
            />
          </div>
        </div>
        <div class="account-description">{{ accountDescription }}</div>
        <div class="amount-div" v-if="totalAmount !== null">
          {{ formattedAmount }}
        </div>

        <router-link to="/transfer">
          <div class="button-container">
            <button class="transfer-button">이체</button>
          </div>
        </router-link>
      </div>

      <div class="search-filter">
        <input
          type="text"
          class="search-input"
          @keyup.enter="performSearch"
          v-model="searchQuery"
          placeholder="거래 내역 검색"
        />
        <button class="filter-icon" @click="performSearch">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <div class="filter-icon">
          <i class="fa-solid fa-filter"></i>
        </div>
      </div>

      <!-- 거래 내역 목록 -->
      <div class="transaction-list">
        <div
          class="transaction-item"
          v-for="transaction in transactions"
          :key="transaction.idx"
        >
          <span class="date-label">{{ formatDate(transaction.createdAt) }}</span>
          <span class="name">{{ transaction.accountHolderName }}</span>
          <span class="amount">{{ formatTransactionAmount(transaction.amount) }}</span>
        </div>
      </div>
    </div>
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import apiClient from "../../api/axios.js";
import FooterNav from "../../components/FooterNav.vue";
import Header from "../../components/Header.vue";

export default {
  name: "TransactionHistory",
  components: {
    FooterNav,
    Header,
  },
  data() {
    return {
      imageSrc: "src/assets/images/kbbank.png",
      bankName: "국민은행",
      accountNumber: "1234567890", // 예시 계좌 번호, 실제 데이터로 업데이트 필요
      accountDescription: "국민은행 입출금 통장",
      searchQuery: "",
      transactions: [],
    };
  },
  computed: {
    formattedAccountNumber() {
      return this.accountNumber.toLocaleString();
    },
    totalAmount() {
      return this.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
    },
    formattedAmount() {
      return this.totalAmount.toLocaleString() + "원";
    },
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await apiClient.get("/account/all"); // API에서 계좌 데이터 가져오기
        if (response.data.isSuccess) {
          // idx가 5인 데이터만 필터링
          this.transactions = response.data.result.accountList.filter(transaction => transaction.idx === 5);
          
          if (this.transactions.length > 0) {
            this.bankName = this.transactions[0].bankName; // 은행 이름 설정
            this.accountNumber = this.transactions[0].accountNumber; // 계좌 번호 설정
            this.accountDescription = this.transactions[0].accountDescription; // 계좌 설명 설정
          } else {
            console.error("idx가 5인 거래 내역이 없습니다.");
          }
        } else {
          console.error("계좌 정보를 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    },
    copyAccountNumber() {
      navigator.clipboard
        .writeText(this.accountNumber)
        .then(() => {
          alert("계좌번호가 복사되었습니다.");
        })
        .catch((err) => {
          console.error("복사 실패:", err);
        });
    },
    performSearch() {
      if (this.searchQuery) {
        console.log(`검색어: ${this.searchQuery}`);
        // 여기서 검색 기능을 구현할 수 있어
      } else {
        console.log("검색어가 비어 있습니다.");
      }
    },
    formatTransactionAmount(amount) {
      const formattedAmount = Math.abs(amount).toLocaleString();
      return (amount < 0 ? "-" : "+") + formattedAmount + "원";
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  mounted() {
    this.fetchTransactions(); // 컴포넌트가 마운트될 때 거래 내역 가져오기
  },
};
</script>

<style scoped>
a {
  text-decoration: none; /* 링크의 밑줄 제거 */
}

.title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0;
}

.container {
  background-color: #6981d9;
  padding: 20px;
  width: 360px;
  color: white;
}

.transaction-details {
  display: flex;
  align-items: center;
}

.bank-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.account-info {
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
}

.copy-icon {
  margin-left: 5px;
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.account-description {
  font-size: 12px;
  margin-left: 40px;
}

.amount-div {
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.transfer-button {
  background-color: white;
  border: none;
  padding: 5px 30px;
  border-radius: 7px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.search-filter {
  display: flex;
  align-items: center;
  margin: 20px 13px;
}

.search-input {
  flex: 1;
  padding: 5px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #ccc;
}

.filter-icon {
  margin-left: 10px;
  cursor: pointer;
  display: flex; /* 아이콘이 중앙에 위치하도록 */
  align-items: center; /* 수직 정렬 */
}

.transaction-list {
  padding: 15px;
  width: 100%;
}

.transaction-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  font-size: 10px;
}

.date-label {
  margin-right: 5px;
}

.name {
  font-weight: bold;
  font-size: 12px;
}

.transaction-item .amount {
  margin-left: auto;
  text-align: right;
}

.bank-name {
  margin-right: 5px;
  font-size: 12px;
}

.account-number {
  font-size: 12px;
}
</style>
