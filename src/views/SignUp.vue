<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <!-- 로고 이미지 -->
    <img src="../assets/images/logo.png" alt="logo" class="logo mb-3" />

    <!-- 타이틀 -->
    <h2 class="text-center mb-4">회원 가입</h2>

    <!-- 회원가입 폼 -->
    <form @submit.prevent="handleSubmit" class="signup-form w-100 px-3">
      <div class="mb-3">
        <label for="name" class="form-label"
          >이름<span class="text-danger">*</span></label
        >
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="name"
          placeholder="이름을 입력하세요"
          @input="validateName"
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
          v-model="phone"
          placeholder="연락처를 입력하세요"
          @input="validateNumber($event)"
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label"
          >이메일<span class="text-danger">*</span></label
        >
        <div class="d-flex">
          <input
            type="text"
            class="form-control me-2"
            id="emailPrefix"
            v-model="emailPrefix"
            placeholder="이메일 주소"
            required
          />
          <span class="align-self-center mx-2">@</span>
          <select
            class="form-select me-2"
            v-model="emailDomain"
            @change="handleDomainChange"
          >
            <option value="">선택</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="nate.com">nate.com</option>
            <option value="direct">직접입력</option>
          </select>
          <input
            v-if="emailDomain === 'direct'"
            type="text"
            class="form-control"
            v-model="customDomain"
            required
          />
        </div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label"
          >비밀번호<span class="text-danger">*</span></label
        >
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          placeholder="비밀번호를 입력하세요"
          minlength="8"
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
          v-model="confirmPassword"
          placeholder="비밀번호를 확인하세요"
          minlength="8"
          required
        />
      </div>

      <!-- 다음 버튼 -->
      <button type="submit" class="btn btn-primary w-100 py-2">다음</button>
    </form>
  </div>
</template>

<script>
import apiClient from "../api/axios.js"; // Axios 설정 파일을 임포트

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      phone: "",
      emailPrefix: "",
      emailDomain: "",
      customDomain: "",
      password: "",
      confirmPassword: "",
      authToken: "", // 휴대폰 인증 완료 시 받은 토큰을 저장할 새 필드
    };
  },
  methods: {
    validateNumber(event) {
      const input = event.target.value;
      event.target.value = input.replace(/[^0-9]/g, ""); // 숫자가 아닌 값은 제거
    },
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
        return;
      }

      // signupData 객체 생성
      const signupData = {
        memberId: this.email, // email 값을 memberId로 사용
        email: this.email,    // email 값을 그대로 사용
        password: this.password,
        phoneNum: this.phone,
        name: this.name,
      };

      console.log('회원가입 데이터:', signupData);

      try {
        // API 요청 URL에 authToken을 쿼리 파라미터로 추가
        const response = await apiClient.post(`/member/signUp?authToken=${this.authToken}`, signupData);
        console.log('서버 응답:', response);

        if (response.data.isSuccess) {
          alert('회원가입이 성공적으로 완료되었습니다.');
          this.$router.push('/login');
        } else {
          alert(`회원가입에 실패했습니다: ${response.data.message || '알 수 없는 오류'}`);
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
        if (error.response) {
          console.error('오류 응답:', error.response.data);
          console.error('오류 상태:', error.response.status);
          console.error('오류 헤더:', error.response.headers);
          alert(`서버 오류: ${error.response.data.message || '알 수 없는 오류'}`);
        } else if (error.request) {
          console.error('요청 오류:', error.request);
          alert('서버에 연결할 수 없습니다. 네트워크 연결을 확인해 주세요.');
        } else {
          console.error('기타 오류:', error.message);
          alert(`오류가 발생했습니다: ${error.message}`);
        }
      }
    },
    validateName(event) {
      const input = event.target.value;
      this.name = input.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z\s]/g, "");
    },
    handleDomainChange() {
      if (this.emailDomain !== "direct") {
        this.customDomain = "";
      }
    },
  },
  computed: {
    email() {
      if (this.emailDomain === "direct") {
        return `${this.emailPrefix}@${this.customDomain}`;
      }
      return this.emailDomain ? `${this.emailPrefix}@${this.emailDomain}` : "";
    },
  },
};
</script>

<style scoped>
/* 폰트 설정 */
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}

body,
h2,
label,
button,
input {
  font-family: "Pretendard", sans-serif;
}

/* 메인 컨테이너 */
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
}

.logo {
  width: 300px;
  margin-bottom: 20px;
}

/* 모달 창 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  width: 320px;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 1.1rem;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
}

/* 리스트 항목 스타일 */
.list-group {
  margin-bottom: 30px;
  font-size: 0.85rem;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eaeaea;
  border: none;
}

.arrow {
  font-size: 14px;
  color: #b0b0b0;
}

/* 커스텀 체크박스 스타일 */
.custom-checkbox input[type="checkbox"] {
  display: none;
}

.custom-checkbox input[type="checkbox"] + label:before {
  content: "\2713";
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #6981d9;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  background-color: white;
}

.custom-checkbox input[type="checkbox"]:checked + label:before {
  background-color: #6981d9;
  color: white;
}

/* 버튼 스타일 */
.btn-primary,
.btn-secondary {
  width: 100%;
  margin-top: 10px;
  padding: 10px 0;
}

.btn-primary {
  background-color: #6981d9;
  border-color: #6981d9;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

input::placeholder {
  font-size: 0.8em;
  color: lightgray;
}
</style>
