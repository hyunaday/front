<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <div>
      <!-- CalendarComponent 또는 리스트 보기 -->
      <div v-if="isCalendarView">
        <CalendarComponent :year="selectedYear" :month="selectedMonth" />
      </div>
      <div v-else>
        <!-- 리스트 보기 -->
        <div class="list-view">
          <h2>리스트 보기</h2>
          <ul>
            <li v-for="(item, index) in budgetList" :key="index">
              {{ item.date }} - {{ item.type }} - {{ item.amount }}원
            </li>
          </ul>
        </div>
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
  </div>
  <!-- FooterNav 컴포넌트 사용 -->
  <FooterNav
    buttonText="등록"
    :iconClass="null"
    @button-click="handleRegister"
  />
</template>

<script>
import 'vue-cal/dist/vuecal.css'; // 수정된 경로
import VueCal from 'vue-cal';
import CalendarComponent from '../components/CalendarComponent.vue'; // CalendarComponent를 import
import FooterNav from '../components/FooterNav.vue';

export default {
  name: 'AccountBook',
  components: {
    FooterNav,
    VueCal,
    CalendarComponent, // 필요한 컴포넌트 등록
  },
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      isCalendarView: true, // 캘린더 보기 여부 상태 관리
      budgetList: [
        { date: '2024-09-23', type: 'income', amount: 50000 },
        { date: '2024-09-24', type: 'expense', amount: 30000 },
      ],
    };
  },
  methods: {
    toggleView(isCalendar) {
      this.isCalendarView = isCalendar;
    },
    handleRegister() {
      this.$router.push('/addlist'); // AddList 페이지로 이동
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background-color: white;
  overflow-y: auto;
  margin-bottom: 60px;
}

.calendar-container {
  text-align: center;
  font-family: 'Poppins', sans-serif;
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

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: white;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  max-width: 360px;
  width: 100%;
}

.navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #555;
  flex: 1;
}

.navbar .nav-item i {
  font-size: 24px;
  margin-bottom: 5px;
}

.pay-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 65px;
  height: 65px;
  background-color: #7189ff;
  border-radius: 50%;
  color: white;
  font-size: 50px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.navbar .nav-item.active {
  color: #7189ff;
  font-weight: bold;
}
</style>
