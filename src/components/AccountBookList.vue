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

    <!-- 필터 창 -->
    <div v-if="showFilter" class="filter-dropdown">
      <div class="filter-option" v-for="category in categories" :key="category">
        <input type="checkbox" :id="category" />
        <label :for="category">{{ category }}</label>
      </div>
    </div>

    <!-- 날짜별 가계부 내역 표시 시작 -->
    <!-- 바뀐 부분: 날짜별로 가계부 내역을 표시 -->
    <div
      v-for="(entryGroup, index) in entries"
      :key="index"
      class="entry-group"
    >
      <div class="entry-header">
        <div class="date-section">
          <div class="date">{{ entryGroup.date }}</div>
          <div class="day">{{ entryGroup.day }}</div>
          <div class="year-month">{{ entryGroup.yearMonth }}</div>
        </div>
        <div
          class="total-amount"
          :class="entryGroup.totalAmount < 0 ? 'negative' : 'positive'"
        >
          {{ formatAmount(entryGroup.totalAmount) }}
        </div>
      </div>

      <div class="entry-details">
        <div
          v-for="(entry, index) in entryGroup.entries"
          :key="index"
          class="entry-item"
        >
          <div class="category">
            <div>{{ entry.category }}</div>
            <div>{{ entry.detail }}</div>
            <!-- 바뀐 부분: 세부 항목 표시 -->
          </div>
          <div class="payment">{{ entry.paymentMethod }}</div>
          <div class="time">{{ entry.time }}</div>
          <div
            class="amount"
            :class="entry.amount < 0 ? 'negative' : 'positive'"
          >
            {{ formatAmount(entry.amount) }}
          </div>
        </div>
      </div>
    </div>
    <!-- 날짜별 가계부 내역 표시 끝 -->
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
      showFilter: false, // 필터 창의 표시 상태
      categories: ["식비", "교통비", "의료비", "엔터테인먼트", "기타"], // 카테고리 리스트

      // 바뀐 부분: 가계부 내역
      entries: [
        {
          date: "19",
          day: "화요일",
          yearMonth: "2024.01",
          totalAmount: -27000,
          entries: [
            {
              category: "생활용품",
              detail: "주방/욕실",
              paymentMethod: "신한은행",
              time: "오후 2:42",
              amount: -30000,
            },
            {
              category: "부수입",
              detail: "",
              paymentMethod: "현금",
              time: "오후 1:42",
              amount: 3000,
            },
          ],
        },
        {
          date: "20",
          day: "수요일",
          yearMonth: "2024.01",
          totalAmount: -27000,
          entries: [
            {
              category: "생활용품",
              detail: "주방/욕실",
              paymentMethod: "신한은행",
              time: "오후 2:42",
              amount: -30000,
            },
            {
              category: "부수입",
              detail: "",
              paymentMethod: "현금",
              time: "오후 1:42",
              amount: 3000,
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter; // 필터 창 표시 여부 토글
      console.log("Filter toggle status: ", this.showFilter); // 상태가 토글되는지 확인
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
    // 바뀐 부분: 금액 포맷팅 함수
    formatAmount(amount) {
      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(amount);
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

.filter-dropdown {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  width: 200px;
  z-index: 100; /* 다른 요소보다 위에 표시되도록 설정 */
}

.filter-option {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.filter-option input {
  margin-right: 10px;
}

/* 바뀐 부분: 날짜별 가계부 내역 스타일 */
.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.date-section {
  display: flex;
  align-items: center;
}

.date {
  font-size: 2rem;
  font-weight: bold;
}

.day {
  font-size: 0.7rem;
  margin-left: 10px;
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
}

.year-month {
  margin-left: 10px;
  font-size: 0.8rem;
  color: #888;
}

.total-amount {
  margin-left: 200px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #ddd;
  display: inline-block; /* 글자 크기에 맞춰 사이즈 조정 */
}

.positive {
  color: #62d0ff;
}

.negative {
  color: #ee8282;
}

.entry-details {
  margin-top: 10px;
}

.entry-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.category {
  flex: 1;
  font-size: 0.8rem;
}

.payment {
  flex: 1;
  text-align: center;
  font-size: 0.8rem;
}

.time {
  flex: 1;
  text-align: center;
  font-size: 0.8rem;
}

.amount {
  flex: 1;
  text-align: right;
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
