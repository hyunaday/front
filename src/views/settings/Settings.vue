<template>
  <div class="main-container">
    <div class="settings-container">
      <h1 class="title">
        <i class="fa-solid fa-bars icon"></i>
        환경설정
        <button type="button" @click="goBack" class="back-button">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </h1>
      <div class="settings-grid">
        <div class="setting-item item-1" @click="goToPaymentHistory">
          <h2>함께결제</h2>
          <p>함께 결제 내역 조회</p>
        </div>
        <div class="setting-item item-3" @click="goToChangePassword">
          <h2>비밀번호</h2>
          <p>비밀번호 변경</p>
        </div>
        <div class="setting-item item-2">
          <h2>앱 알림</h2>
          <div class="toggle-container">
            <label class="switch">
              <input type="checkbox" v-model="appPushNotifications" @change="updateAppPushNotifications" />
              <span class="slider"></span>
            </label>
            <span class="toggle-text" @click.stop="appPushNotifications = !appPushNotifications; updateAppPushNotifications()">
              알림
            </span>
          </div>
          <div class="toggle-container">
            <label class="switch">
              <input type="checkbox" v-model="eventBenefitsNotifications" @change="updateEventBenefitsNotifications" />
              <span class="slider"></span>
            </label>
            <span class="toggle-text" @click.stop="eventBenefitsNotifications = !eventBenefitsNotifications; updateEventBenefitsNotifications()">
              혜택
            </span>
          </div>
        </div>
        <div class="setting-item item-4" @click="showLogoutModal = true">
          <h2>로그아웃</h2>
        </div>
        <div class="setting-item item-5" @click="withdrawMembership">
          <h2>회원탈퇴</h2>
        </div>
      </div>
    </div>

    <!-- 로그아웃 모달 -->
    <div v-if="showLogoutModal" class="modal-overlay">
      <div class="modal-content">
        <p>로그아웃하시겠습니까?</p>
        <button @click="logout" class="confirm-button">확인</button>
        <button @click="showLogoutModal = false" class="cancel-button">취소</button>
      </div>
    </div>

    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';
import axios from 'axios';

export default {
  name: 'Settings',
  components: {
    FooterNav,
  },
  data() {
    return {
      appPushNotifications: false,
      eventBenefitsNotifications: false,
      showLogoutModal: false, // 모달 표시 상태
    };
  },
  methods: {
    goToGroupPayPage() {
      this.$router.push("/grouppay");
    },
    goToPaymentHistory() {
      this.$router.push('/paylist');
    },
    goToChangePassword() {
      this.$router.push('/currentpassword');
    },
    withdrawMembership() {
      this.$router.push('/cancel');
    },
    goBack() {
      this.$router.back();
    },
    async updateAppPushNotifications() {
      try {
        const response = await axios.post('/api/update-push-notifications', {
          appPushNotifications: this.appPushNotifications,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error updating app push notifications:', error);
      }
    },
    async updateEventBenefitsNotifications() {
      try {
        const response = await axios.post('/api/update-event-benefits-notifications', {
          eventBenefitsNotifications: this.eventBenefitsNotifications,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error updating event benefits notifications:', error);
      }
    },
    async logout() {
      console.log('로그아웃 중...');
      localStorage.removeItem('accessToken');
      this.showLogoutModal = false; // 모달 닫기
      this.$router.push('/login').catch(err => {
        console.error('Navigation error:', err);
      });
    },
  },
};
</script>
<style scoped>
/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
}

.confirm-button,
.cancel-button {
  margin: 5px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.confirm-button {
  background-color: #98b6ef;
  color: white;
}

.cancel-button {
  background-color: #6981d9;
  color: white;
}

/* 전체 스타일 */
.settings-container {
  padding: 100px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  position: relative;
  display: flex;
  align-items: center;
}

.icon {
  font-size: 24px; /* 기존 폰트 크기에 맞춰 설정 */
  margin-right: 8px; /* 아이콘과 텍스트 간격 */
}

.back-button {
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  color: #000;
  font-size: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  line-height: 30px;
  text-align: center;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
  color: white;
  height: 130px;
  width: 130px;
}

.item-1,
.item-4 {
  background-color: #6981d9;
}

.item-2,
.item-3 {
  background-color: #98b6ef;
}

.item-5 {
  background-color: #d97c6c;
}

.setting-item:hover {
  opacity: 0.8;
}

.setting-item h2 {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.setting-item p {
  font-size: 14px;
  margin: 5px 0 0;
}

.toggle-container {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.toggle-text {
  font-size: 14px;
  margin-left: 10px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>
