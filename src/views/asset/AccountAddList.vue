<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <div class="account-registration">
      <h1 class="title">계좌 등록</h1>
      <form @submit.prevent="registerAccount">
        <div class="form-group">
          <label for="bank">은행<span class="required">*</span></label>
          <select id="bank" v-model="bank" required>
            <option value="" disabled selected>선택</option>
            <option value="kb">KB국민은행</option>
            <option value="ibk">IBK기업</option>
            <option value="hana">KEB하나은행</option>
            <option value="woori">우리은행</option>
            <option value="shinhan">신한은행</option>
            <option value="kakao">카카오뱅크</option>
            <option value="nh">NH농협은행</option>
          </select>
        </div>
        <div class="form-group">
          <label for="accountNumber"
            >계좌번호<span class="required">*</span></label
          >
          <input
            type="text"
            id="accountNumber"
            v-model="formattedAccountNumber"
            required
            maxlength="17"
            @input="formatAccountNumber"
            placeholder="계좌번호를 입력해주세요."
          />
        </div>
        <div class="form-group">
          <label for="password"
            >계좌 비밀번호<span class="required">*</span></label
          >
          <div class="password-input">
            <div
              v-for="index in 6"
              :key="index"
              class="password-circle"
              :class="{ filled: password.length >= index }"
            ></div>
          </div>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            maxlength="6"
            @input="validatePassword"
            style="position: absolute; opacity: 0; width: 0; height: 0"
          />
        </div>
        <div class="warning-message">
          *입출금액 제한이 있는 펀드/적금/정기예금, 평생 계좌번호, 가상계좌 등의
          계좌는 등록이 불가능합니다.
        </div>
        <button type="submit" class="register-btn">다음</button>
      </form>
    </div>

    <!-- FooterNav 컴포넌트 사용 -->
    <FooterNav :buttonType="'back'" :buttonAction="goToAddList" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import FooterNav from "../../components/FooterNav.vue";
import "@solb/bottom-sheet";
import "@solb/bottom-sheet/style/style.css";

export default {
  name: "Account",
  components: {
    FooterNav,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      bank: "",
      accountNumber: "",
      formattedAccountNumber: "",
      password: "",
      successMessage: "",
      showFooterNav: false,
    };
  },
  methods: {
    formatAccountNumber() {
      const value = this.formattedAccountNumber.replace(/\D/g, "");
      this.accountNumber = value;
      if (value.length <= 4) {
        this.formattedAccountNumber = value;
      } else if (value.length <= 10) {
        this.formattedAccountNumber = `${value.slice(0, 4)}-${value.slice(4)}`;
      } else {
        this.formattedAccountNumber = `${value.slice(0, 4)}-${value.slice(
          4,
          10
        )}-${value.slice(10, 13)}`;
      }
    },
    goToAddList() {
      this.$router.push("/account"); // account 페이지로 이동
    },
    validatePassword() {
      const value = this.password.replace(/\D/g, "").slice(0, 6); // Limit to 6 digits
      this.password = value;
    },
    registerAccount() {
      console.log({
        bank: this.bank,
        accountNumber: this.accountNumber,
        password: this.password,
      });
      // 계좌 등록 후 페이지 이동
      this.successMessage = "계좌 등록이 완료되었습니다.";
      this.resetForm();
      this.router.push("/account"); // 여기에서 이동할 경로 설정
    },
    resetForm() {
      this.bank = "";
      this.accountNumber = "";
      this.formattedAccountNumber = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.account-registration {
  max-width: 360px;
  padding: 30px;
  text-align: center;
}

.title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 30px;
  text-align: left;
}

label {
  font-weight: bold;
  padding-bottom: 10px;
}

.required {
  color: red;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.password-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.password-circle {
  width: 40px;
  height: 40px;
  border: 2px solid #7189ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
}

.password-circle.filled {
  background-color: #7189ff;
}

.warning-message {
  font-size: 12px;
  color: #666;
  margin-top: 10px;
  padding: 10px 20px;
}

.register-btn {
  background-color: #7189ff;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  margin-top: 20px;
}

.register-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
