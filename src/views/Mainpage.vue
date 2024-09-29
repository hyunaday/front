<template>
  <div class="main-container">
    <Header />
    <div class="container mt-3">
      <!-- 내 계좌 섹션 -->
      <div class="row align-items-center">
        <div class="col-6 ps-4">
          <h4 class="mb-0">내 계좌</h4>
        </div>
        <div class="col-6">
          <div
            class="form-check form-switch d-flex justify-content-end align-items-center"
          >
            <label class="form-check-label me-2" for="balanceSwitch"
              >잔액 보기</label
            >
            <input
              class="form-check-input"
              type="checkbox"
              id="balanceSwitch"
              v-model="showBalance"
            />
          </div>
        </div>
      </div>

      <!-- 계좌 정보 섹션 (Swiper 적용) -->
      <div class="account-section d-flex justify-content-center">
        <swiper
          :slides-per-view="1.2"
          :centered-slides="true"
          :space-between="10"
          :pagination="{ clickable: true }"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <!-- 계좌 카드 1 -->
          <swiper-slide>
            <div class="account-card">
              <label>입출금통장</label>
              <label class="account-number">3333-09-3029304</label>
              <img
                src="../assets/images/copy.png"
                class="copy-icon"
                @click="copyAccountNumber"
              />
              <div class="account-name">
                <img
                  src="../assets/images/kakaobank.png"
                  class="kakaobank-icon"
                />
                <label class="bank-name">카카오뱅크</label>
                <div class="amount-container" v-if="showBalance">
                  <label class="amount">&#8361; {{ formatNumber(1565) }}</label>
                </div>
                <div class="amount-container" v-else>
                  <label class="amount-hidden">잔액 숨김</label>
                </div>
              </div>
              <div class="account-button">
                <div class="d-grid gap-4 d-md-flex justify-content-center">
                  <button class="btn btn-light check" type="button">
                    조회
                  </button>

                    <!-- '이체' 버튼, 송금 페이지로 이동 -->
                  <router-link to="/transfer">
                  <button class="btn btn-light transfer" type="button">
                    이체
                  </button>
                </router-link>
                </div>
              </div>
            </div>
          </swiper-slide>

          <!-- 계좌 카드 2 -->
          <swiper-slide>
            <div class="account-card">
              <label>입출금통장</label>
              <label class="account-number">3333-09-3029304</label>
              <img
                src="../assets/images/copy.png"
                class="copy-icon"
                @click="copyAccountNumber"
              />
              <div class="account-name">
                <img
                  src="../assets/images/kakaobank.png"
                  class="kakaobank-icon"
                />
                <label class="bank-name">카카오뱅크</label>
                <div class="amount-container" v-if="showBalance">
                  <label class="amount"
                    >&#8361; {{ formatNumber(1700000) }}</label
                  >
                </div>
                <div class="amount-container" v-else>
                  <label class="amount-hidden">잔액 숨김</label>
                </div>
              </div>
              <div class="account-button">
                <div class="d-grid gap-4 d-md-flex justify-content-center">
                  <button class="btn btn-light check" type="button">
                    조회
                  </button>
                  <button class="btn btn-light transfer" type="button">
                    이체
                  </button>
                </div>
              </div>
            </div>
          </swiper-slide>

          <swiper-slide>
            <div class="account-card">
              <label>입출금통장</label>
              <label class="account-number">3333-09-3029304</label>
              <img
                src="../assets/images/copy.png"
                class="copy-icon"
                @click="copyAccountNumber"
              />
              <div class="account-name">
                <img
                  src="../assets/images/kakaobank.png"
                  class="kakaobank-icon"
                />
                <label class="bank-name">카카오뱅크</label>
                <div class="amount-container" v-if="showBalance">
                  <label class="amount"
                    >&#8361; {{ formatNumber(516000) }}</label
                  >
                </div>
                <div class="amount-container" v-else>
                  <label class="amount-hidden">잔액 숨김</label>
                </div>
              </div>
              <div class="account-button">
                <div class="d-grid gap-4 d-md-flex justify-content-center">
                  <button class="btn btn-light check" type="button">
                    조회
                  </button>
                  <button class="btn btn-light transfer" type="button">
                    이체
                  </button>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- 함께 결제 섹션 -->
      <div class="together-pay">
        <label
          ><h6>정산은 그만! <strong>함께 결제</strong>해봐요</h6></label
        >
      </div>
      <div class="together-section d-flex justify-content-center">
        <div
          class="together-card d-flex justify-content-between align-items-center p-3"
        >
          <div class="text-content">
            <h6>결제 할때, 한번에 다같이</h6>
            <p>함께 결제</p>
            <button class="btn btn-light">사용방법 보러가기</button>
          </div>
          <div
            class="image-content d-flex justify-content-center align-items-center"
          >
            <img
              src="../assets/images/humans.png"
              class="human-image img-fluid"
              alt="humans"
            />
          </div>
        </div>
      </div>
    </div>

    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import FooterNav from "../components/FooterNav.vue";
import Header from "../components/Header.vue";

export default {
  name: "MainPage",
  components: {
    Swiper,
    SwiperSlide,
    FooterNav,
    Header,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination],
    };
  },
  data() {
    return {
      showBalance: false,
    };
  },
  methods: {
    copyAccountNumber() {
      const accountNumber = "3333-09-3029304";
      navigator.clipboard
        .writeText(accountNumber)
        .then(() => {
          alert("계좌번호가 복사되었습니다.");
        })
        .catch((err) => {
          console.error("계좌번호 복사 중 오류가 발생했습니다:", err);
          alert("계좌번호 복사에 실패했습니다.");
        });
    },
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    goToGroupPayPage() {
      this.$router.push("/grouppay"); // 그룹 결제 페이지로 이동
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

body,
h2,
label,
button,
input {
  font-family: "Pretendard", sans-serif;
}

.main-container {
  position: relative;
}

.form-check-input {
  margin-left: 0;
  margin-top: 0;
}

h4 {
  font-weight: bold;
}

.account-card {
  padding: 15px 0 0 15px;
  background-color: #6981d6;
  color: white;
  border-radius: 15px;
  width: 250px;
  height: 180px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.account-card label {
  font-size: 13px;
}

.account-number {
  margin-right: -3px;
  margin-left: 5px;
}

.copy-icon {
  margin-left: 8px;
  cursor: pointer;
}

.kakaobank-icon {
  margin-left: -4px;
  height: 20px;
  margin-top: 5px;
}

.bank-name {
  margin-top: 3px;
}

.amount-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.amount {
  font-size: 28px !important;
  font-weight: bold;
  color: #ffffff;
  display: inline-block;
  max-width: 100%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-left: -15px;
}

.amount-hidden {
  font-size: 20px !important;
  color: #ffffff;
  display: inline-block;
  margin-bottom: 4px;
  margin-left: -15px;
  margin-top: 8px;
}

.account-button {
  margin-top: 15px;
  padding: 0 15px;
}

.btn-light {
  background-color: white;
  color: #000;
  border: none;
  font-weight: bold;
}

.account-button .btn {
  width: 80px;
}

.account-button .check {
  margin-left: -13px;
}

/* 함께 결제 섹션 */
.together-pay label {
  margin-top: 60px;
  margin-left: 10px;
}

.together-section {
  width: 100%;
}

.together-card {
  margin-top: 30px;
  background: linear-gradient(
    90deg,
    rgba(105, 129, 217, 1) 0%,
    rgba(105, 129, 217, 0.81) 53%,
    rgba(105, 129, 217, 0.45) 100%
  );
  color: white;
  border-radius: 30px;
  width: 100%;
  max-width: 320px;
  height: 180px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 20px;
  position: relative;
  overflow: visible;
}

.together-card .text-content {
  z-index: 2;
  position: relative;
}

.together-card .text-content h6 {
  font-size: 13px;
  font-weight: bold;
  margin: -20px 0px 7px 13px;
}

.together-card .text-content p {
  font-size: 30px;
  margin-bottom: 15px;
  margin-left: 11px;
  font-weight: bold;
}

.together-card .btn {
  font-size: 14px;
  font-weight: bold;
  background-color: white;
  color: #333;
  z-index: 2;
  border-radius: 20px;
  width: 130px;
  height: 45px;
  margin-left: 15px;
  margin-bottom: -20px;
}

.human-image {
  width: 200px;
  height: auto;
  position: absolute;
  right: -30px;
  bottom: 90px;
  z-index: 1;
}

.image-content {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  overflow: visible;
}

.account-section {
  width: 100%;
  margin-top: 30px;
  padding: 0 20px; /* 좌우 여백 추가 */
}

.swiper {
  width: 100%;
  overflow: visible; /* 슬라이더 밖으로 내용이 보이도록 설정 */
}

.swiper-slide {
  transition: transform 0.3s;
}

.swiper-slide:not(.swiper-slide-active) {
  transform: scale(0.9); /* 활성화되지 않은 슬라이드를 약간 축소 */
  opacity: 0.6; /* 활성화되지 않은 슬라이드의 투명도 조정 */
}

.account-card {
  /* 기존 스타일 유지 */
  width: 100%; /* 너비를 100%로 설정하여 부모 요소에 맞춤 */
  max-width: 250px; /* 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
}

/* ... 나머지 스타일 ... */
</style>
