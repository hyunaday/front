<script>
import apiClient from "../api/axios"; // Adjust the path as necessary

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
      selectedCategory: "",
      selectedFilter: null,
      incomeCategories: ["월급", "이자", "용돈"],
      expenseCategories: ["식비", "쇼핑", "교통", "문화", "주거/통신", "기타"],
      allCategories: [
        "월급",
        "이자",
        "용돈",
        "식비",
        "쇼핑",
        "교통",
        "문화",
        "주거/통신",
        "기타",
      ],

      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      years: generateYears(),
      months,
      searchQuery: "",
      finalQuery: "",
      totalExpense: 0,
      totalIncome: 0,
      storeName: "",
      editablePrice: 0,
      isEditingPrice: false,
      transactionDate: "",
      paymentMethod: "",
      memo: "",
      entries: [], // Initialize as an empty array
    };
  },

  mounted() {
    this.fetchEntries();
  },

  computed: {
    totalExpense() {
      return this.filteredEntries.reduce((total, entryGroup) => {
        return (
          total +
          entryGroup.entries
            .filter((entry) => entry.amount < 0)
            .reduce((sum, entry) => sum + entry.amount, 0)
        );
      }, 0);
    },
    totalIncome() {
      return this.filteredEntries.reduce((total, entryGroup) => {
        return (
          total +
          entryGroup.entries
            .filter((entry) => entry.amount > 0)
            .reduce((sum, entry) => sum + entry.amount, 0)
        );
      }, 0);
    },
    filteredEntries() {
      return this.entries
        .filter((entryGroup) => {
          if (this.selectedFilter === "income") {
            return entryGroup.entries.some((entry) => entry.amount > 0);
          } else if (this.selectedFilter === "expense") {
            return entryGroup.entries.some((entry) => entry.amount < 0);
          }
          return true;
        })
        .map((entryGroup) => {
          const filteredEntries = entryGroup.entries.filter((entry) => {
            const matchesFilter =
              this.selectedFilter === "income"
                ? entry.amount > 0
                : this.selectedFilter === "expense"
                ? entry.amount < 0
                : true;
            const matchesCategory =
              !this.selectedCategory ||
              entry.category === this.selectedCategory;
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

    formattedPrice() {
      return `${this.editablePrice.toLocaleString()}원`;
    },
  },

  methods: {
    fetchEntries() {
      apiClient.get('/transaction/history/all')
        .then(response => {
          // Assuming the response is an array of transactions
          this.entries = response.data.map(transaction => {
            const dateObj = new Date(
              transaction.time[0],
              transaction.time[1] - 1, // Month is zero-based
              transaction.time[2]
            );

            return {
              date: dateObj.getDate().toString(),
              day: dateObj.toLocaleString("ko-KR", { weekday: "long" }),
              totalAmount: transaction.amount,
              entries: [{
                category: transaction.category,
                detail: transaction.memo,
                amount: transaction.amount,
                storeName: transaction.storeName || "기타", // If storeName is not provided, use "기타"
                memo: transaction.memo,
                paymentMethod: transaction.payMethod,
              }],
            };
          });
        })
        .catch(error => {
          console.error("Error fetching entries:", error);
        });
    },
    
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
    toggleFilter(filter) {
      this.selectedFilter = this.selectedFilter === filter ? null : filter;
      this.selectedCategory = ""; // Reset category when filter changes
    },
    setCategoryType(type) {
      this.selectedFilter = type;
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
            : parseInt(this.editablePrice) || 0,
        storeName: this.storeName,
        date: new Date(this.transactionDate).getDate().toString(),
        day: new Date(this.transactionDate).toLocaleString("ko-KR", {
          weekday: "long",
        }),
        filter: this.selectedFilter,
      };

      this.entries.push({
        date: newEntry.date,
        day: newEntry.day,
        totalAmount: newEntry.amount,
        entries: [newEntry],
      });

      this.closeBottomSheet();
      this.resetForm();
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
  text-align: center;
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
.entry-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
.entry-info {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
}

.store-name {
  font-size: 0.9rem;
  font-weight: bold;
  color: black;
}

.category {
  font-size: 0.8rem;
  color: black;
}

.detail {
  flex: 1;
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