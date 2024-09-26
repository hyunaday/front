<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <div>
      <CalendarComponent :year="selectedYear" :month="selectedMonth" />
    </div>

    <div class="divider"></div>

    <FooterNav
      buttonText="등록"
      :iconClass="null"
      customRoute="/addlist"
    />
  </div>
</template>

<script>
import 'vue-cal/dist/vuecal.css';
import VueCal from 'vue-cal';
import CalendarComponent from '../components/CalendarComponent.vue';
import FooterNav from '../components/FooterNav.vue';

export default {
  name: 'AccountBook',
  components: {
    VueCal,
    CalendarComponent,
    FooterNav,
  },
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      years: [],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    };
  },
  mounted() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear + i);
    }
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
  justify-content: flex-start; /* 중앙 정렬 대신 상단 정렬로 변경 */
  align-items: center;
  min-height: 100vh; /* 최소 높이 설정 */
  background-color: white;
  overflow-y: auto; /* 수직 스크롤 활성화 */
}

.calendar-container {
  text-align: center;
  font-family: 'Poppins', sans-serif; /* Poppins 폰트 적용 */
}

.calendar {
  width: 100%;
  max-width: 800px; /* 캘린더 최대 너비 조정 */
  margin: 0 px; /* 좌우 여백 추가 */
  margin-bottom: 15px; /* 네비게이션 바와의 간격 */
}

</style>
