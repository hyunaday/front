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

      <!-- 2024.09.27 알림 기능 추가 및 서버 연동 -->
      <div class="section">
        <h2>환경설정</h2>
        <ul>
          <li @click="navigateTo('/currentpassword')">비밀번호 변경</li>
          <div class="section">
            <hr>
        <h2>알림 설정</h2>
        <div class="form-check form-switch">
          <label class="form-check-label me-2" for="notificationToggle">앱 푸시 알림</label>
          <input
            class="form-check-input"
            type="checkbox"
            id="notificationToggle"
            v-model="notificationsEnabled"
            @change="updateNotificationSettings"
          />
        </div>
        <div class="form-check form-switch">
          <label class="form-check-label me-2" for="eventToggle">이벤트 혜택 알림</label>
          <input
            class="form-check-input"
            type="checkbox"
            id="eventToggle"
            v-model="eventEnabled"
             @change="updateNotificationSettings"
          />
        </div>
        <hr>
      </div>
          <li @click="logout">로그아웃</li>
        </ul>
      </div>
      <!-- ============================== -->
  
      <hr>
      <div class="section">
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
  data() {
    return {
      notificationsEnabled: false, // 알림 상태를 저장하는 변수
      eventEnabled: false,
    };
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
    },
     updateNotificationSettings() {
    // 알림 설정을 서버에 저장하는 API 호출
    axios.post('/update-notifications', {
      notificationsEnabled: this.notificationsEnabled,
      eventEnabled: this.eventEnabled,
    })
    .then(response => {
      console.log('알림 설정 업데이트 성공:', response.data);
    })
    .catch(error => {
      console.error('알림 설정 업데이트 에러:', error);
    });
  }
  }
}
</script>

<style scoped>
.settings {
  margin: 20px;
  padding: 20px;
  position: relative;
  width: 250px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #6981D9;
  border: none; 
  border-radius: 50%; 
  width: 20px; 
  height: 30px; 
  font-size: px; 
  color: white; 
  cursor: pointer; 
  display: flex;
  align-items: center; 
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.close-button:hover {
  background-color: #98B6EF; 
  transform: scale(1.1); 
}

.close-button:focus {
  outline: none; 
  box-shadow: 0 0 0 4px rgba(255, 77, 79, 0.5); 
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
  padding: 5px;
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
  border-radius: 9px; 

}

button:hover {
  background-color: #ff7875; /* 회원탈퇴 버튼 호버 색상 */
}
</style>
