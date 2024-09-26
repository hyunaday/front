<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <div class="account-view">
      <h1>내 계좌</h1>
      <div v-if="error">데이터를 불러오는 데 문제가 발생했습니다.</div>
      <div v-if="accounts.length > 0">
        <div class="account-list">
          <div
            class="account"
            v-for="(account, index) in accounts"
            :key="account.idx"
            :style="{ backgroundColor: index % 2 === 0 ? '#6981D9' : '#98B6EF' }"
          >
            <div class="account-info">
              <h2 class="bank-name">{{ account.bankName }}</h2>
              <p class="account-number">{{ formatAccountNumber(account.number) }}</p>
            </div>
            <p class="balance">{{ formatBalance(account.balance) }} 원</p>
            <font-awesome-icon 
              :icon="['fas', 'trash-can']" 
              class="delete-button" 
              @click="confirmDeleteAccount(account.idx)" 
            />
          </div>
        </div>
      </div>
    </div>

    <FooterNav />
    <div class="navbar">
      <router-link to="/" class="nav-item" exact-active-class="active">
        <i class="fas fa-home"></i>
        <span>홈</span>
      </router-link>

      <router-link to="/myassets" class="nav-item" exact-active-class="active">
        <i class="fas fa-wallet"></i>
        <span>내 자산</span>
      </router-link>

      <router-link to="/accountaddlist" class="pay-btn" exact-active-class="active">
        <i class="fa-solid fa-plus"></i>
        <span></span>
      </router-link>

      <router-link to="/accountbook" class="nav-item" exact-active-class="active">
        <i class="fas fa-book"></i>
        <span>가계부</span>
      </router-link>

      <router-link to="/businesscard" class="nav-item" exact-active-class="active">
        <i class="fas fa-id-card"></i>
        <span>전자 명함</span>
      </router-link>
    </div>
  </div>
</template>




 <script>
import FooterNav from '../components/FooterNav.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashCan);

export default {
  name: "Accounts",
  components: {
    FooterNav,
    FontAwesomeIcon,
  },
  data() {
    return {
      accounts: [
        {
          idx: 1,
          bankName: '국민은행',
          number: '12345678909876',
          balance: 1000000,
        },
        {
          idx: 2,
          bankName: '신한은행',
          number: '98765432109876',
          balance: 2500000,
        },
      ],
      error: false,
    };
  },
  created() {
    // Axios 요청 부분 주석 처리
    // this.fetchAccounts();
  },
  methods: {
    confirmDeleteAccount(idx) {
      if (confirm("정말 삭제하겠습니까?")) {
        this.deleteAccount(idx);
      }
    },
    async deleteAccount(idx) {
      this.accounts = this.accounts.filter(account => account.idx !== idx);
    },
    formatAccountNumber(number) {
      return `${number.slice(0, 3)}-${number.slice(3, 9)}-${number.slice(9)}`;
    },
    formatBalance(balance) {
      return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리마다 쉼표 추가
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center; /* 가운데 정렬 */
  margin: 30px;
}

.account-view {
  max-width: 600px;
  padding: 20px;
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.account {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-radius: 20px;
  padding: 15px 20px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  height: 80px;
  position: relative;
  width: 280px;
}

.account:hover {
  transform: scale(1.05);
}

.account-info {
  display: flex;
  flex-direction: column;
}

.bank-name {
  font-size: 12px;
  margin: 0;
}

.account-number {
  font-size: 10px;
  margin: 2px 0;
}

.balance {
  font-size: 12px;
}

.delete-button {
  cursor: pointer;
  color: white;
  font-size: 10px; /* 아이콘 크기 조정 */
  position: absolute; /* 절대 위치로 설정 */
  top: 10px; /* 상단에서의 위치 */
  right: 10px; /* 오른쪽에서의 위치 */
}

.delete-button:hover {
  color: #ffcccc;
}

/* 네비게이션 바 스타일 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: white;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  max-width: 360px;
  width: 100%;
}

/* 네비게이션 아이템 스타일 */
.navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #555;
  flex: 1;
}

/* 네비게이션 아이템 아이콘 스타일 */
.navbar .nav-item i {
  font-size: 24px;
  margin-bottom: 5px;
}

/* 결제 버튼 스타일 */
.pay-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 65px;
  height: 65px;
  background-color: #7189ff;
  border-radius: 50%;
  color: white;
  font-size: 50px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center; /* 글자 가운데 정렬 */
}

/* 활성화된 네비게이션 아이템 스타일 */
.navbar .nav-item.active {
  color: #7189ff; /* 텍스트 색상 변경 */
  font-weight: bold; /* 강조를 위해 볼드체로 */
}

/* 내 자산과 가계부 사이의 간격 조정을 위해 flex-grow 사용 */
.nav-item:nth-child(4) {
  flex-grow: 1.7; /* 가계부의 여유 공간을 살짝 늘림 */
}

.nav-item:nth-child(2) {
  flex-grow: 1.7; /* 내 자산의 여유 공간을 살짝 늘림 */
}
.navbar .nav-item.active i {
  color: #7189ff; /* 아이콘 색상 변경 */
}
</style>
