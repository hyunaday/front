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
        <div class="d-flex align-items-center">
          <input
            type="text"
            class="form-control form-control-sm me-2"
            id="phone"
            v-model="phone"
            placeholder="연락처를 입력하세요"
            @input="validateNumber"
            required
            style="width: 70%"
          />
          <button
            type="button"
            class="btn btn-secondary btn-sm verification-btn"
            @click="sendVerificationCode"
            style="width: 30%"
          >
            인증번호 전송
          </button>
        </div>
      </div>

      <!-- 인증번호 입력 필드 (조건부 렌더링) -->
      <div v-if="showVerificationInput" class="mb-3">
        <label for="verificationCode" class="form-label">인증번호</label>
        <div class="d-flex align-items-center">
          <input
            type="text"
            class="form-control form-control-sm me-2"
            id="verificationCode"
            v-model="verificationCode"
            placeholder="인증번호를 입력하세요"
            required
            style="width: 70%"
          />
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="verifyCode"
            style="width: 30%"
          >
            확인
          </button>
        </div>
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
      <button
        type="button"
        class="btn btn-primary w-100 py-2"
        @click="openBottomSheet"
        :disabled="!isFormValid"
      >
        다음
      </button>
    </form>

    <!-- 바텀시트 모달 (Bootstrap 이용) -->
    <div
      class="modal fade"
      id="agreementModal"
      tabindex="-1"
      aria-labelledby="agreementModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-bottom">
        <!-- 이 부분을 수정 -->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="agreementModalLabel">
              모두의 결제를 사용하려면 동의가 필요해요
            </h5>
          </div>
          <div class="modal-body">
            <!-- 체크박스 목록 -->
            <div class="list-group">
              <div class="list-group-item">
                <div class="custom-checkbox">
                  <input
                    type="checkbox"
                    id="terms1"
                    v-model="agreement.terms1"
                  />
                  <label for="terms1"
                    >모두의결제 회원 약관 및 동의사항(필수)</label
                  >
                </div>
              </div>
              <div class="list-group-item">
                <div class="custom-checkbox">
                  <input
                    type="checkbox"
                    id="terms2"
                    v-model="agreement.terms2"
                  />
                  <label for="terms2"
                    >본인 확인 서비스 약관 및 동의사항(필수)</label
                  >
                </div>
              </div>
              <div class="list-group-item">
                <div class="custom-checkbox">
                  <input
                    type="checkbox"
                    id="terms3"
                    v-model="agreement.terms3"
                  />
                  <label for="terms3">마이데이터 서비스 이용약관(필수)</label>
                </div>
              </div>
              <div class="list-group-item">
                <div class="custom-checkbox">
                  <input
                    type="checkbox"
                    id="terms4"
                    v-model="agreement.terms4"
                  />
                  <label for="terms4"
                    >마케팅 목적 약관 및 수신 동의 사항(선택)</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex flex-column">
            <button
              type="button"
              class="btn btn-primary w-100"
              @click="agreeAndSubmit"
            >
              동의하고 가입하기
            </button>
            <button
              type="button"
              class="btn btn-light w-100 mt-2"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../api/axios.js"; // Axios 설정 파일을 임포트
import { Modal } from "bootstrap"; // Bootstrap 모달 가져오기

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
      authToken: "", // 인증 성공 시 받을 토큰
      showVerificationInput: false,
      verificationCode: "",
      agreement: {
        terms1: false,
        terms2: false,
        terms3: false,
        terms4: false, // 선택 항목
      },
    };
  },
  methods: {
    validateNumber(event) {
      const input = event.target.value;
      event.target.value = input.replace(/[^0-9]/g, ""); // 숫자가 아닌 값 제거
    },
    openBottomSheet() {
      const modal = new Modal(document.getElementById("agreementModal"));
      modal.show();
    },
    agreeAndSubmit() {
      if (
        !this.agreement.terms1 ||
        !this.agreement.terms2 ||
        !this.agreement.terms3
      ) {
        alert("필수 약관에 동의하셔야 가입이 가능합니다.");
        return;
      }

      // 회원가입 요청 전송
      this.handleSubmit();
    },
    async sendVerificationCode() {
      try {
        const response = await apiClient.get(
          `/message/send?phoneNum=${this.phone}`
        );
        if (response.data.isSuccess) {
          alert("인증번호가 전송되었습니다.");
          this.showVerificationInput = true; // 인증번호 입력 필드를 표시
        } else {
          alert("인증번호 전송에 실패했습니다.");
        }
      } catch (error) {
        console.error("인증번호 전송 오류:", error);
        alert("인증번호 전송 중 오류가 발생했습니다.");
      }
    },
    async verifyCode() {
      try {
        const verificationData = {
          phoneNum: this.phone,
          authNum: this.verificationCode,
        };

        const response = await apiClient.post(
          "/message/confirm",
          verificationData
        );

        if (response.data.isSuccess && response.data.result.isSuccess) {
          alert("인증번호가 확인되었습니다.");
        } else {
          alert("인증번호가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error("인증번호 확인 오류:", error);
        alert("인증번호 확인 중 오류가 발생했습니다.");
      }
    },

    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
        return;
      }

      const signupData = {
        memberId: this.email,
        email: this.email,
        password: this.password,
        phoneNum: this.phone,
        name: this.name,
      };

      try {
        const response = await apiClient.post(
          `/member/signUp?authToken=${this.authToken}`,
          signupData
        );
        if (response.data.isSuccess) {
          alert("회원가입이 성공적으로 완료되었습니다.");
          const modalElement = document.getElementById("agreementModal");
          if (modalElement) {
            const modalInstance = Modal.getInstance(modalElement);
            if (modalInstance) {
              modalInstance.hide();
            }
          }
          this.$router.push("/login");
        } else {
          alert(
            `회원가입에 실패했습니다: ${
              response.data.message || "알 수 없는 오류"
            }`
          );
        }
      } catch (error) {
        console.error("회원가입 오류:", error);
        let errorMessage = "회원가입 중 오류가 발생했습니다.";
        if (error.response) {
          // 서버에서 응답을 받았지만 2xx 범위를 벗어난 상태 코드인 경우
          errorMessage = `회원가입 오류: ${
            error.response.data.message || error.response.statusText
          }`;
        } else if (error.request) {
          // 요청이 전송되었지만 응답을 받지 못한 경우
          errorMessage =
            "서버에 연결할 수 없습니다. 네트워크 연결을 확인해 주세요.";
        } else {
          // 요청 설정 중에 오류가 발생한 경우
          errorMessage = `회원가입 요청 중 오류 발생: ${error.message}`;
        }
        alert(errorMessage);
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
    isFormValid() {
      return (
        this.name.trim() !== "" &&
        this.phone.trim() !== "" &&
        this.emailPrefix.trim() !== "" &&
        this.emailDomain !== "" &&
        this.password.trim() !== "" &&
        this.confirmPassword.trim() !== "" &&
        this.password === this.confirmPassword
      );
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
  font-size: 0.9rem;
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
  color: white;
  font-size: 0.85em;
}

input::placeholder {
  font-size: 0.8em;
  color: lightgray;
}

.form-control-sm,
.btn-sm {
  height: 38px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.verification-btn {
  margin-top: -1px; /* 버튼을 약간 위로 이동 */
}

.btn-sm {
  margin-top: -1px; /* 버튼을 약간 위로 이동 */
}

/* 바텀시트 모달 스타일 수정 */
.modal-dialog-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 15px;
  margin: 0;
  transform: translateY(100%);
  animation: slide-up 0.3s ease-out forwards;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-content {
  border-radius: 20px 20px 0 0;
  padding-bottom: 20px;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
  width: 72.5%;
  max-width: 500px;
  margin: 0 auto;
}

/* 모바일 기기를 위한 미디어 쿼리 */
@media (min-width: 576px) {
  .modal-dialog-bottom {
    max-width: 500px;
    margin: 0 auto;
  }
}

/* 바텀시트 체크박스 리스트 스타일 */
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
.btn-primary {
  background-color: #6981d9;
  border-color: #6981d9;
}

.btn-light {
  background-color: #f5f5f5;
  color: #333;
}

/* 모달 헤더 스타일 수정 */
.modal-header {
  border-bottom: none;
  padding-bottom: 0;
}

.modal-title {
  width: 100%;
  text-align: center;
  font-size: 0.9rem; /* 텍스트 크기 줄임 */
  font-weight: bold;
}

/* 체크박스 스타일 수정 */
.custom-checkbox input[type="checkbox"] + label {
  display: flex;
  align-items: center;
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
  margin-right: 10px; /* 체크박스와 텍스트 사이 간격 추가 */
}

.custom-checkbox input[type="checkbox"]:checked + label:before {
  background-color: #6981d9;
  color: white;
}

.btn-primary:disabled {
  background-color: #b0b0b0;
  border-color: #b0b0b0;
  cursor: not-allowed;
}
</style>
