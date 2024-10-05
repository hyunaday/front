<template>
  <div class="main-container">
    <Header />
    <ProgressBar :currentStep="2" :totalSteps="4" />

    <!-- Content -->
    <div class="agreement-content">
      <!-- Table for the provided information -->
      <table class="info-table">
        <tbody>
          <tr>
            <td class="table-title">제공 받는 자</td>
            <td class="bold">한국신용정보원</td>
            <td class="bold">위 정보제공자</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td class="table-title">제공 목적</td>
            <td class="bold">
              마이데이터 서비스<br />가입협약내역 및 전송요구<br />내역 통합조회
              서비스 제공
            </td>
            <td class="bold">본인확인 및<br />개인(신용)정보의 전송</td>
          </tr>
          <tr>
            <td class="table-title">보유 및 이용기간</td>
            <td class="bold">제공 목적 <br />달성 시까지</td>
            <td class="bold">제공 목적 <br />달성 시까지</td>
          </tr>
          <tr>
            <td class="table-title">제공 항목</td>
            <td>
              회원가입여부,<br />서비스이용내역,<br />서비스제공내역,<br />결제/환급정보,<br />계좌정보,
              ID,<br />전자우편주소, 전화번호,<br />전송요구내역,<br />전송요구통지서
            </td>
            <td>전자서명, CI,<br />전자우편<br />전송요구서</td>
          </tr>
        </tbody>
      </table>

      <!-- Additional text -->
      <p class="transfer-info">
        <strong>전송받는자:</strong> 개인(신용)정보 제공에 관한 동의를 거부하실
        수 있습니다.
        다만, 개인(신용)정보의 제공에 관한 동의를 거부하실 경우
        통합조회, 데이터분석 서비스, 마이데이터 서비스가 제한될 수 있습니다.
      </p>

      <!-- Checkboxes for agreement -->
      <div class="checkboxes">
        <label>
          <input type="checkbox" class="custom-checkbox" />
          <span>[필수] 개인(신용)정보 수집·이용동의</span>
        </label>
        <label>
          <input type="checkbox" class="custom-checkbox" />
          <span>[필수] 개인(신용)정보 제공 동의</span>
        </label>
      </div>
    </div>

    <FooterNav :buttonType="'next'" :buttonAction="goToNextStep" />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import FooterNav from "../../components/FooterNav.vue";
import ProgressBar from "../../components/ProgressBar.vue"; // Import the ProgressBar component

export default {
  name: "Agree3",
  components: {
    FooterNav,
    Header,
    ProgressBar, // Register ProgressBar component
  },
  methods: {
    goToNextStep() {
      this.$router.push("/next-step"); // Change to the next page route
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}

* {
  font-family: "Pretendard", sans-serif;
}

.table-title {
    background-color: #eeeff3;
}

.bold {
    font-weight: bold;
}
.agreement-content {
  margin-left: 50px;
  margin-top: 20px;
  font-size: 14px;
  color: #333333b6;
}

.info-table {
  width: 85%;
  border-collapse: collapse;
  margin-top: 20px;
}

.info-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

.info-table td {
  font-size: 12px;
  line-height: 1.5;
}

.transfer-info {
  font-size: 12px;
  color: #555;
  margin-top: 15px;
  line-height: 1.5;
  margin-right: 43px;
}

.checkboxes {
  margin-top: 20px;
}

.checkboxes label {
  display: block;
  margin-bottom: 10px;
}

.custom-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
}

.custom-checkbox:checked {
  background-color: #6981d9;
  background-image: url("../../assets/images/checked-icon.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 12px;
}
</style>
