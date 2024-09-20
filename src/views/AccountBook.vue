<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <div>
      <!-- CalendarComponent를 사용 -->
      <CalendarComponent :year="selectedYear" :month="selectedMonth" />
    </div>

    <div class="divider"></div>

    <div class="navbar">
      <router-link to="/" class="nav-item" exact-active-class="active">
        <i class="fas fa-home"></i>
        <span>홈</span>
      </router-link>

      <router-link to="/myassets" class="nav-item" exact-active-class="active">
        <i class="fas fa-wallet"></i>
        <span>내 자산</span>
      </router-link>

      <router-link to="/grouppay" class="pay-btn" exact-active-class="active">
        <i class="fa-solid fa-plus"></i>
        <span></span>
      </router-link>

      <router-link
        to="/accountbook"
        class="nav-item"
        exact-active-class="active"
      >
        <i class="fas fa-book"></i>
        <span>가계부</span>
      </router-link>

      <router-link
        to="/businesscard"
        class="nav-item"
        exact-active-class="active"
      >
        <i class="fas fa-id-card"></i>
        <span>전자 명함</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import 'vue-cal/dist/vuecal.css'; // 수정된 경로
import VueCal from 'vue-cal';
import CalendarComponent from '../components/CalendarComponent.vue'; // CalendarComponent를 import

export default {
  name: 'AccountBook',
  components: {
    VueCal,
    CalendarComponent, // 필요한 컴포넌트 등록
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
    // 미래의 10년까지의 년도를 배열에 추가
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

  margin-bottom: 15px; /* 네비게이션 바와의 간격 */
}

/* 네비게이션 바 스타일 */
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

/* 네비게이션 아이템 스타일 */
.navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #555;
  flex: 1;
}

/* 네비게이션 아이템 아이콘 스타일 */
.navbar .nav-item i {
  font-size: 24px;
  margin-bottom: 5px;
}

/* 결제 버튼 스타일 */
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center; /* 글자 가운데 정렬 */
}

/* 활성화된 네비게이션 아이템 스타일 */
.navbar .nav-item.active {
  color: #7189ff; /* 텍스트 색상 변경 */
  font-weight: bold; /* 강조를 위해 볼드체로 */
}
/* 내 자산과 가계부 사이의 간격 조정을 위해 flex-grow 사용 */
.nav-item:nth-child(4) {
  flex-grow: 1.7; /* 가계부의 여유 공간을 살짝 늘림 */
}

.nav-item:nth-child(2) {
  flex-grow: 1.7; /* 내 자산의 여유 공간을 살짝 늘림 */
}
.navbar .nav-item.active i {
  color: #7189ff; /* 아이콘 색상 변경 */
}
</style>
