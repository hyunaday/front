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
        <label for="idNumber" class="form-label"
          >주민등록번호<span class="text-danger">*</span></label
        >
        <div class="d-flex">
          <input
            type="text"
            class="form-control me-2"
            id="idNumberFront"
            v-model="idNumberFront"
            @input="validateNumber($event)"
            maxlength="6"
            required
          />
          <span class="align-self-center mx-2">-</span>
          <input
            type="password"
            class="form-control ms-2"
            id="idNumberBack"
            v-model="idNumberBack"
            @input="validateNumber($event)"
            maxlength="7"
            required
          />
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
      <button type="submit" class="btn btn-primary w-100 py-2">다음</button>
    </form>

    <!-- 팝업 모달 창 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">모두의 결제를 사용하려면 동의가 필요해요</h3>
        <ul class="list-group mb-3">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div class="custom-checkbox">
              <input
                type="checkbox"
                id="agreement1"
                v-model="agreement1"
                required
              />
              <label for="agreement1" class="ms-2">
                모두의결제 회원 약관 및 동의 사항 (필수)</label
              >
            </div>
            <span class="arrow">&gt;</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div class="custom-checkbox">
              <input
                type="checkbox"
                id="agreement2"
                v-model="agreement2"
                required
              />
              <label for="agreement2" class="ms-2">
                본인 확인 서비스 약관 및 동의 사항 (필수)</label
              >
            </div>
            <span class="arrow">&gt;</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div class="custom-checkbox">
              <input
                type="checkbox"
                id="agreement3"
                v-model="agreement3"
                required
              />
              <label for="agreement3" class="ms-2">
                마이데이터 서비스 이용약관 (필수)</label
              >
            </div>
            <span class="arrow">&gt;</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div class="custom-checkbox">
              <input type="checkbox" id="agreement4" v-model="agreement4" />
              <label for="agreement4" class="ms-2">
                마케팅 목적 약관 및 수신 동의 사항 (선택)</label
              >
            </div>
            <span class="arrow">&gt;</span>
          </li>
        </ul>
        <button @click="confirmAgreement" class="btn btn-primary w-100 py-2">
          동의하고 가입하기
        </button>
        <button @click="closeModal" class="btn btn-secondary w-100 mt-2">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      phone: '',
      idNumberFront: '',
      idNumberBack: '',
      emailPrefix: '',
      emailDomain: '',
      customDomain: '',
      password: '',
      confirmPassword: '',
      showModal: false, // 모달 창 보이기 여부
      agreement1: false,
      agreement2: false,
      agreement3: false,
      agreement4: false,
    };
  },
  methods: {
    // 숫자만 입력되도록 유효성 검사
    validateNumber(event) {
      const input = event.target.value;
      event.target.value = input.replace(/[^0-9]/g, ''); // 숫자가 아닌 값은 제거
    },
    // 비밀번호와 확인 비밀번호가 일치하는지 확인
    handleSubmit() {
      // 주민등록번호 조합
      const fullIdNumber = this.idNumberFront + this.idNumberBack;

      if (this.password !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
      } else if (fullIdNumber.length !== 13) {
        alert('주민등록번호를 올바르게 입력해주세요.');
      } else {
        // 비밀번호와 주민등록번호 검증이 완료되면 모달 창을 띄움
        this.showModal = true;
      }
    },
    // 동의하고 가입 버튼 클릭 시 처리
    confirmAgreement() {
      if (this.agreement1 && this.agreement2 && this.agreement3) {
        alert('회원 가입이 완료되었습니다.');
        this.closeModal();
        // 여기서 실제 회원 가입 처리 로직 추가 가능
      } else {
        alert('필수 동의 항목에 모두 체크해 주세요.');
      }
    },
    // 모달 창 닫기
    closeModal() {
      this.showModal = false;
    },
    // 이름 입력 필드에 글자만 입력되도록 유효성 검사
    validateName(event) {
      const input = event.target.value;
      this.name = input.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z\s]/g, '');
    },
    handleDomainChange() {
      if (this.emailDomain !== 'direct') {
        this.customDomain = '';
      }
    },
  },
  computed: {
    email() {
      if (this.emailDomain === 'direct') {
        return `${this.emailPrefix}@${this.customDomain}`;
      }
      return this.emailDomain ? `${this.emailPrefix}@${this.emailDomain}` : '';
    },
  },
};
</script>

<style scoped>
/* 폰트 설정 */
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
.custom-checkbox input[type='checkbox'] {
  display: none;
}

.custom-checkbox input[type='checkbox'] + label:before {
  content: '\2713';
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #6981d9;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  background-color: white;
}

.custom-checkbox input[type='checkbox']:checked + label:before {
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
