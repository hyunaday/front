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
      <button @click="toggleBottomSheet" class="add-btn">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>

    <!-- Bottom Sheet 내부에 가계부 내역 추가 폼 구현 -->
    <div
      v-if="isBottomSheetOpen"
      class="bottom-sheet-overlay"
      @click="closeBottomSheet"
    >
      <div class="bottom-sheet" @click.stop>
        <div class="bottom-sheet-header">
          <button class="close-btn" @click="closeBottomSheet">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>

        <!-- 내역 추가 폼 -->
        <main>
          <h3>내역 추가</h3>
          <form @submit.prevent="addTransaction">
            <!-- 카테고리 선택 -->
            <div class="form-group">
              <label for="category">카테고리</label>
              <select
                v-model="newTransaction.category"
                @change="updateDetailOptions"
                required
              >
                <option value="">카테고리 선택</option>
                <option value="수입">수입</option>
                <option value="지출">지출</option>
              </select>
            </div>

            <div class="form-group" v-if="newTransaction.category">
              <label for="detail">세부 항목</label>
              <select v-model="newTransaction.detail" required>
                <option value="">세부 항목 선택</option>
                <option
                  v-for="detail in detailOptions"
                  :key="detail"
                  :value="detail"
                >
                  {{ detail }}
                </option>
              </select>
            </div>

            <!-- 결제 수단 -->
            <div class="form-group">
              <label for="paymentMethod">결제 수단</label>
              <select v-model="newTransaction.paymentMethod" required>
                <option value="">결제 수단 선택</option>
                <option value="신한은행">신한은행</option>
                <option value="현금">현금</option>
                <!-- 추가 결제 수단 필요 시 여기에 옵션 추가 -->
              </select>
            </div>

            <!-- 금액 입력 -->
            <div class="form-group">
              <label for="amount">금액</label>
              <input
                type="number"
                id="amount"
                v-model="newTransaction.amount"
                placeholder="금액 입력"
                required
              />
            </div>

            <!-- 메모 입력 -->
            <div class="form-group">
              <label for="memo">메모</label>
              <textarea
                id="memo"
                v-model="newTransaction.memo"
                placeholder="메모 입력 (선택 사항)"
              ></textarea>
            </div>

            <!-- 저장 버튼 -->
            <div class="form-group">
              <button type="submit" class="submit-btn">저장</button>
            </div>
          </form>
        </main>
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
      selectedCategory: "전체", // 기본 선택값
      searchQuery: "", // 검색어 저장 변수
      isBottomSheetOpen: false, // bottom-sheet 상태
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
      currentTransaction: {}, // 현재 거래 내역 저장
      newTransaction: {
        category: "", // 카테고리
        detail: "", // 세부 항목
        paymentMethod: "", // 결제 수단
        amount: null, // 금액
        memo: "", // 메모
      },

      newTransaction: {
        category: "", // 카테고리
        detail: "", // 세부 항목
        paymentMethod: "", // 결제 수단
        amount: null, // 금액
        memo: "", // 메모
      },
      detailOptions: [], // 선택한 카테고리에 따른 세부 항목 목록
    };
  },

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

    openBottomSheet(transaction) {
      this.currentTransaction = transaction.entries[0]; // 첫 거래 내역 표시
      this.isBottomSheetOpen = true;
    },

    toggleBottomSheet() {
      console.log("toggleBottomSheet called"); // 상태가 변경되는지 확인
      this.isBottomSheetOpen = !this.isBottomSheetOpen; // true <-> false 토글
    },

    closeBottomSheet() {
      this.isBottomSheetOpen = false;
    },

    deleteTransaction() {
      alert("거래 내역이 삭제되었습니다.");
      this.closeBottomSheet();
    },

    formatAmount(amount) {
      if (typeof amount !== "number") {
        // amount가 숫자가 아니면 0으로 처리하거나 기본 값 처리
        return "0원";
      }
      return `${amount.toLocaleString("ko-KR")}원`;
    },

    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        years.push(year);
      }
      return years;
    },

    // 트랜잭션 추가 메서드
    addTransaction() {
      if (!this.newTransaction.category || !this.newTransaction.amount) {
        alert("필수 항목을 모두 입력해주세요!");
        return;
      }

      // 내역을 추가하는 로직
      const newEntry = {
        ...this.newTransaction, // 입력된 데이터를 복사
        date: new Date().getDate(), // 현재 날짜를 추가
        day: new Date().toLocaleString("ko-KR", { weekday: "long" }), // 현재 요일 추가
      };

      // 새로운 거래 내역을 목록에 추가
      this.entries.push({
        date: newEntry.date,
        day: newEntry.day,
        totalAmount: newEntry.amount,
        entries: [newEntry],
      });

      // 폼 리셋 및 Bottom Sheet 닫기
      this.newTransaction = {
        category: "",
        detail: "",
        paymentMethod: "",
        amount: null,
        memo: "",
      };
      this.closeBottomSheet();
    },
    updateDetailOptions() {
      if (this.newTransaction.category === "수입") {
        this.detailOptions = ["월급", "이자", "용돈"];
      } else if (this.newTransaction.category === "지출") {
        this.detailOptions = [
          "식비",
          "쇼핑",
          "교통",
          "문화",
          "주거/통신",
          "기타",
        ];
      } else {
        this.detailOptions = [];
      }
      this.newTransaction.detail = ""; // 세부 항목 초기화
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
  display: flex;
  justify-content: flex-end;
}

.add-btn {
  background-color: #ffffff;
  margin-left: 280px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

.add-btn i {
  font-size: 24px;
  color: #6981d9;
}

.add-btn:hover {
  background-color: #d9d9d9;
}

.bottom-sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80%; /* 고정된 높이 */
  max-height: 800px; /* 최대 높이 설정 */
  width: 100%;
  margin: 0 auto;
  max-width: 360px; /* 최대 너비 설정 */
  background: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 20px;
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  margin: 0 auto; /* 가운데 정렬 */
  transition: transform 0.3s ease-in-out;
  overflow-y: auto; /* 내부 스크롤 활성화 */
}

/* Bottom Sheet 내부 내용이 충분히 길 경우에만 스크롤이 나타나도록 합니다 */
.bottom-sheet::-webkit-scrollbar {
  width: 6px; /* 스크롤바 너비 */
}

.bottom-sheet::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2); /* 스크롤바 색상 */
  border-radius: 10px;
}

.bottom-sheet::-webkit-scrollbar-track {
  background-color: transparent; /* 트랙 배경 투명 */
}

/* Bottom Sheet Header */
.bottom-sheet-header {
  display: flex;
  justify-content: flex-end;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.close-btn i {
  color: #333;
}

.close-btn:hover {
  color: #ff6b6b;
}

/* Bottom Sheet 내 폼 스타일 */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
  height: 100px;
}

.submit-btn {
  background-color: #6981d9;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #576bb5;
}

/* 거래 내역 상세 */
.transaction-details h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.transaction-details h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.transaction-details p {
  font-size: 1rem;
  color: #666;
}

.transaction-info {
  margin-bottom: 1rem;
}

.transaction-info div {
  margin-bottom: 0.5rem;
}

.memo {
  margin-top: 1rem;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.delete-btn {
  background-color: #ffffff;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.next-btn {
  background-color: #6981d9;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

.next-btn:hover {
  background-color: #576bb5;
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

/* 음수일 때의 색상 */
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
