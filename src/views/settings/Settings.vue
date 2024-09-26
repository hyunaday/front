<template>
    <div class="main-container d-flex flex-column justify-content-center align-items-center">

  <div class="settings">
    <button class="close-button" @click="goToMainPage">X</button>
 

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
import axios from 'axios';
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
      console.log('Navigating to main page');
      this.$router.push({ path: '/' });
    },
    logout() {
  console.log('로그아웃 중...');
  
  // 로그아웃 API 호출
  axios.post('/logout')
    .then(response => {
      console.log('로그아웃 성공:', response.data);
      // 로그아웃 후 메인 페이지로 이동
      this.goToMainPage();
    })
    .catch(error => {
      // 오류가 발생했을 경우
      console.error('로그아웃 에러:', error.response ? error.response.data : error.message);
      // 사용자에게 알림 표시
      alert('로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.');
    })
},

    deleteAccount() {
      console.log('회원탈퇴 중');
      axios.post('/cancel')  // 회원 탈퇴 API 호출
        .then(() => {
          console.log('회원탈퇴 성공');
          this.goToMainPage();
        })
        .catch(error => {
          console.error('회원탈퇴 에러', error);
          alert('회원탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
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
