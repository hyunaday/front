<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <!-- 수입/지출 선택 탭 -->
    <div class="tabs">
      <button :class="{ active: isIncomeTab }" @click="isIncomeTab = true">
        수입
      </button>
      <button :class="{ active: !isIncomeTab }" @click="isIncomeTab = false">
        지출
      </button>
    </div>
    <br />
    <!-- 수입/지출 입력 폼 -->
    <form @submit.prevent="addEntry">
      <div class="form-group">
        <label for="date">날짜</label>
        <input type="date" id="date" v-model="date" required />
      </div>
      <div class="form-group">
        <label for="category">분류</label>
        <select id="category" v-model="category" required>
          <option v-if="isIncomeTab" value="" disabled>카테고리 선택</option>
          <option v-if="isIncomeTab" value="salary">급여</option>
          <option v-if="isIncomeTab" value="investment">이자</option>
          <option v-if="isIncomeTab" value="pinmoney">용돈</option>
          <option v-if="!isIncomeTab" value="" disabled>카테고리 선택</option>
          <option v-if="!isIncomeTab" value="food">식비</option>
          <option v-if="!isIncomeTab" value="transportation">교통</option>
          <option v-if="!isIncomeTab" value="shopping">쇼핑</option>
          <option v-if="!isIncomeTab" value="culture">문화생활</option>
          <option v-if="!isIncomeTab" value="home">주거/통신</option>
          <option v-if="!isIncomeTab" value="etc">기타</option>
        </select>
      </div>
      <div class="form-group">
        <label for="amount">금액</label>
        <input
          type="text"
          id="amount"
          v-model="formattedAmount"
          placeholder="금액을 입력하세요"
          @input="updateAmount"
          required
        />
      </div>
      <div class="form-group">
        <label for="desc">내용</label>
        <input
          type="text"
          id="desc"
          v-model="desc"
          placeholder="설명을 입력하세요"
          required
        />
      </div>
    </form>

    <div class="divider"></div>

    <div class="navbar">
      <router-link to="/" class="nav-item" exact-active-class="active">
        <i class="fas fa-home"></i>
        <span>홈</span>
      </router-link>
      <router-link to="/myassets" class="nav-item" exact-active-class="active">
        <i class="fas fa-wallet"></i>
        <span>내 자산</span>
      </router-link>

      <!-- 수기 작성 페이지로 이동 -->
      <router-link to="/addlist" class="pay-btn">
        <span>등록</span>
      </router-link>

      <router-link
        to="/accountbook"
        class="nav-item"
        exact-active-class="active"
      >
        <i class="fas fa-book"></i>
        <span>가계부</span>
      </router-link>
      <router-link
        to="/businesscard"
        class="nav-item"
        exact-active-class="active"
      >
        <i class="fas fa-id-card"></i>
        <span>전자 명함</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isIncomeTab: true,
      date: '',
      category: '',
      amount: '',
      formattedAmount: '',
      desc: '',
      incomes: [],
      expenses: [],
    };
  },
  methods: {
    updateAmount() {
      const num = this.formattedAmount.replace(/[^0-9]/g, '');
      this.amount = num;
      this.formattedAmount = num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    addEntry() {
      const newEntry = {
        id: Date.now(),
        date: this.date,
        category: this.category,
        amount: this.amount,
        desc: this.desc,
      };
      if (this.isIncomeTab) {
        this.incomes.push(newEntry);
      } else {
        this.expenses.push(newEntry);
      }
      this.date = '';
      this.category = '';
      this.amount = '';
      this.formattedAmount = '';
      this.desc = '';
    },
  },
};
</script>

<style scoped>
/* 링크의 기본 텍스트 장식 제거 */
a {
  text-decoration: none;
}

/* 메인 컨테이너 스타일 */
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background-color: white;
  overflow-y: auto;
  padding-top: 20px;
}

.tabs {
  margin-bottom: 10px;
}

/* 버튼 기본 스타일 */
.tabs button {
  padding: 1px 40px;
  border: none;
  background-color: #000000;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 140px;
  margin: 0 15px;
}

/* 활성화된 버튼 스타일 */
.tabs button.active {
  background-color: #6981d6;
  color: white;
}

/* 폼 그룹 스타일 */
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* 라벨 스타일 */
.form-group label {
  margin-right: -70px;
  flex: 0 0 100px;
  font-weight: bold;
  margin-top: 10px;
}

/* 입력 필드 스타일 */
input,
select {
  padding: 5px;
  margin-top: 10px;
  border: none;
  border-bottom: 2px solid #484848;
  border-radius: 0;
  outline: none;
  margin-left: 10px;
  margin-right: 70px;
  min-width: 260px;
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
  width: auto;
  min-width: 65px;
  height: 65px;
  background-color: #7189ff;
  border-radius: 32.5px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 활성화된 네비게이션 아이템 스타일 */
.navbar .nav-item.active {
  color: #7189ff;
  font-weight: bold;
}

.navbar .nav-item.active i {
  color: #7189ff; /* 아이콘 색상 변경 */
}

/* 내 자산과 가계부 사이의 간격 조정을 위해 flex-grow 사용 */
.nav-item:nth-child(4) {
  flex-grow: 1.7;
}

.nav-item:nth-child(2) {
  flex-grow: 1.7;
}
</style>
