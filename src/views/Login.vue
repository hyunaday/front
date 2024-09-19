<template>
  <div class="container">
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
              <input
                type="password"
                id="password"
                placeholder="비밀번호 입력"
              />
              <a href="#" class="forgot-password">비밀번호를 잊으셨나요?</a>
            </div>
          </div>
          <br />
          <div class="simple-login">
            <p>간편로그인</p>
            <div class="logo-links">
              <a href="#" class="logo-link">
                <img
                  src="../assets/images/logo1.png"
                  alt="Logo 1"
                  class="logo-image"
                />
              </a>
              <a href="#" class="logo-link">
                <img
                  src="../assets/images/logo2.png"
                  alt="Logo 2"
                  class="logo-image"
                />
              </a>
              <a href="#" class="logo-link">
                <img
                  src="../assets/images/logo3.png"
                  alt="Logo 3"
                  class="logo-image"
                />
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
      <footer class="footer">
        <p>© 2024 Team2rum</p>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
};
</script>
<style scoped>
/* 전체 페이지를 감싸는 컨테이너 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #e0e0e0; /* 양쪽 회색 배경 */
}
/* 가운데 내용 레이아웃 */
.content-wrapper {
  width: 100%;
  max-width: 1200px; /* 페이지 최대 너비 */
  background-color: #fff; /* 가운데 흰색 배경 */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  color: white;
  text-align: center;
  padding: 10px 0;
  position: relative;
}
.header-logo {
  width: 300px; /* 이미지 크기 조정 */
  height: auto;
  position: absolute;
  top: 5px;
  left: 20px;
}
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
  width: 100%; /* 비밀번호 입력 필드를 이메일 입력 필드처럼 펼치기 */
}
.forgot-password {
  position: absolute;
  right: 0;
  bottom: -25px; /* 위치 조정: 비밀번호 입력 상자 아래 */
  font-size: 0.9em;
  color: #6981d9;
  text-decoration: none;
}
.forgot-password:hover {
  text-decoration: underline;
}
.simple-login {
  display: flex; /* flexbox를 사용하여 가운데 정렬 */
  flex-direction: column; /* 수직 방향으로 정렬 */
  align-items: center; /* 수평 방향으로 가운데 정렬 */
  margin-top: 20px; /* 비밀번호 찾기 링크와 간편로그인 텍스트 사이의 간격 */
}
.simple-login p {
  font-size: 0.9em;
  color: #777; /* 회색 폰트 */
  margin: 0; /* 기본 여백 제거 */
}
.logo-links {
  display: flex; /* flexbox를 사용하여 로고를 가로로 정렬 */
  justify-content: center; /* 가로 방향 중앙 정렬 */
  gap: 15px; /* 로고 사이의 간격 */
  margin-top: 10px; /* 간편로그인 텍스트와 로고 사이의 간격 */
}
.logo-link {
  display: flex;
}
.logo-image {
  width: 40px; /* 로고 이미지 크기 조정 */
  height: auto;
}
.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #6981d9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px; /* 버튼을 아래로 내림 */
}
.signup-link {
  display: flex;
  flex-direction: column; /* 수직 방향으로 정렬 */
  align-items: center; /* 수평 방향으로 가운데 정렬 */
  margin-top: 20px; /* 로그인 버튼과 회원가입 텍스트 사이의 간격 */
}
.signup-link p {
  font-size: 0.9em;
  color: #777; /* 회색 폰트 */
  margin: 0; /* 기본 여백 제거 */
}
.signup-btn {
  font-size: 0.9em;
  color: #6981d9; /* 링크 색상 */
  text-decoration: none;
  margin-top: 5px; /* 텍스트와 링크 사이의 간격 */
}
.signup-btn:hover {
  text-decoration: underline;
}
</style>
