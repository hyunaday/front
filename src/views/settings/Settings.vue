<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <div class="settings">
      <button class="close-button" @click="goToMainPage">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="section">
        <h2>친구 목록</h2>
        <ul>
          <li @click="navigateTo('/searchfriends')">목록 검색</li>
          <li @click="navigateTo('/invitefriends')">친구 초대</li>
        </ul>
      </div>
      <hr>
      <div class="section">
        <h2>함께 결제</h2>
        <ul>
          <li @click="navigateTo('/paylist')">함께 결제 내역 조회</li>
        </ul>
      </div>
      <hr>
      <div class="section">
        <h2>설정</h2>
        <ul>
          <li @click="navigateTo('/changepassword')">비밀번호 변경</li>
          <li @click="navigateTo('/alert')">앱 알림 설정</li>
          <li @click="logout">로그아웃</li>
        </ul>
      </div>
      <hr>
      <div class="section">
        <h2>회원탈퇴</h2>
        <button @click="deleteAccount">회원탈퇴</button>
      </div>
    </div>
    <FooterNav />
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';

export default {
  name: "Settings",
  components: {
    FooterNav,
  },
  methods: {
    navigateTo(route) {
      console.log(`Navigating to route: ${route}`);
      this.$router.push(route).catch(err => {
        console.error('Navigation error:', err);
      });
    },
    goToMainPage() {
      console.log('메인페이지 이동 중...');
      this.$router.push({ path: '/' });
    },
    logout() {
      console.log('로그아웃 중...');
      
      // 토큰 삭제
      localStorage.removeItem('accessToken');

      // 로그인 페이지로 리다이렉트
      this.$router.push('/login').catch(err => {
        console.error('Navigation error:', err);
      });
    },
    deleteAccount() {
      console.log('회원탈퇴 중...');
      // 회원탈퇴 처리 로직 추가
      this.$router.push('/login').catch(err => {
        console.error('회원탈퇴 에러', err);
        alert('회원탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
      });
    }
  }
}
</script>

<style scoped>
/* 기존 스타일 유지 */
.settings {
  padding: 20px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: transform 0.2s ease, color 0.3s ease;
}

.close-button:hover {
  background-color: #ff7875;
  transform: scale(1.1);
}

.close-button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(255, 77, 79, 0.5);
}

.section {
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin: 10px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}

button {
  padding: 10px 15px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ff7875;
}
</style>
