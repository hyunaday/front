<template>
    <div class="main-container">
      <div class="form-container">
        <label for="nameInput" class="form-label">
          본인인증 번호를 입력해주세요.
        </label>
        <label class="name-label"> 인증번호 </label>
        <input
          type="tel"
          id="nameInput"
          class="custom-input"
          v-model="verificationCode"
          @input="filterInput"
        />
        <div class="button-wrapper">
          <button class="custom-button" @click="handleNext">다음</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        verificationCode: "",
      };
    },
    methods: {
      filterInput(event) {
        this.verificationCode = event.target.value.replace(/[^0-9]/g, "");
      },
      handleNext() {
        if (this.verificationCode) {
          // 여기서 실제로 인증번호를 확인하는 API를 호출해야 합니다.
          // 예시로 항상 성공하는 것으로 가정합니다.
          alert('인증이 완료되었습니다.');
          this.$emit('next', this.verificationCode);
        } else {
          alert("인증번호를 입력해주세요.");
        }
      },
    },
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
    color: #6981d9;
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
    border-color: #6981d9; /* 포커스 시 테두리 색상 변경 (선택사항) */
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
    background-color: #6981d9;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
  }
  </style>
