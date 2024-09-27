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
      </form>
    </div>
    <!-- <FooterNav /> -->
  </div>
</template>

<script>
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
      validCurrentPassword: '12121212', // 임의의 비밀번호
    };
  },
  
  // api 연동
  methods: {
    async checkCurrentPassword() {
      const response = await this.$http.post('/api/member/logout', { password: this.currentPassword });
      
      if (response.data.valid) {
        this.$router.push('/changepassword');
      } else {
        this.errorMessage = '현재 비밀번호를 확인해주세요.';
      }
    },
  },
  // 확인용 : 임의 비밀번호 '123456' 설정
  methods: {
    checkCurrentPassword() {
      // 비밀번호 확인
      if (this.currentPassword === this.validCurrentPassword) {
        this.$router.push('/changepassword'); // 다음 페이지로 이동
      } else {
        this.errorMessage = '현재 비밀번호를 확인해주세요.';
      }
    },
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

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px; /* Optional: Add some space above the error message */
}
</style>
