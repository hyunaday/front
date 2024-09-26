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

    <!-- FooterNav 컴포넌트 사용 -->
    <FooterNav
      buttonText="등록"
      :iconClass="null"
      @button-click="handleRegister"
    />
  </div>
</template>

<script>
import FooterNav from "../components/FooterNav.vue";

export default {
  name: "MyAssets",
  components: {
    FooterNav,
  },
  data() {
    return {
      isIncomeTab: true,
      date: "",
      category: "",
      amount: "",
      formattedAmount: "",
      desc: "",
      incomes: [],
      expenses: [],
    };
  },
  methods: {
    updateAmount() {
      const num = this.formattedAmount.replace(/[^0-9]/g, "");
      this.amount = num;
      this.formattedAmount = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      this.date = "";
      this.category = "";
      this.amount = "";
      this.formattedAmount = "";
      this.desc = "";
    },
    handleRegister() {
      alert("등록 기능이 실행되었습니다!");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* 링크의 기본 텍스트 장식 제거 */
a {
  text-decoration: none;
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
</style>