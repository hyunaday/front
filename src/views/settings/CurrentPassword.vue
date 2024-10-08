<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <div class="password-check">
      <h2>안전한 비밀번호 변경을 위해 
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
        <button type="submit" class="submit-button">다음</button>
        <button type="button" @click="goBack" class="back-button">돌아가기</button>
      </form>
    </div>
    <!-- <FooterNav /> -->
  </div>
</template>

<script>
import axios from 'axios';
import FooterNav from '../../components/FooterNav.vue';

export default {
  name: "ChangePassword",
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
          this.$router.push('/changepassword?authToken=' + this.authToken + '&code=' + this.code);
        } else {
          this.errorMessage = '현재 비밀번호를 확인해주세요.';
        }
      } catch (error) {
        this.errorMessage = '서버 오류가 발생했습니다. 다시 시도해주세요.';
      }
    },
    goBack() {
      this.$router.back();
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

.submit-button{
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #6981D9;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.back-button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #EEEFF3;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button {
  margin-top: 300px; /* 유지 */
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
