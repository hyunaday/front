<template>
  <div class="main-container">
    <div class="settings-container">
      <h1 class="title">
        환경설정
        <button class="close-button" @click="goHome">X</button>
      </h1>
      <div class="settings-grid">
        <div class="setting-item item-1" @click="goToPaymentHistory">
          <h2>함께결제</h2>
          <p>함께 결제 내역 조회</p>
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
        <div class="setting-item item-3" @click="goToChangePassword">
          <h2>비밀번호</h2>
          <p>비밀번호 변경</p>
        </div>
        <div class="setting-item item-4" @click="withdrawMembership">
          <h2>회원탈퇴</h2>
        </div>
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
    };
  },
  methods: {
    goToPaymentHistory() {
      this.$router.push('/paylist');
    },
    goToChangePassword() {
      this.$router.push('/currentpassword');
    },
    withdrawMembership() {
      this.$router.push('/cancel');
    },
    goHome() {
      this.$router.push('/'); // 홈 페이지로 이동
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
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.settings-container {
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  position: relative; /* 추가 */
}

.close-button {
  position: absolute; /* 버튼을 제목 오른쪽에 위치시키기 위해 절대 위치 설정 */
  right: 0; /* 오른쪽 끝에 위치 */
  top: 0; /* 제목과 같은 수직 위치 */
  background: none; /* 배경 없애기 */
  border: none; /* 테두리 없애기 */
  color: #000; /* 검은색으로 버튼 텍스트 색상 설정 */
  font-size: 20px; /* 버튼 크기 조정 */
  width: 30px; /* 버튼 너비 조정 */
  height: 30px; /* 버튼 높이 조정 */
  cursor: pointer; /* 마우스 커서 포인터로 변경 */
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
