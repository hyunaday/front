<template>
  <div class="main-container">
    <div class="form-container">
      <div class="pwform">
        <label for="phoneInput" class="form-label">
          휴대폰 번호를 입력해주세요.
        </label>
        <label class="input-label"> 휴대폰 번호 </label>
        <div class="input-button-group">
          <input
            type="tel"
            id="phoneInput"
            class="custom-input1"
            v-model="phoneNumber"
            @input="filterInput"
          />
          <button class="confirm-button1" @click="sendVerification">인증번호 전송</button>
        </div>
      </div>

      <!-- 인증번호 입력 폼: 처음에는 숨기고, 인증번호 전송 후에 표시 -->
      <div v-if="showVerificationInput" class="pwcheckform">
        <label class="input-label2"> 인증번호 </label>
        <div class="input-button-group verification-group">
          <input
            type="text"
            id="verificationInput"
            class="custom-input2"
            v-model="verificationCode"
          />
          <button class="confirm-button2" @click="verifyCode">확인</button>
        </div>
      </div>

      <!-- 다음 버튼: 인증이 완료되어야만 활성화 -->
      <div class="button-wrapper">
        <button
          class="custom-button"
          :disabled="!isVerified"
          @click="handleNext"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../api/axios.js"; // Axios 설정 파일을 임포트

export default {
  data() {
    return {
      phoneNumber: "",
      verificationCode: "",
      showVerificationInput: false, // 인증번호 입력 필드를 숨기기 위한 상태
      isVerified: false, // 인증 완료 여부를 위한 상태
    };
  },
  methods: {
    filterInput(event) {
      this.phoneNumber = event.target.value.replace(/[^0-9]/g, "");
    },
    async sendVerification() {
      try {
        const response = await apiClient.get(
          `/message/send?phoneNum=${this.phoneNumber}`
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
          phoneNum: this.phoneNumber,
          authNum: this.verificationCode,
        };

        const response = await apiClient.post(
          "/message/confirm",
          verificationData
        );

        if (response.data.isSuccess) {
          alert("인증번호가 확인되었습니다.");
          this.isVerified = true; // 인증 성공 시 버튼 활성화
        } else {
          alert("인증번호가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error("인증번호 확인 오류:", error);
        alert("인증번호 확인 중 오류가 발생했습니다.");
      }
    },
    handleNext() {
      if (this.isVerified) {
        this.$router.push("/"); // 홈 화면으로 이동
      } else {
        alert("전화번호와 인증번호를 모두 확인해주세요.");
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

.input-label {
  position: absolute;
  left: 35px;
  font-size: 14px;
  color: #6981d9;
  top: -100px;
}

.input-label2 {
  position: absolute;
  left: 35px;
  font-size: 14px;
  color: #6981d9;
  top: 20px;
}

.input-button-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  position: relative;
}

.input-button-group:first-of-type {
  top: -120px;
}

.input-button-group:last-of-type {
  top: 0px;
  margin-top: 40px;
}

.custom-input1 {
  width: 62%;
  height: 35px;
  border: none;
  border-bottom: 1px solid #9f9f9f;
  text-align: left;
  margin-bottom: 20px;
  font-size: 14px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  top: -100px;
}

.custom-input2 {
  width: 62%;
  height: 35px;
  border: none;
  border-bottom: 1px solid #9f9f9f;
  text-align: left;
  margin-bottom: 20px;
  font-size: 14px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  top: -70px;
}

.confirm-button1 {
  width: 31%;
  height: 35px;
  background-color: #6981d9;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  position: relative;
  top: -110px;
}

.confirm-button2 {
  width: 31%;
  height: 35px;
  background-color: #6981d9;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  top: -80px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 280px;
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

.custom-button:disabled {
  background-color: #b0b0b0;
  cursor: not-allowed;
}
</style>
