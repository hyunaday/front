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

    <!-- bottom-sheet -->
    <div class="button-container">
      <button
        type="button"
        onclick="document.getElementById('testBottomSheet').openSheet()"
        class="plus-btn"
      >
        <i class="fa-solid fa-plus"></i>
        <!-- Font Awesome 플러스 아이콘 -->
      </button>
      <bottom-sheet id="testBottomSheet" title="세부 내역">
        <main class="editable-sheet">
          <div class="header">
            <div class="store-name">{{ storeName }}</div>
            <button class="close-btn" @click="closeBottomSheet">
              <i class="fa-solid fa-xmark"></i>
              <!-- 닫기 아이콘 -->
            </button>
          </div>
          <div class="price-section">
            <input
              v-if="isEditingPrice"
              type="text"
              v-model="editablePrice"
              @blur="stopEditingPrice"
              class="price-input"
            />
            <div v-else @click="startEditingPrice">
              <span class="price">{{ formattedPrice }}</span>
              <i class="fa-solid fa-pen edit-icon"></i>
              <!-- 연필 아이콘 -->
            </div>
          </div>
          <div class="description">인식 금액 {{ formattedFixedPrice }}</div>

          <!-- 분류 버튼 (수입, 지출) 추가 -->
          <div class="category-container">
            <span class="category-label">분류</span>
            <div class="category-buttons">
              <button
                :class="{ active: selectedCategory === 'income' }"
                @click="selectCategory('income')"
              >
                수입
              </button>
              <button
                :class="{ active: selectedCategory === 'expense' }"
                @click="selectCategory('expense')"
              >
                지출
              </button>
            </div>
          </div>
        </main>
      </bottom-sheet>
    </div>

    <!-- 날짜별 가계부 내역 표시 시작 -->
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
// 상수 데이터 정의
const months = [
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
];

// 함수 외부로 정의
function generateYears() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 10; year <= currentYear + 10; year++) {
    years.push(year);
  }
  return years;
}

export default {
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      years: generateYears(),
      months,
      searchQuery: "",
      finalQuery: "",
      totalExpense: 90000,
      totalIncome: 1000000,

      storeName: "컴포즈커피세종대학교점", // 상점명
      fixedAmount: 2500, // 고정된 인식 금액
      editablePrice: 2500, // 수정 가능한 금액
      isEditingPrice: false, // 가격 수정 모드 여부
      selectedCategory: "income", // 기본 분류 카테고리 (수입)
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
              storeName: "마트",
              memo: "주방용품 구매",
            },
            {
              category: "부수입",
              detail: "",
              paymentMethod: "현금",
              amount: 3000,
              storeName: "",
              memo: "",
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
              storeName: "다이소",
              memo: "생활용품",
            },
            {
              category: "부수입",
              detail: "",
              paymentMethod: "현금",
              amount: 3000,
              storeName: "",
              memo: "",
            },
          ],
        },
      ],
    };
  },

  computed: {
    filteredEntries() {
      if (!this.finalQuery) {
        return this.entries;
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
                    entryGroup.date.toString(),
                    entryGroup.day.toLowerCase(),
                  ]
                    .map((value) => value.toLowerCase())
                    .some((field) => field.includes(query))
                )
            ),
          };
          return filteredGroup.entries.length ? filteredGroup : null;
        })
        .filter(Boolean);
    },
    formattedPrice() {
      return `${this.editablePrice.toLocaleString()}원`;
    },
  },

  methods: {
    executeSearch() {
      this.finalQuery = this.searchQuery;
    },
    startEditingPrice() {
      this.isEditingPrice = true;
    },
    stopEditingPrice() {
      this.isEditingPrice = false;
    },
    closeBottomSheet() {
      document.getElementById("testBottomSheet").closeSheet();
    },
    selectCategory(category) {
      this.selectedCategory = category; // 선택한 분류로 업데이트
    },
    formatAmount(amount) {
      return typeof amount === "number"
        ? `${amount.toLocaleString("ko-KR")}원`
        : "0원";
    },
  },
};
</script>

<style scoped>
.calendar-container {
  text-align: center;
  font-family: "Poppins", sans-serif;
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

.search-bar {
  margin: 1rem 0;
  text-align: center;
}

.search-input {
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 100%;
  height: 35px;
  max-width: 300px;
}

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
  font-size: 0.8rem;
  color: #212529;
}

.day {
  font-size: 0.8rem;
  padding: 1px 10px;
  border-radius: 5px;
}

.total-amount {
  font-size: 1rem;
  padding: 5px 15px;
  border-radius: 5px;
}

.positive {
  color: #6981d9;
}

.negative {
  color: red;
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

/* 버튼 컨테이너 스타일 - 오른쪽 정렬 */
.button-container {
  display: flex;
  justify-content: flex-end;
}

/* bottom-sheet 활성화 버튼 */
.plus-btn {
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
}

.plus-btn:hover {
  background-color: #f0f0f0;
}

.plus-btn i {
  color: #6981d9;
}

.editable-sheet {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.store-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.price-section {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.price {
  font-size: 1.8rem;
  font-weight: bold;
}

.edit-icon {
  margin-left: 10px;
  cursor: pointer;
}

.price-input {
  font-size: 1.8rem;
  font-weight: bold;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
}

.description {
  text-align: left;
  font-size: 0.8rem;
  color: #888;
}

/* 분류와 버튼이 일렬로 나타나도록 설정 */
.category-container {
  display: flex;
  justify-content: space-between; /* 텍스트와 버튼을 양 끝으로 배치 */
  align-items: center;
  margin-top: 20px;
}

.category-label {
  font-size: 1rem;
  color: #888888;
  line-height: 36px; /* 버튼과 같은 높이로 수평 정렬 */
}

.category-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.category-buttons button {
  padding: 5px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  color: #888;
  cursor: pointer;
}

.category-buttons button.active {
  border: 1px solid #6981d9;
  color: #6981d9;
  background-color: #ffffff;
}

.category-buttons button:hover {
  background-color: #e0e0e0;
}
</style>
