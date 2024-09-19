<template>
  <div class="main-container">
    <div class="content-wrapper">
      <header class="header">
        <!-- 상대 경로로 이미지 추가 -->
        <img src="../assets/images/logo.png" alt="Logo" class="header-logo" />
      </header>
      <br />
      <br />
      <br />
      <br />
      <main class="main-content">
        <form>
          <div class="input-group">
            <label for="username">이메일</label>
            <input type="text" id="username" placeholder="아이디 입력" />
          </div>
          <br />
          <div class="input-group">
            <label for="password">비밀번호</label>
            <div class="password-container">
              <input type="password" id="password" placeholder="비밀번호 입력" />
              <a href="#" class="forgot-password">비밀번호를 잊으셨나요?</a>
            </div>
          </div>
          <br />
          <div class="simple-login">
            <p>간편로그인</p>
            <div class="logo-links">
              <a href="#" class="logo-link">
                <img src="../assets/images/kakao.png" alt="Logo 1" class="logo-image" />
              </a>
              <a href="#" class="logo-link">
                <img src="../assets/images/naver.png" alt="Logo 2" class="logo-image" />
              </a>
              <a href="#" class="logo-link">
                <img src="../assets/images/google.png" alt="Logo 3" class="logo-image" />
              </a>
            </div>
          </div>
          <br />
          <button type="submit" class="login-btn">로그인</button>
          <div class="signup-link">
            <p>처음 오셨나요?</p>
            <a href="#" class="signup-btn">회원가입</a>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style scoped>
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
  color: #6981D9;
  text-decoration: none;
}
.forgot-password:hover {
  text-decoration: underline;
}
.simple-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.simple-login p {
  font-size: 0.9em;
  color: #777;
  margin: 0;
}
.logo-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}
.logo-link {
  display: flex;
}
.logo-image {
  width: 40px;
  height: auto;
}
.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #6981D9;
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
.signup-link p {
  font-size: 0.9em;
  color: #777;
  margin: 0;
}
.signup-btn {
  font-size: 0.9em;
  color: #6981D9;
  text-decoration: none;
  margin-top: 5px;
}
.signup-btn:hover {
  text-decoration: underline;
}
</style>
