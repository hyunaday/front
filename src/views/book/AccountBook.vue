<template>
  <div class="main-container">
    <Header />

    <div>
      <!-- CalendarComponent 또는 리스트 보기 -->
      <div v-if="isCalendarView">
        <CalendarComponent :year="selectedYear" :month="selectedMonth" />
      </div>
      <div v-else>
        <!-- 리스트 보기 -->
        <AccountBookList />
      </div>
    </div>

    <!-- 캘린더/리스트 전환 버튼 -->
    <div class="view-toggle">
      <button
        :class="{ active: isCalendarView }"
        @click="toggleView(true)"
        class="toggle-btn"
      >
        캘린더
      </button>
      <div class="divider-line"></div>
      <button
        :class="{ active: !isCalendarView }"
        @click="toggleView(false)"
        class="toggle-btn"
      >
        리스트
      </button>
    </div>

    <div class="divider"></div>

    <!-- FooterNav 컴포넌트 사용 -->
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import "vue-cal/dist/vuecal.css";
import VueCal from "vue-cal";
import CalendarComponent from "../../components/CalendarComponent.vue"; // CalendarComponent를 import
import FooterNav from "../../components/FooterNav.vue";
import AccountBookList from "../../components/AccountBookList.vue"; // AccountBookList 컴포넌트 import
import axios from "../../api/axios";
import apiClient from "../../api/axios";
import Header from "../../components/Header.vue";

export default {
  name: "AccountBook",
  components: {
    FooterNav,
    Header,
    VueCal,
    CalendarComponent,
    AccountBookList, // 리스트 보기 컴포넌트 추가
  },
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      years: [],
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
      isCalendarView: true, // 캘린더 보기 여부 상태 관리
    };
  },
  methods: {
    goToGroupPayPage() {
      this.$router.push("/grouppay");
    },
    toggleView(isCalendar) {
      this.isCalendarView = isCalendar;
    },
    goToAddList() {
      this.$router.push("/addlist"); // AddList 페이지로 이동
    },

    async fetchListData() {
      try {
        const response = await apiClient.get(`transaction/all`);
        if (response.data.isSuccess && response.data.result) {
          this.listData = response.data.result.creditList;
        } else {
          console.error("거래 목록 조회 실패:", response.data.message);
        }
      } catch (error) {
        console.error("리스트 데이터를 불러오는 중 오류 발생:", error);
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 20px;
}

a {
  text-decoration: none;
}

.calendar-container {
  text-align: center;
  font-family: "Poppins", sans-serif; /* Poppins 폰트 적용 */
}

.calendar {
  width: 100%;
  max-width: 800px;
  margin-bottom: 15px;
}

/* 캘린더/리스트 전환 버튼 스타일 */
.view-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  height: 30px;
  margin: 20px 0;
  background-color: #d9d9d9;
  border-radius: 25px;
  padding: 5px;
}

.toggle-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.toggle-btn.active {
  font-weight: bold;
  color: white;
  background: #8d8a8a;
  border-radius: 25px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  max-width: 250px;
  height: 17px;
  margin: 20px 0;
}

.divider-line {
  width: 1px;
  height: 30px;
  background-color: #ddd;
}

.list-view {
  width: 100%;
  max-width: 800px;
  padding: 10px;
  background-color: #f9f9f9;
}

.list-view ul {
  list-style: none;
  padding: 0;
}

.list-view li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
