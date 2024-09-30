<template>
    <div class="main-container">
      <div class="form-container">
        <label for="nameInput" class="form-label">
          이메일을 입력해주세요.
        </label>
        <label class="name-label">
          이메일
        </label>
        <input
          type="text"
          id="nameInput"
          class="custom-input"
          v-model="email"
          @input="validateEmail"
        />
        <div class="button-wrapper">
          <button class="custom-button" @click="handleNext">
            다음
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      validateEmail() {
        // 이메일 유효성 검사 로직 추가
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
      },
      handleNext() {
        if (this.email.trim() && this.validateEmail()) {
          this.$emit('next', this.email.trim());
        } else {
          alert('유효한 이메일을 입력해주세요.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .main-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  
  .form-container {
    width: 100%;
    max-width: 360px;
    text-align: center;
    position: relative;
  }
  
  .form-label {
    position: absolute;
    top: -160px;
    left: 35px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  
  .name-label {
    position: absolute;
    top: -100px;
    left: 35px;
    font-size: 14px;
    color: #6981D9;
  }
  
  .custom-input {
    width: 80%;
    height: 35px;
    border: none;
    border-bottom: 1px solid #9f9f9f;
    text-align: left;
    margin-bottom: 40px;
    font-size: 14px;
    outline: none; /* 포커스 시 외곽선 제거 */
    -webkit-tap-highlight-color: transparent; /* 모바일에서 탭 시 하이라이트 제거 */
  }
  
  .custom-input:focus {
    border-color: #6981D9; /* 포커스 시 테두리 색상 변경 (선택사항) */
  }
  
  /* 버튼을 따로 감싸는 div를 추가하고, 아래로 배치 */
  .button-wrapper {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 230px;
    width: 100%;
    padding-bottom: 20px;
  }
  
  .custom-button {
    width: 80%;
    height: 50px;
    background-color: #6981D9;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
  }
  </style>
