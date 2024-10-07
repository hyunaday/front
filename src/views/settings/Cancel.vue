<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <div class="password-check">
      <h2>회원탈퇴를 희망하실 경우 
          <br>현재 비밀번호를 입력해주세요.</h2>
      <br>
      <div>현재 비밀번호</div>
      <form @submit.prevent="checkCurrentPassword">
        <div class="form-group">
          <label for="current-password"></label>
          <input
            type="password"
            id="current-password"
            v-model="currentPassword"
            class="form-input"
            required
          />
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
        <button type="submit" class="submit-button">탈퇴하기</button>
      </form>
    </div>
    <!-- <FooterNav /> -->
  </div>
</template>

<script>
import axios from 'axios';
import FooterNav from '../../components/FooterNav.vue';

export default {
  name: "CancelMembership",
  components: {
    FooterNav,
  },
  data() {
    return {
      currentPassword: '',
      errorMessage: '',
      authToken: this.$route.query.authToken,
      code: this.$route.query.code,
    };
  },
  
  methods: {
    async checkCurrentPassword() {
      try {
        const response = await axios.post('/member/login', {
          password: this.currentPassword
        });

        if (response.data.valid) {
          await axios.post('/api/member/cancel', {
            password: this.currentPassword
          });
          alert('회원탈퇴가 완료되었습니다.');
          this.$router.push('/login');
        } else {
          this.errorMessage = '현재 비밀번호를 확인해주세요.';
        }
      } catch (error) {
        this.errorMessage = '서버 오류가 발생했습니다. 다시 시도해주세요.';
      }
    }
  },
};
</script>

<style scoped>
.password-check {
  width: 320px;
  padding: 20px;
  border-radius: 8px;
}

h2 {
  text-align: left;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  margin-top: 340px;
  background-color: #d97c6c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}


.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
