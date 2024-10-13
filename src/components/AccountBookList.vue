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
    <!-- 필터링 및 카테고리 선택 버튼을 왼쪽 아래에 고정 -->
    <div class="filter-container">
      <!-- 수입/지출 필터링 버튼 -->
      <button
        :class="{ active: selectedFilter === 'income' }"
        @click="toggleFilter('income')"
      >
        수입
      </button>
      <button
        :class="{ active: selectedFilter === 'expense' }"
        @click="toggleFilter('expense')"
      >
        지출
      </button>
      <!-- 전체 카테고리 선택 -->
      <select v-model="selectedCategory">
        <option value="">전체</option>
        <!-- 전체 카테고리 옵션 -->
        <!-- 전체 카테고리 (필터가 설정되지 않았을 때) -->
        <template v-if="!selectedFilter">
          <option
            v-for="category in allCategories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </template>
        <!-- 수입 카테고리 (수입 필터가 설정된 경우) -->
        <template v-if="selectedFilter === 'income'">
          <option
            v-for="category in incomeCategories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </template>
        <<!-- 지출 카테고리 (지출 필터가 설정된 경우) -->
        <template v-if="selectedFilter === 'expense'">
          <option
            v-for="category in expenseCategories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </template>
      </select>
      <!-- bottom-sheet -->
      <div class="button-container">
        <button
          type="button"
          onclick="document.getElementById('testBottomSheet').openSheet()"
          class="plus-btn"
        >
          <i class="fa-solid fa-plus"></i>
        </button>

        <bottom-sheet id="testBottomSheet" title="세부 내역">
          <main class="editable-sheet">
            <div class="header">
              <div class="store-name">{{ storeName }}</div>
              <button class="close-btn" @click="closeBottomSheet">
                <i class="fa-solid fa-xmark"></i>
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
              </div>
            </div>
            <div class="description">인식 금액 {{ formattedFixedPrice }}</div>
            <!-- 분류 버튼 (수입, 지출 등록) -->
            <div class="category-container">
              <span class="category-label">분류</span>
              <div class="category-buttons">
                <!-- 수입/지출 필터링 버튼 -->
                <button
                  :class="{ active: selectedFilter === 'income' }"
                  @click="
                    toggleFilter('income');
                    setCategoryType('income');
                  "
                >
                  수입
                </button>
                <button
                  :class="{ active: selectedFilter === 'expense' }"
                  @click="
                    toggleFilter('expense');
                    setCategoryType('expense');
                  "
                >
                  지출
                </button>
              </div>
            </div>
            <!-- 구분선 추가 -->
            <hr class="divider" />
            <!-- 카테고리 -->
            <div class="detail-row">
              <span class="label">카테고리</span>
              <!-- 수입 카테고리 선택 -->
              <select
                v-if="selectedFilter === 'income'"
                v-model="selectedCategory"
              >
                <option disabled value="">카테고리를 선택하세요</option>
                <option
                  v-for="category in incomeCategories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
              <!-- 지출 카테고리 선택 -->
              <select
                v-if="selectedFilter === 'expense'"
                v-model="selectedCategory"
              >
                <option disabled value="">카테고리를 선택하세요</option>
                <option
                  v-for="category in expenseCategories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>
            <!-- 거래처 -->
            <div class="detail-row">
              <span class="label">거래처</span>
              <input type="text" v-model="storeName" class="content" />
            </div>
            <!-- 결제 수단 -->
            <div class="detail-row">
              <span class="label">결제 수단</span>
              <input type="text" v-model="paymentMethod" class="content" />
            </div>
            <!-- 날짜 -->
            <div class="detail-row">
              <span class="label">날짜</span>
              <input type="date" v-model="transactionDate" class="content" />
            </div>
            <!-- 메모 -->
            <div class="detail-row">
              <span class="label">메모 · 태그</span>
              <span class="content">
                <textarea
                  placeholder="입력하세요."
                  v-model="memo"
                  class="memo-input"
                ></textarea>
              </span>
            </div>
            <!-- 삭제 버튼과 다음 버튼 -->
            <div class="button-row">
              <button class="bottom-sheet-delete-btn">
                <i class="fa-regular fa-trash-can"></i>
              </button>
              <button class="next-btn" @click="submitDetails">다음</button>
            </div>
          </main>
        </bottom-sheet>
      </div>
    </div>
    <!-- 날짜별 가계부 내역 표시 시작 -->
    <div
      v-for="(entryGroup, groupIndex) in filteredEntries"
      :key="groupIndex"
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
          v-for="(entry, entryIndex) in entryGroup.entries"
          :key="entryIndex"
          class="entry-item"
        >
          <!-- 카테고리 이미지 및 이름 표시 -->
          <div class="entry-info">
            <img
              v-if="entry && entry.category"
              :src="mapEnumToImage(entry.category)"
              alt="카테고리 이미지"
              class="category-image"
            />
            <div class="category" v-if="entry && entry.category">
              {{ mapEnumToCategory(entry.category) }}
            </div>
          </div>
          <!-- 세부 내용 및 금액 - 여기서 조건부 렌더링 추가 -->
          <div v-if="entry && entry.detail">{{ entry.detail }}</div>
          <div
            v-if="entry && entry.amount"
            class="amount"
            :class="entry.amount < 0 ? 'negative' : 'positive'"
          >
            {{ formatAmount(entry.amount) }}
          </div>

          <!-- 삭제 버튼 -->
          <button
            v-if="entry"
            @click="deleteEntry(groupIndex, entryIndex)"
            class="delete-btn"
          >
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../api/axios.js";

import allowanceIcon from "../assets/images/allowance1.png";
import communicationIcon from "../assets/images/communication1.png";
import entertainmentIcon from "../assets/images/entertainment1.png";
import foodIcon from "../assets/images/food.png";
import interestIcon from "../assets/images/interest1.png";
import salaryIcon from "../assets/images/salary1.png";
import shoppingIcon from "../assets/images/shopping1.png";
import transportIcon from "../assets/images/transport1.png";
import uncategorizedIcon from "../assets/images/uncategorized1.png";

// ENUM과 한글 카테고리 매핑 객체
const CategoryMap = {
  SALARY: "월급",
  INTEREST: "이자",
  ALLOWANCE: "용돈",
  FOOD: "식비",
  SHOPPING: "쇼핑",
  TRANSPORT: "교통",
  ENTERTAINMENT: "문화",
  COMMUNICATION: "통신",
  UNCATEGORIZED: "기타",
};

// ENUM 값을 한글로 매핑하는 함수
function mapEnumToCategory(enumValue) {
  return CategoryMap[enumValue] || enumValue;
}

// 한글 카테고리 값을 ENUM 값으로 매핑하는 함수
function mapCategoryToEnum(categoryName) {
  return Object.keys(CategoryMap).find(
    (key) => CategoryMap[key] === categoryName
  );
}

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
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
      // 기존 데이터와 상태 값들
      selectedCategory: "",
      selectedFilter: null,
      incomeCategories: ["월급", "이자", "용돈"],
      expenseCategories: ["식비", "쇼핑", "교통", "문화", "통신", "기타"],
      allCategories: Object.values(CategoryMap), // 모든 카테고리 목록에 매핑된 한글 값 사용
      entries: [],
      entries: [], // API 데이터를 담을 배열
      totalExpense: 0,
      totalIncome: 0,
      searchQuery: "",
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      years: this.generateYears(),
      months: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      // 추가 데이터
      storeName: "",
      editablePrice: 0,
      isEditingPrice: false,
      selectedCategory: null,
      transactionDate: "",
      paymentMethod: "",
      memo: "",
    };
  },
  computed: {
    // 총 지출 계산
    totalExpense() {
      return (this.filteredEntries || []).reduce((total, entryGroup) => {
        return (
          total +
          entryGroup.entries
            .filter((entry) => entry.amount < 0)
            .reduce((sum, entry) => sum + entry.amount, 0)
        );
      }, 0);
    },
    // 총 수입 계산
    totalIncome() {
      return (this.filteredEntries || []).reduce((total, entryGroup) => {
        return (
          total +
          entryGroup.entries
            .filter((entry) => entry.amount > 0)
            .reduce((sum, entry) => sum + entry.amount, 0)
        );
      }, 0);
    },
    // 필터링된 거래 내역
    filteredEntries() {
      if (!this.entries) return [];
      return this.entries
        .filter((entryGroup) => {
          if (this.selectedFilter === "income") {
            return entryGroup.entries.some((entry) => !entry.isExpense);
          } else if (this.selectedFilter === "expense") {
            return entryGroup.entries.some((entry) => entry.isExpense);
          }
          return true;
        })
        .map((entryGroup) => {
          const filteredEntries = entryGroup.entries.filter((entry) => {
            const matchesFilter =
              this.selectedFilter === "income"
                ? !entry.isExpense
                : this.selectedFilter === "expense"
                ? entry.isExpense
                : true;
            const matchesCategory =
              !this.selectedCategory ||
              mapEnumToCategory(entry.category) === this.selectedCategory;

            return matchesFilter && matchesCategory;
          });
          return { ...entryGroup, entries: filteredEntries };
        })
        .filter((entryGroup) => entryGroup.entries.length > 0)
        .sort(
          (a, b) =>
            new Date(this.selectedYear, this.selectedMonth, a.date) -
            new Date(this.selectedYear, this.selectedMonth, b.date)
        );
    },
  },
  mounted() {
    // 컴포넌트가 마운트될 때 API 호출
    this.fetchTransactionHistory();
  },
  methods: {
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        years.push(year);
      }
      return years;
    },
    updateCalendar() {
      // 필요한 경우 달력 업데이트 로직 추가
    },

    toggleFilter(filter) {
      this.selectedFilter = this.selectedFilter === filter ? null : filter;
      this.selectedCategory = ""; // 필터 변경 시 카테고리 초기화
    },
    // 카테고리 변환 함수
    mapEnumToCategory(enumValue) {
      return CategoryMap[enumValue] || enumValue;
    },

    mapEnumToImage(category) {
      const categoryMap = {
        ALLOWANCE: allowanceIcon,
        COMMUNICATION: communicationIcon,
        ENTERTAINMENT: entertainmentIcon,
        FOOD: foodIcon,
        INTEREST: interestIcon,
        SALARY: salaryIcon,
        SHOPPING: shoppingIcon,
        TRANSPORT: transportIcon,
        UNCATEGORIZED: uncategorizedIcon,
      };

      // 카테고리 키에 해당하는 이미지 반환, 없으면 기본 이미지
      return categoryMap[category] || uncategorizedIcon;
    },

    async fetchTransactionHistory() {
      try {
        const response = await apiClient.get("/transaction/history/all");
        if (response.data.isSuccess) {
          const groupedEntries = response.data.result.transactionList.reduce(
            (acc, item) => {
              const dateKey =
                `${item.time[0]}` -
                `${String(item.time[1]).padStart(2, "0")}` -
                `${String(item.time[2]).padStart(2, "0")}`;

              if (!acc[dateKey]) {
                acc[dateKey] = {
                  date: item.time[2].toString(),
                  day: new Date(
                    item.time[0],
                    item.time[1] - 1,
                    item.time[2]
                  ).toLocaleString("ko-KR", { weekday: "long" }),
                  totalAmount: 0,
                  entries: [],
                };
              }

              const isExpense = item.creditIdx !== null; // creditIdx가 있으면 지출
              const amount = isExpense ? -Math.abs(item.amount) : item.amount; // 지출이면 음수로 변환

              acc[dateKey].totalAmount += amount;
              acc[dateKey].entries.push({
                category: item.category,
                detail: item.memo,
                payMethod: item.payMethod,
                amount: amount,
                storeName: item.memo,
                isExpense: isExpense,
              });

              return acc;
            },
            {}
          );

          this.entries = Object.values(groupedEntries);
          console.log("Grouped Entries:", this.entries); // 데이터 구조 확인용 로그
        }
      } catch (error) {
        console.error("거래 내역을 불러오는 중 오류가 발생했습니다:", error);
      }
    },

    // 삭제 api
    // deleteEntry(groupIndex, entryIndex) {
    //   // 선택된 항목을 entries 배열에서 제거
    //   this.entries[groupIndex].entries.splice(entryIndex, 1);

    //   // 그룹 내 항목이 없을 경우 그룹 자체도 제거
    //   if (this.entries[groupIndex].entries.length === 0) {
    //     this.entries.splice(groupIndex, 1);
    //   }

    //   console.log("거래 내역이 성공적으로 삭제되었습니다.");
    // },

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

    setCategoryType(type) {
      this.selectedFilter = type;
    },
    executeSearch() {
      this.finalQuery = this.searchQuery;
    },
    // 카테고리 타입 설정
    setFilter(filter) {
      this.selectedFilter = filter;
      this.selectedCategory = ""; // 필터 변경 시 카테고리 초기화
    },
    formatAmount(amount) {
      return typeof amount === "number"
        ? `${amount.toLocaleString("ko-KR")}원`
        : "0원";
    },
    submitDetails() {
      const newEntry = {
        category: this.selectedCategory,
        detail: this.memo,
        amount:
          this.selectedFilter === "expense"
            ? -parseInt(this.editablePrice) || 0
            : parseInt(this.editablePrice) || 0, // 지출이면 음수로 적용
        storeName: this.storeName,
        date: new Date(this.transactionDate).getDate().toString(),
        day: new Date(this.transactionDate).toLocaleString("ko-KR", {
          weekday: "long",
        }),
        filter: this.selectedFilter, // 수입 또는 지출 필터 값 저장
      };
      // entries 배열에 새로운 내역을 추가
      this.entries.push({
        date: newEntry.date,
        day: newEntry.day,
        totalAmount: newEntry.amount,
        entries: [newEntry],
      });
      // 바텀시트 닫고 폼 초기화
      this.closeBottomSheet();
      this.resetForm(); // 폼 초기화
    },
    resetForm() {
      this.selectedCategory = null;
      this.memo = "";
      this.editablePrice = 0;
      this.storeName = "";
      this.transactionDate = "";
      this.paymentMethod = "";
    },
  },
};
</script>

<style scoped>
.calendar-container {
  margin-top: 70px;
  padding: 20px;
  width: 100%;
  max-width: 320px;
  overflow-y: auto; /* 세로 스크롤 추가 */
  max-height: 80vh; /* 최대 높이 설정 */
  top: 0; /* 페이지 상단에 고정 */

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.calendar-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.calendar-container {
  margin-top: 100px;
  text-align: center;
  width: 260px;
  font-family: "Poppins", sans-serif; /* Poppins 폰트 적용 */
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
  border: none; /* 테두리 제거 */
  appearance: none; /* 기본 드롭다운 화살표 제거 */
  background: transparent; /* 배경을 투명으로 설정 */
  font-family: "Poppins", sans-serif; /* Poppins 폰트 적용 */
  font-size: 24px;
  color: #000000;
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
  color: red;
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
  padding: 10px 10px 10px 0;
  border-bottom: 1px solid #ddd;
}
.date-section {
  display: flex;
  align-items: center;
}
.date {
  font-size: 1.4rem;
  font-weight: bold;
  color: #212529;
}
.day {
  font-size: 0.8rem;
  padding: 1px 10px;
  border-radius: 5px;
}
.total-amount {
  font-size: 1rem;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
}
div.total-amount {
  text-align: right;
}
.positive {
  color: #6981d9;
}
.negative {
  color: red;
}
.entry-details {
  margin-top: 10px;
  justify-content: space-between; /* 왼쪽과 오른쪽에 있는 요소들을 적절히 분배 */
}
.entry-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  align-items: center; /* 세로로 중앙 정렬 */
  width: 100%; /* 항목이 가로로 꽉 차게 설정 */
}

/* .entry-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
} */

.entry-info {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center;
  justify-content: center; /* 수직 가운데 정렬 */
}
.store-name {
  font-size: 0.9rem;
  font-weight: bold;
  color: black;
  text-align: left;
}
.category {
  font-size: 0.8rem;
  color: black;
  text-align: left;
  margin-right: 8px;
}

.category-image {
  width: 24px; /* 원하는 너비 */
  height: 24px; /* 원하는 높이 */
  object-fit: contain; /* 이미지 비율 유지 */
  margin-right: 8px; /* 텍스트와의 간격 조절 */
}

.detail {
  flex-grow: 1; /* detail 항목이 가로 공간을 적절히 차지하도록 설정 */
  text-align: center; /* detail 필드 중앙 정렬 */
  font-size: 0.8rem;
  color: #333;
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
/* 필터링 버튼 스타일 */
.filter-container {
  margin: 1rem 0;
  display: flex;
  gap: 10px;
}
.filter-container button {
  border: 1px solid #ccc;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  color: #888;
}
.filter-container button.active {
  border: 1px solid #6981d9;
  background-color: #fff;
  color: #6981d9;
}
.filter-container button:hover {
  background-color: #e0e0e0;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
/* 카테고리 선택창 스타일 */
select {
  word-wrap: normal;
  background-color: #ffffff;
  border-radius: 5px;
  color: #888;
  padding: 1px 6px;
}
.category-select:focus {
  border: 1px solid #6981d9;
  color: #6981d9;
}
.category-select:hover {
  background-color: #e0e0e0;
}
/* 가계부 추가_상세거래 내역 */
.details-container {
  padding: 20px;
}
.detail-row {
  display: flex;
  /* justify-content: space-between; */
  margin-bottom: 10px;
}
.label {
  font-weight: bold;
  color: #888;
  flex-basis: 30%;
  text-align: left;
}
.content {
  flex-basis: 100%;
  text-align: left;
  color: #333;
}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
/* 입력 필드의 테두리를 없애는 스타일 */
.no-border {
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
}
.price-input {
  font-size: 1.8rem;
  font-weight: bold;
  border: none; /* 테두리 없애기 */
  border-bottom: 2px solid #ccc; /* 하단에만 선 표시 */
  outline: none;
}
/* memo-input도 테두리 제거 */
.memo-input {
  width: 100%;
  height: 80px;
  border: none;
  background-color: transparent;
  padding: 10px;
  font-size: 1rem;
  resize: none;
  outline: none;
}
.memo-input {
  width: 167.5px;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  font-size: 1rem;
  resize: none;
}
.details-container {
  padding: 20px;
}
.button-row {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  gap: 20px; /* 버튼 간격 추가 */
  margin-top: 20px;
}
/* 일반 삭제 버튼 스타일 */
.delete-btn {
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); */
}
.delete-btn i {
  color: #888;
}
.delete-btn:hover {
  background-color: #f0f0f0;
}
/* 바텀시트 안의 삭제 버튼 스타일 */
.bottom-sheet-delete-btn {
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.bottom-sheet-delete-btn i {
  color: #888;
}
.bottom-sheet-delete-btn:hover {
  background-color: #f0f0f0;
}
/* 다음 버튼 */
.next-btn {
  background-color: #6981d9;
  border: none;
  color: white;
  width: 200px; /* 너비를 더 넓게 설정 */
  padding: 10px 0; /* 패딩을 수직으로만 설정 */
  border-radius: 5px;
  font-size: 18px;
  text-align: center; /* 텍스트 중앙 정렬 */
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.next-btn:hover {
  background-color: #6981d9;
}
.customBottomsheet .content {
  padding: 0 30px 30px;
  border: none;
  height: 100%;
  overflow-y: auto;
  font-size: 14px;
}
.customBottomsheet._modal .sheet__wrapper {
  width: 360px;
  /* max-width: 500px; */
  /* min-width: 400px; */
  border-radius: 30px;
}
/* 바텀시트 안의 필터링 버튼 및 선택창 스타일 */
.category-container {
  margin: 1rem 0;
}
.category-buttons {
  display: flex;
  gap: 10px;
}
.category-buttons button {
  padding: 5px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  color: #888;
  cursor: pointer;
}
.category-buttons button.active {
  border: 1px solid #6981d9;
  background-color: #fff;
  color: #6981d9;
}
.category-buttons button:hover {
  background-color: #e0e0e0;
}
</style>
