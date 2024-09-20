<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <!-- 로고 이미지 -->
    <img src="../assets/images/logo.png" alt="logo" class="logo mb-3" />

    <!-- 타이틀 -->
    <h2 class="text-center mb-4">회원 가입</h2>

    <!-- 회원가입 폼 -->
    <form class="signup-form w-100 px-3">
      <div class="mb-3">
        <label for="name" class="form-label"
          >이름<span class="text-danger">*</span></label
        >
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="이름을 입력하세요"
          required
        />
      </div>

      <div class="mb-3">
        <label for="phone" class="form-label"
          >연락처<span class="text-danger">*</span></label
        >
        <input
          type="text"
          class="form-control"
          id="phone"
          placeholder="연락처를 입력하세요"
          required
        />
      </div>

      <div class="mb-3">
        <label for="idNumber" class="form-label"
          >주민등록번호<span class="text-danger">*</span></label
        >
        <input
          type="text"
          class="form-control"
          id="idNumber"
          placeholder="주민등록번호를 입력하세요"
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label"
          >이메일<span class="text-danger">*</span></label
        >
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="이메일을 입력하세요"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label"
          >비밀번호<span class="text-danger">*</span></label
        >
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>

      <div class="mb-3">
        <label for="confirmPassword" class="form-label"
          >비밀번호 확인<span class="text-danger">*</span></label
        >
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          placeholder="비밀번호를 확인하세요"
          required
        />
      </div>

      <!-- 다음 버튼 -->
      <button
        type="button"
        class="btn btn-primary w-100 py-2"
        @click="openPopup"
      >
        다음
      </button>
    </form>

    <!-- 하단 팝업 -->
    <div v-if="isPopupOpen" class="overlay" @click="closePopup"></div>
    <div v-if="isPopupOpen" class="terms-popup">
      <h3>모두의 결제를 사용하려면 동의가 필요해요</h3>
      <ul class="terms-list">
        <li>
          <input type="checkbox" id="term1" />
          <label for="term1">모두의결제 회원 약관 및 동의 사항 (필수)</label>
        </li>
        <li>
          <input type="checkbox" id="term2" />
          <label for="term2">본인 확인 서비스 약관 및 동의 사항 (필수)</label>
        </li>
        <li>
          <input type="checkbox" id="term3" />
          <label for="term3">마이데이터 서비스 이용 약관 (필수)</label>
        </li>
        <li>
          <input type="checkbox" id="term4" />
          <label for="term4">마케팅 목적 약관 및 수신 동의 사항 (선택)</label>
        </li>
      </ul>
      <button class="btn btn-primary w-100" @click="agree">
        동의하고 가입하기
      </button>
      <button class="btn btn-secondary w-100 mt-2" @click="closePopup">
        닫기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPopupOpen: false,
    };
  },
  methods: {
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    agree() {
      // 약관 동의 처리
      this.isPopupOpen = false;
      alert('동의 완료!');
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
    format('woff');
  font-weight: 400;
  font-style: normal;
}

body,
h2,
label,
button,
input {
  font-family: 'Pretendard', sans-serif;
}

.main-container {
  width: 360px;
  height: 800px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative; /* z-index 작동을 위한 relative 설정 */
}

.logo {
  width: 300px;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.8rem;
  color: #555555;
}

.signup-form {
  width: 100%;
}

label {
  font-size: 1rem;
  color: #555555;
  font-size: 0.87em; /* 폰트 크기를 줄입니다 */
}

.form-control:focus {
  border-color: #42a5f5;
  box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
}

button {
  background-color: #6981d9;
  border: none;
}

button:hover {
  background-color: #44548c;
}

/* 하단 팝업 스타일 */
.terms-popup {
  position: fixed;
  bottom: 20px; /* 화면 하단에서의 거리 */
  left: 50%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  width: 22%; /* 메인 컨테이너에 맞게 수정 */
  max-width: 360px; /* 최대 너비 설정 */
  transform: translate(-50%, 0); /* 수평 가운데 정렬 */
  z-index: 1002; /* 가장 위에 위치 */
}

.terms-popup h3 {
  margin-bottom: 20px;
  font-size: 0.92em; /* 폰트 크기를 줄입니다 */
  font-weight: 900; /* 제일 굵은 볼드체로 설정합니다 */
}

.terms-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  text-align: left;
}

.terms-list li {
  margin-bottom: 10px;
}

.terms-list input {
  margin-right: 10px;
}

/* 오버레이 스타일 */
.overlay {
  position: fixed;
  top: 0;
  left: 50;
  width: 100vw; /* 전체 화면 너비 */
  height: 100vh; /* 전체 화면 높이 */
  background-color: rgba(0, 0, 0, 0.5); /* 검정색 불투명 배경 */
  z-index: 1001; /* 팝업보다 아래에 위치하도록 설정 */
  width: 50%;
  max-width: 360px; /* 최대 너비 설정 */
}

.btn-primary {
  background-color: #6981d9;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 5px;
}

.btn-primary:hover {
  background-color: #357abd;
}

.btn-secondary {
  background-color: #ccc;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 5px;
}
</style>
