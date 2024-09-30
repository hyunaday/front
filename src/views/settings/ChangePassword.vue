<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <div class="password-change">
      <h2>새로운 비밀번호를 입력해주세요.</h2>
      <br><br>
      <form @submit.prevent="changePassword">
        <div class="form-group">
          <label for="new-password">새로운 비밀번호</label>
          <input
            type="password"
            id="new-password"
            v-model="newPassword"
            class="form-input"
            required
            :placeholder="newPasswordError || '새로운 비밀번호를 입력해주세요.'"
          />
        </div>
        <div class="form-group">
          <label for="confirm-password"></label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            class="form-input"
            required
            :placeholder="confirmPasswordError || '한번 더 입력해주세요.'"
          />
        </div>
        <button type="submit" class="submit-button">변경 완료</button>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
    <!-- <FooterNav /> -->
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';

export default {
  name: "ChangePassword",
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      message: '',
      newPasswordError: '',
      confirmPasswordError: '',
      // currentPassword: '12121212', // 테스트용 : 기존 비밀번호를 여기에서 설정
    };
  },
  methods: {
    validatePassword(password) {
      return password.length >= 8; // 비밀번호가 8자리 이상인지 확인
    },
    changePassword() {
      this.newPasswordError = '';
      this.confirmPasswordError = '';

      // 비밀번호 유효성 검사
      if (!this.validatePassword(this.newPassword)) {
        this.newPasswordError = '비밀번호는 8자리 이상이어야 합니다.';
      }

      // 비밀번호 확인
      if (this.newPassword !== this.confirmPassword) {
        this.confirmPasswordError = '비밀번호가 일치하지 않습니다.';
      }

      // 기존 비밀번호와 동일한지 확인
      if (this.newPassword === this.currentPassword) {
        this.newPasswordError = '기존 비밀번호와 동일합니다.';
      }

      // 조건에 따라 alert 출력
      if (this.newPasswordError || this.confirmPasswordError) {
        if (this.newPasswordError) {
          alert(this.newPasswordError);
        } else if (this.confirmPasswordError) {
          alert(this.confirmPasswordError);
        }
        return; // 추가 검사 생략
      }

      // 비밀번호가 유효하고 확인이 일치할 때 메시지 출력
      if (this.validatePassword(this.newPassword) && this.newPassword === this.confirmPassword) {
        this.message = '비밀번호가 변경되었습니다.';
        this.newPassword = '';
        this.confirmPassword = '';
        this.$router.push('/settings'); // 설정 페이지로 이동
      }
    },
  },
};
</script>

<style scoped>
.password-change {
  width: 320px;
  padding: 20px;
  border-radius: 8px;
}

h2 {
  text-align: left; /* 왼쪽 정렬 */
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-input::placeholder {
  color: #999; /* Placeholder color */
}

.form-input:focus::placeholder {
  color: transparent; /* Hide placeholder on focus */
}

.submit-button {
  width: 100%;
  padding: 10px;
  margin-top: 250px; /* 버튼과 입력란 사이의 간격 */
  background-color: #6981D9;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.message {
  text-align: center;
  margin-top: 15px;
  color: #28a745; /* 성공 메시지 색상 */
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px; /* 오류 메시지 간격 */
}
</style>