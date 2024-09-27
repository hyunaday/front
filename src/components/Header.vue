<template>
  <div class="header-container">
    <div class="top-right-icons">
      <svg class="icon notification-icon" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0M12 2v1"/>
      </svg>
      <svg class="icon menu-icon" viewBox="0 0 24 24" width="24" height="24" @click="navigateToSettings">
        <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M3 6h18M3 18h18"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    navigateToSettings() {
      console.log('환경설정 연결 중');
      this.$router.push('/settings').catch(err => {
        console.error('환경설정 페이지 연결 에러: ', err);
      });
    }
  }
};
</script>

<style scoped>
.header-container {
  position: relative;
  width: 100%;
  height: 60px; /* 헤더의 높이 지정 */
}

.top-right-icons {
  position: absolute;
  top: 18px; /* 상단에서의 거리 조정 */
  right: 20px; /* 우측에서의 거리 조정 */
  display: flex;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
}

.icon:hover {
  color: #6981d6;
}

.notification-icon {
  margin-right: 15px;
}
</style>
