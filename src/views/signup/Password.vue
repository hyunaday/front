<template>
  <div class="main-container">
    <div class="form-container">
      <div class="pwform">
        <label for="passwordInput" class="form-label">
          비밀번호를 입력해주세요.
        </label>
        <label class="input-label"> 비밀번호 </label>
        <input
          type="password"
          id="passwordInput"
          class="custom-input"
          v-model="password"
        />
      </div>

      <div class="pwcheckform">
        <label class="input-label2"> 비밀번호 확인 </label>
        <input
          type="password"
          id="confirmPasswordInput"
          class="custom-input2"
          v-model="confirmPassword"
        />
      </div>
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
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleNext() {
      if (this.password && this.confirmPassword) {
        if (!this.isValidPassword(this.password)) {
          alert("비밀번호는 최소 8자리 이상이어야 합니다.");
        } else if (this.password === this.confirmPassword) {
          this.$emit('next', this.password);
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      } else {
        alert("비밀번호를 모두 입력해주세요.");
      }
    },
    isValidPassword(password) {
      return password.length >= 8;
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

.input-label {
  position: absolute;
  left: 35px;
  font-size: 14px;
  color: #6981d9;
}

.input-label2 {
  position: absolute;
  left: 35px;
  font-size: 14px;
  color: #6981d9;
  top: 45px;
}

.input-label:nth-of-type(2) {
  top: -100px;
}

.input-label:nth-of-type(3) {
  top: 0px;
}

.custom-input {
  width: 80%;
  height: 35px;
  border: none;
  border-bottom: 1px solid #9f9f9f;
  text-align: left;
  margin-bottom: 60px; /* 40px에서 60px로 증가 */
  font-size: 14px;
  outline: none; /* 포커스 시 외곽선 제거 */
  -webkit-tap-highlight-color: transparent; /* 모바일에서 탭 시 하이라이트 제거 */
  position: relative;
  top: -60px; /* 입력창을 20px 위로 이동 */
}

.custom-input2 {
  width: 80%;
  height: 35px;
  border: none;
  border-bottom: 1px solid #9f9f9f;
  text-align: left;
  margin-bottom: 60px; /* 40px에서 60px로 증가 */
  font-size: 14px;
  outline: none; /* 포커스 시 외곽선 제거 */
  -webkit-tap-highlight-color: transparent; /* 모바일에서 탭 시 하이라이트 제거 */
  position: relative;
  top: -10px; /* 입력창을 20px 위로 이동 */
}

.custom-input:focus {
  border-color: #6981d9; /* 포커스 시 테두리 색상 변경 (선택사항) */
}

/* 버튼을 따로 감싸는 div를 추가하고, 아래로 배치 */
.button-wrapper {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 230px; /* 230px에서 210px로 변경 */
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
