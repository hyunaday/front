<template>
  <div class="settings">
    <button class="close-button" @click="goToMainPage">X</button>
    <h1>환경 설정</h1>

    <div class="section">
      <h2>친구 목록</h2>
      <ul>
        <li @click="navigateTo('/searchfriends')">목록 검색</li>
        <li @click="navigateTo('/invitefriends')">친구 초대</li>
      </ul>
    </div>

    <div class="section">
      <h2>함께 결제</h2>
      <ul>
        <li @click="navigateTo('/paylist')">함께 결제 내역 조회</li>
      </ul>
    </div>

    <div class="section">
      <h2>설정</h2>
      <ul>
        <li @click="navigateTo('/changepassword')">비밀번호 변경</li>
        <li @click="navigateTo('/alert')">앱 알림 설정</li>
        <li @click="logout">로그아웃</li>
      </ul>
    </div>

    <div class="section">
      <h2>회원 탈퇴</h2>
      <button @click="deleteAccount">회원탈퇴</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    navigateTo(apiEndpoint) {
      console.log(`Navigating to API: ${apiEndpoint}`);
      axios.get(apiEndpoint)
        .then(response => {
          // 성공적인 응답 처리
          console.log(response.data);
          // 응답에 따라 페이지 이동 또는 상태 업데이트 가능
        })
        .catch(error => {
          // 오류 처리
          console.error('Error fetching data:', error);
        });
    },
    goToMainPage() {
      console.log('Navigating to main page');
      this.$router.push({ path: '/' });
    },
    logout() {
      console.log('Logging out...');
      axios.post('/logout')  // 로그아웃 API 호출
        .then(() => {
          // 로그아웃 후 처리
          this.goToMainPage();
        })
        .catch(error => {
          console.error('Error logging out:', error);
        });
    },
    deleteAccount() {
      console.log('Deleting account...');
      axios.post('/cancel')  // 회원 탈퇴 API 호출
        .then(() => {
          // 탈퇴 후 처리
          this.goToMainPage();
        })
        .catch(error => {
          console.error('Error deleting account:', error);
        });
    }
  }
}
</script>

<style scoped>
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
}

h1 {
  font-size: 24px;
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
