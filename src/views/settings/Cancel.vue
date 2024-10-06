<template>
  <div class="main-container">
    <div class="cancel-container">
      <h1 class="title">회원탈퇴</h1>
      <p class="description">회원탈퇴를 희망하실 경우 <br> 비밀번호를 입력해주세요.</p>
      <input
        type="password"
        v-model="password"
        placeholder="비밀번호를 입력해주세요"
        class="password-input"
        @input="checkPassword"
      />
      <div v-if="passwordError" class="error-message">비밀번호가 일치하지 않습니다.</div>
      <div class="button-container">
        <button @click="confirmCancellation" class="cancel-button" :disabled="!password || passwordError">탈퇴</button>
        <button @click="goBack" class="back-button">돌아가기</button>
      </div>
      <div v-if="message" class="message">{{ message }}</div>
      <button v-if="showConfirmButton" @click="goToLogin" class="confirm-button">확인</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      password: '',
      message: '',
      showConfirmButton: false,
      passwordError: false,
      storedPassword: '',
    };
  },
  async mounted() {
    const response = await axios.get('/member/login');
    this.storedPassword = response.data.password;
  },
  methods: {
    checkPassword() {
      this.passwordError = this.password !== this.storedPassword;
    },
    confirmCancellation() {
      if (this.passwordError) {
        return; // 비밀번호가 일치하지 않으면 탈퇴를 진행하지 않습니다.
      }
      
      const confirmation = confirm("정말 탈퇴하시겠습니까?");
      if (confirmation) {
        this.cancelMembership();
      }
    },
    async cancelMembership() {
      try {
        const response = await axios.post('/member/cancel', {
          password: this.password,
        });
        if (response.data.success) {
          this.message = '탈퇴가 완료되었습니다. 서비스를 이용해주셔서 감사합니다.';
          this.showConfirmButton = true;
        } else {
          this.message = response.data.message;
        }
      } catch (error) {
        console.error('Error cancelling membership:', error);
        this.message = '탈퇴에 실패했습니다. 다시 시도해주세요.';
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goBack() {
      this.$router.push('/settings'); // "/settings"로 이동
    },
  },
};
</script>

<style scoped>
.cancel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  border-radius: 10px;
  max-width: 400px;
  margin: auto;

}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.description {
  font-size: 16px;
  margin-bottom: 20px;
  color: #555;
}

.password-input {
  margin-bottom: 20px;
  padding: 12px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.button-container {
  display: flex;
  justify-content: space-between; /* 버튼을 양쪽으로 분산 */
  width: 100%; /* 버튼들이 컨테이너에 꽉 차게 배치 */
  margin-top: 20px; /* 버튼과 다른 요소 간격 조정 */
}

.cancel-button {
  padding: 12px 20px;
  background-color: #d97c6c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  flex: 1; /* 버튼을 균등하게 분배 */
  margin-right: 5px; /* 두 버튼 사이 여백 추가 */
}

.cancel-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.cancel-button:hover:not(:disabled) {
  background-color: #c96858;
}

.back-button {
  padding: 12px 20px;
  background-color: #a0a0a0; /* 배경색 설정 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  flex: 1; /* 버튼을 균등하게 분배 */
  margin-left: 5px; /* 두 버튼 사이 여백 추가 */
}

.back-button:hover {
  background-color: #8b8b8b; /* 버튼 호버 색상 */
}

.error-message {
  color: red;
  margin-top: 10px;
}

.message {
  margin-top: 20px;
  color: #333;
  font-size: 16px;
}

.confirm-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #6981d9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #5b6bbd;
}
</style>
