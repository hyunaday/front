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
    <div class="calendar">
      <!-- <h1>{{ selectedYear }} {{ months[selectedMonth] }}</h1> -->
      <div class="financial-summary">
        <div class="expense">
          지출:
          <span class="expense-amount">{{ totalExpense }}</span
          ><span style="color: black"> 원</span>
        </div>
        <div class="income">
          수입:
          <span class="income-amount">{{ totalIncome }}</span
          ><span style="color: black"> 원</span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in calendar" :key="week">
            <td v-for="day in week" :key="day.day">
              <div class="day-cell-wrapper">
                <div class="day-cell">
                  <div class="day-number">{{ day.day }}</div>
                  <div class="day-data">
                    <div v-if="day.day && day.data.income">
                      <span class="income-amount"
                        >+{{ day.data.income.toLocaleString() }}</span
                      >
                    </div>
                    <div v-if="day.day && day.data.expense">
                      <span class="expense-amount"
                        >-{{ day.data.expense.toLocaleString() }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiClient from "../api/axios.js";

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
      data: {},
    };
  },
  computed: {
    totalIncome() {
      // 선택된 연도와 월에 맞는 데이터만 필터링하여 합산
      const selectedYearMonth = `${this.selectedYear}-${String(
        this.selectedMonth + 1
      ).padStart(2, "0")}`;
      return Object.entries(this.data)
        .filter(([date]) => date.startsWith(selectedYearMonth)) // 해당 월 데이터만 필터링
        .reduce((acc, [_, day]) => acc + (day.income || 0), 0);
    },
    totalExpense() {
      const selectedYearMonth = `${this.selectedYear}-${String(
        this.selectedMonth + 1
      ).padStart(2, "0")}`;
      return Object.entries(this.data)
        .filter(([date]) => date.startsWith(selectedYearMonth)) // 해당 월 데이터만 필터링
        .reduce((acc, [_, day]) => acc + (day.expense || 0), 0);
    },
  },
  mounted() {
    this.updateCalendar();
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

    async fetchTransactionHistory() {
      try {
        const response = await apiClient.get("/transaction/history/all");

        if (response.data.isSuccess && response.data.result.transactionList) {
          const transactions = response.data.result.transactionList;

          // 데이터 가공
          transactions.forEach((transaction) => {
            const [year, month, day] = transaction.time; // 시간 정보 추출
            const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(
              day
            ).padStart(2, "0")}`;

            if (!this.data[dateKey]) {
              this.data[dateKey] = { income: 0, expense: 0 };
            }

            if (transaction.payMethod === "ACCOUNT") {
              this.data[dateKey].income += transaction.amount; // 수입
            } else if (transaction.payMethod === "CARD") {
              this.data[dateKey].expense += transaction.amount; // 지출
            }
          });

          // 캘린더 업데이트
          this.updateCalendar();
        } else {
          console.error(
            "API 응답 오류:",
            response.data.message || "Invalid response format"
          );
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
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
  font-family: "Poppins", sans-serif; /* Poppins 폰트 적용 */
}

.calendar {
  width: 100%;
  max-width: 800px; /* 캘린더 최대 너비 조정 */
  margin: 0 auto; /* 중앙 정렬 */
  margin-bottom: 15px; /* 네비게이션 바와의 간격 */
  padding: 0 15px; /* 추가적인 좌우 여백 */
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
  border: none; /* 테두리 제거 */
  appearance: none; /* 기본 드롭다운 화살표 제거 */
  background: transparent; /* 배경을 투명으로 설정 */
  font-family: "Poppins", sans-serif; /* Poppins 폰트 적용 */
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
  color: black; /* 텍스트 색상: 검정색 */
  font-size: 1rem;
}

.expense-amount {
  color: #ee8282; /* 지출 색상 */
}

.income-amount {
  color: #6981d9; /* 수입 색상 */
}

.expense-amount,
.income-amount {
  font-weight: bold;
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
  padding: 5px; /* 패딩 조정 */
  line-height: 1.2; /* 줄 높이 조정 */
  border: none;
  vertical-align: top;
}

th {
  color: black;
  font-weight: bold;
}

thead tr {
  border-bottom: 1px solid #cfcbcb;
  height: 40px; /* 높이를 자동으로 설정하여 padding에 맞게 조정 */
}

.day-cell {
  font-size: 1rem;
  text-align: center;
  vertical-align: top;
  padding: 10px;
  height: 60px;
}

.day-cell-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day-number {
  font-weight: bold;
  color: #444;
}

.day-data {
  align-items: center;
  font-size: 9px;
  margin-top: 5px;
  color: #666;
  font-weight: bold;
}
</style>
