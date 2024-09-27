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
      console.log('메인페이지 이동 중...');
      this.$router.push({ path: '/' });
    },
    logout() {
      console.log('로그아웃 중...');
      axios.post('/logout')
        .then(response => {
          console.log('로그아웃 성공:', response.data);
          this.goToMainPage();
        })
        .catch(error => {
          console.error('로그아웃 에러:', error.response ? error.response.data : error.message);
          alert('로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.');
        });
    },
    deleteAccount() {
      console.log('회원탈퇴 중...');
      axios.post('/cancel')
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
  background-color: transparent; /* 배경 투명 */
  border: none; /* 테두리 제거 */
  font-size: 24px;
  cursor: pointer;
  color: #333; /* 아이콘 색상 */
  transition: transform 0.2s ease, color 0.3s ease; /* 변환 효과 추가 */
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #ff4d4f;
  border: none; /* Remove border */
  border-radius: 50%; /* Make it circular */
  width: 40px; /* Fixed width */
  height: 40px; /* Fixed height */
  font-size: 24px; /* Icon size */
  color: white; /* Icon color */
  cursor: pointer; /* Pointer cursor */
  display: flex; /* Flex for centering */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Transition for hover effect */
}

.close-button:hover {
  background-color: #ff7875; /* Lighter red on hover */
  transform: scale(1.1); /* Scale effect on hover */
}

.close-button:focus {
  outline: none; /* Remove focus outline */
  box-shadow: 0 0 0 4px rgba(255, 77, 79, 0.5); /* Add focus ring */
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
  background-color: #ff4d4f; /* 회원탈퇴 버튼 배경색 */
  color: white; /* 회원탈퇴 버튼 텍스트 색상 */
  border: none; /* 회원탈퇴 버튼 테두리 제거 */
  cursor: pointer;
}

button:hover {
  background-color: #ff7875; /* 회원탈퇴 버튼 호버 색상 */
}
</style>
