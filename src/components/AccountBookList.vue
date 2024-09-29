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

    <!-- 월별 토탈 지출금액과 수입금액을 추가 -->
    <div class="monthly-summary">
      <div class="expense">
        지출 <span class="amount">{{ formatAmount(totalExpense) }}</span>
      </div>
      <div class="income">
        수입 <span class="amount">{{ formatAmount(totalIncome) }}</span>
      </div>
    </div>

    <!-- 검색창 추가 -->
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @keydown.enter="executeSearch"
        placeholder="검색어를 입력하세요"
        class="search-input"
      />
    </div>

    <!-- 편집, 삭제, 필터 버튼 추가 -->
    <div class="button-container">
      <button @click="toggleadd" class="add-btn">
        <i class="fa-solid fa-plus"></i>
      </button>
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
      v-for="(entryGroup, index) in filteredEntries"
      :key="index"
      class="entry-group"
    >
      <div class="entry-header">
        <div class="date-section">
          <div class="date">{{ entryGroup.date }}</div>
          <div class="day">{{ entryGroup.day }}</div>
          <div
            class="total-amount"
            :class="entryGroup.totalAmount < 0 ? 'negative' : 'positive'"
          >
            {{ formatAmount(entryGroup.totalAmount) }}
          </div>
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
          </div>
          <div class="payment">{{ entry.paymentMethod }}</div>
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
      searchQuery: "", // 검색어 저장 변수
      showFilter: false, // 필터 창 표시 여부를 위한 변수 추가
      finalQuery: "", // 엔터를 쳤을 때 실제 검색에 사용하는 검색어
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
      totalExpense: 90000, // 예시 값
      totalIncome: 1000000, // 예시 값
      entries: [
        {
          date: "19",
          day: "화요일",
          totalAmount: -27000,
          entries: [
            {
              category: "생활용품",
              detail: "주방/욕실",
              paymentMethod: "신한은행",
              amount: -30000,
            },
            {
              category: "부수입",
              detail: "",
              paymentMethod: "현금",
              amount: 3000,
            },
          ],
        },
        {
          date: "20",
          day: "수요일",
          totalAmount: -27000,
          entries: [
            {
              category: "생활용품",
              detail: "주방/욕실",
              paymentMethod: "신한은행",
              amount: -30000,
            },
            {
              category: "부수입",
              detail: "",
              paymentMethod: "현금",
              amount: 3000,
            },
          ],
        },
      ],
    };
  },

  // 검색기능
  computed: {
    filteredEntries() {
      if (!this.finalQuery) {
        return this.entries; // 검색어가 없으면 전체 목록 표시
      }
      return this.entries
        .map((entryGroup) => {
          const filteredGroup = {
            ...entryGroup,
            entries: entryGroup.entries.filter((entry) =>
              this.finalQuery
                .toLowerCase()
                .split(" ")
                .every((query) =>
                  [
                    entry.category,
                    entry.detail,
                    entry.paymentMethod,
                    entryGroup.date.toString(), // 날짜 검색 가능
                    entryGroup.day.toLowerCase(), // 요일 검색 가능
                  ]
                    .map((value) => value.toLowerCase())
                    .some((field) => field.includes(query))
                )
            ),
          };
          return filteredGroup.entries.length ? filteredGroup : null;
        })
        .filter(Boolean); // 빈 그룹은 제외
    },
  },

  methods: {
    executeSearch() {
      this.finalQuery = this.searchQuery; // 엔터를 눌렀을 때 검색어 반영
    },

    formatAmount(amount) {
      return `${amount.toLocaleString("ko-KR")}원`; // 금액 뒤에 '원'을 붙여서 표시
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
      // 캘린더 업데이트 로직
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

/* 월별 지출/수입 요약 스타일 */
.monthly-summary {
  text-align: right;
  justify-content: space-between;
  margin: 1rem 0;
  font-size: 1rem;
}

.expense,
.income {
  font-weight: bold;
}

.amount {
  font-size: 1.2rem;
  margin-left: 0.5rem;
}

.expense .amount {
  font-size: 1rem;
  color: #000000;
}

.income .amount {
  font-size: 1rem;
  color: #6981d9;
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
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

button:hover {
  background-color: #d9d9d9; /* 마우스 호버 시 색상 변경 */
}

.edit-btn {
  background-color: #d9d9d9; /* 편집 버튼 배경색 */
}

.add-btn {
  background-color: #ffffff; /* 버튼 배경색 */
  border: none;
  border-radius: 5px;
}

.add-btn:hover {
  background-color: #d9d9d9; /* 버튼 호버시 색상 */
}

.add-btn i {
  font-size: 18px; /* 아이콘 크기 */
  color: white; /* 아이콘 색상 */
}

.add-dropdown {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  width: 200px;
  z-index: 100; /* 다른 요소보다 위에 표시되도록 설정 */
}

.add-option {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.-option input {
  margin-right: 10px;
}

/* 날짜별 가계부 내역 스타일 */
/* 날짜 섹션 스타일 */
.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.date-section {
  display: flex;
  align-items: center;
}

.date {
  font-size: 0.8rem; /* 날짜 글자 크기 */
  color: #212529;
}

.day {
  font-size: 0.8rem; /* 요일 글자 크기 */
  padding: 1px 10px;
  border-radius: 5px;
}

/* 총 금액 스타일 */
.total-amount {
  font-size: 1rem; /* 금액 글자 크기 */
  padding: 5px 15px;
  border-radius: 5px;
}

.positive {
  color: #6981d9; /* 양수일 때의 색상 */
}

/* 음수일 때 빨간색 */
/* .negative {
  color: #ff6b6b; 
} */

/* 바뀐 부분: 날짜별 가계부 내역 스타일 */
.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.entry-details {
  margin-top: 10px;
}

.entry-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
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

.amount {
  flex: 1;
  text-align: right;
  font-size: 0.8rem;
}
</style>
