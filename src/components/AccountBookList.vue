<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <div class="custom-select">
        <select v-model="selectedYear" @change="updateCalendar">
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div class="custom-select">
        <select v-model="selectedMonth" @change="updateCalendar">
          <option v-for="(month, index) in months" :key="index" :value="index">
            {{ month }}
          </option>
        </select>
      </div>
    </div>

    <!-- 검색창 추가 -->
    <div class="search-bar">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        class="search-input"
      />
    </div>

    <!-- 편집, 삭제, 필터 버튼 추가 -->
    <div class="button-container">
      <button class="edit-btn">편집</button>
      <button class="delete-btn">삭제</button>
      <i class="fa-solid fa-filter filter-icon" @click="toggleFilter"></i>
    </div>

    <!-- 필터 옵션 토글 -->
    <div v-if="showFilter" class="filter-options">
      <!-- 입/출금 체크박스 섹션 -->
      <div class="filter-section">
        <strong>입/출금</strong>
        <div>
          <input type="checkbox" id="income" v-model="filterOptions.income" />
          <label for="income">입금</label>
          <input type="checkbox" id="expense" v-model="filterOptions.expense" />
          <label for="expense">출금</label>
        </div>
      </div>

      <!-- 카테고리 체크박스 섹션 -->
      <div class="filter-section">
        <strong>카테고리</strong>
        <div class="categories">
          <div>
            <input type="checkbox" id="food" v-model="filterOptions.food" />
            <label for="food">식비</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="transport"
              v-model="filterOptions.transport"
            />
            <label for="transport">교통</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="shopping"
              v-model="filterOptions.shopping"
            />
            <label for="shopping">쇼핑</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="culture"
              v-model="filterOptions.culture"
            />
            <label for="culture">문화</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="housing"
              v-model="filterOptions.housing"
            />
            <label for="housing">주거/통신</label>
          </div>
          <div>
            <input type="checkbox" id="etc" v-model="filterOptions.etc" />
            <label for="etc">기타</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      years: this.generateYears(),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      calendar: [],
      data: {}, // 날짜별 데이터를 저장하는 객체
      showFilter: false, // 필터 버튼 클릭 시 필터 메뉴 표시 여부
      filterOptions: {
        income: false, // 입금 필터
        expense: false, // 출금 필터
        food: false, // 카테고리: 식비
        transport: false, // 카테고리: 교통
        shopping: false, // 카테고리: 쇼핑
        culture: false, // 카테고리: 문화
        housing: false, // 카테고리: 주거/통신
        etc: false, // 카테고리: 기타
      },
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        years.push(year);
      }
      return years;
    },
    updateCalendar() {
      const year = this.selectedYear;
      const month = this.selectedMonth;
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const weeks = [];
      let week = [];
      for (let i = 0; i < firstDay; i++) {
        week.push({ day: "", data: {} });
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${year}-${String(month + 1).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")}`;
        week.push({ day, data: this.data[dateString] || {} });
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      while (week.length < 7) {
        week.push({ day: "", data: {} });
      }
      if (week.length) {
        weeks.push(week);
      }
      this.calendar = weeks;
    },
  },
};
</script>

<style scoped>
.calendar-container {
  text-align: center;
  font-family: "Poppins", sans-serif;
}

.calendar {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 15px;
  padding: 0 15px;
}

h1 {
  font-size: 1.5rem;
}

.calendar-header {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.custom-select {
  position: relative;
  display: inline-block;
}

.custom-select select {
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 5px;
  border: none;
  background: transparent;
  font-family: "Poppins", sans-serif;
}

.financial-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 1.2rem;
  margin: 1rem 0;
}

.expense,
.income {
  color: black;
  font-size: 1rem;
}

.expense-amount {
  color: #ee8282;
}

.income-amount {
  color: #62d0ff;
}

/* 검색창 스타일 추가 */
.search-bar {
  margin: 1rem 0;
  text-align: center; /* 중앙 정렬 */
}

.search-input {
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 100%;
  height: 35px;
  max-width: 300px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  table-layout: fixed;
}

th,
td {
  width: 14.28%;
  height: 30px;
  padding: 5px;
  line-height: 1.2;
  border: none;
  vertical-align: top;
}

th {
  color: black;
  font-weight: bold;
}

thead tr {
  border-bottom: 1px solid #cfcbcb;
  height: 40px;
}

.day-cell {
  font-size: 1rem;
  text-align: center;
  vertical-align: top;
  padding: 10px;
  height: 60px;
}

.day-number {
  font-weight: bold;
  color: #444;
}

.day-data {
  font-size: 0.8rem;
  margin-top: 5px;
  color: #666;
}

/* 버튼 컨테이너 스타일 - 오른쪽 정렬 */
.button-container {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽에 정렬 */
  gap: 5px; /* 버튼 간 간격을 좁게 설정 */
}

button {
  background-color: #e0e0e0;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

button:hover {
  background-color: #bdbdbd; /* 마우스 호버 시 색상 변경 */
}

.edit-btn {
  background-color: #d9d9d9; /* 편집 버튼 배경색 */
}

.delete-btn {
  background-color: #d9d9d9; /* 삭제 버튼 배경색 */
}

.filter-icon {
  font-size: 16px;
  color: #bdbdbd;
  margin-left: 5px; /* 필터 아이콘과 삭제 버튼 간 간격 */
  cursor: pointer;
}

.filter-icon:hover {
  color: #888; /* 필터 아이콘 호버 시 색상 변경 */
}
</style>
