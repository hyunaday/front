<template>
  <div class="main-container">
    <div class="content-wrapper">
      <header class="header">
        <img src="../assets/images/logo.png" alt="Logo" class="header-logo" />
      </header>
      <br />
      <br />
      <br />
      <br />
      <main class="main-content">
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="email">이메일</label>
            <input type="text" id="email" v-model="email" placeholder="아이디 입력" />
          </div>
          <br />
          <div class="input-group">
            <label for="password">비밀번호</label>
            <div class="password-container">
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="비밀번호 입력"
              />
              <a href="#" class="forgot-password">비밀번호를 잊으셨나요?</a>
            </div>
          </div>
          <br />
          <button type="submit" class="login-btn">로그인</button>
          <div class="signup-link">
            <p>처음 오셨나요?</p>
            <a @click.prevent="$router.push('/signup')" class="signup-btn">회원가입</a>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
import apiClient from '../api/axios.js'; // Axios 설정 파일을 임포트

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleSubmit() {
      const loginData = {
        memberId: this.email,
        password: this.password
      };

      try {
        // 로그인 요청
        const response = await apiClient.post('/member/login', loginData);

        if (response.data.isSuccess) {
          // 로그인 성공
          alert('로그인 성공!');
          // 토큰 저장 (localStorage나 Vuex 등을 사용할 수 있음)
          localStorage.setItem('accessToken', response.data.result.accessToken);

          // 메인 페이지로 이동
          this.$router.push('/');
        } else {
          // 로그인 실패 시 메시지
          alert(`로그인 실패: ${response.data.message || '알 수 없는 오류'}`);
        }
      } catch (error) {
        console.error('로그인 오류:', error);
        if (error.response) {
          alert(`서버 오류: ${error.response.data.message || '알 수 없는 오류'}`);
        } else {
          alert('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.');
        }
      }
    }
  }
};
</script>

<style scoped>
/* 스타일링은 기존 코드를 유지 */
.content-wrapper {
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* header */
.header {
  color: white;
  text-align: center;
  padding: 10px 0;
  position: relative;
}
.header-logo {
  width: 300px;
  height: auto;
  position: absolute;
  top: 5px;
  left: 30px;
}

/* main-content */
.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
form {
  width: 300px;
}
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
}
.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.password-container {
  position: relative;
  width: 100%;
}
.forgot-password {
  position: absolute;
  right: 0;
  bottom: -25px;
  font-size: 0.9em;
  color: #6981d9;
  text-decoration: none;
}
.forgot-password:hover {
  text-decoration: underline;
}
.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #6981d9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
.signup-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.signup-btn {
  font-size: 0.9em;
  color: #6981d9;
  text-decoration: none;
  margin-top: 5px;
}
.signup-btn:hover {
  text-decoration: underline;
}
</style>
