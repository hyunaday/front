<template>
  <div class="main-container">
    <Header />
    <div class="container mt-3">
      <!-- 내 자산 연결 버튼 섹션 -->
      <div
        v-if="!isConnected"
        class="connect-card-container d-flex flex-column align-items-center justify-content-center"
      >
        <img
          src="../assets/images/connect_logo_rm.png"
          alt="Connect Logo"
          class="connect-logo"
        />
        <p class="connect-message">
          편리한 전자 지갑 기능을 사용하려면<br />자산을 연결해주세요!
        </p>
        <button @click="goToAgreementPage" class="btn connect-button">
          내 자산 연결
        </button>
      </div>

      <!-- 내 계좌 텍스트 및 잔액 조회 스위치 -->
      <div v-if="isConnected" class="row align-items-center" id="main-title">
        <div class="col-6 ps-4">
          <h4 class="mb-0">내 계좌</h4>
        </div>
        <div class="col-6">
          <div
            class="form-check form-switch d-flex justify-content-end align-items-center"
          >
            <label class="form-check-label me-2" for="amountSwitch"
              >잔액 보기</label
            >
            <input
              class="form-check-input"
              type="checkbox"
              id="amountSwitch"
              v-model="showamount"
            />
          </div>
        </div>
      </div>

      <!-- 내 계좌 섹션 -->
      <div
        v-if="isConnected"
        class="account-section d-flex justify-content-center"
      >
        <swiper
          :slides-per-view="1.2"
          :centered-slides="true"
          :loop="true"
          :space-between="10"
          :pagination="{ clickable: true }"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <!-- 계좌 카드 슬라이드 -->
          <swiper-slide v-for="account in accounts" :key="account.idx">
            <div class="account-card">
              <label>입출금통장</label>
              <label class="account-number">{{ account.accountNumber }}</label>
              <img
                :src="copyIcon"
                class="copy-icon"
                @click="copyAccountNumber(account.accountNumber)"
              />
              <div class="account-name">
                <img :src="bankLogos[account.bankName]" class="bank-icon" />
                <label class="bank-name">{{ account.bankName }}</label>
                <div class="amount-container" v-if="showamount">
                  <label class="amount"
                    >₩ {{ formatNumber(account.amount) }}</label
                  >
                </div>
                <div class="amount-container" v-else>
                  <label class="amount-hidden">잔액 숨김</label>
                </div>
              </div>
              <div class="account-button">
                <div class="d-flex justify-content-between gap-4">
                  <router-link :to="`/transactionhistory${account.idx}`">
                    <button class="btn btn-light check" type="button">
                      조회
                    </button>
                  </router-link>
                  <router-link :to="`/transfer`">
                    <button
                      class="btn btn-light transfer"
                      type="button"
                      @click="selectAccount(account)"
                    >
                      이체
                    </button>
                  </router-link>
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
            <router-link :to="`/usage`">
              <button class="btn btn-light">사용방법 보러가기</button>
            </router-link>
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

      <!-- 카드 추천 섹션 -->
      <div class="recommend_card">
        <label class="recommend_title">
          <h6>내 소비 습관에 맞는 카드 추천</h6>
        </label>
        <div class="card-slider">
          <swiper
            :space-between="20"
            :slides-per-view="1.2"
            :centered-slides="true"
            :loop="true"
            :pagination="{ clickable: true, type: 'progressbar' }"
            :navigation="true"
            :autoplay="{ delay: 3000 }"
          >
            <!-- 카드 추천 슬라이드 -->
            <swiper-slide
              v-for="(image, index) in cardImages"
              :key="index"
              class="slide-card"
            >
              <div class="card-content">
                <img :src="image" alt="추천 카드" class="card-image-fixed" />
                <p class="cardTitle" v-html="cardTitle[index]"></p>
                <p class="cardDescription" v-html="cardDescriptions[index]"></p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import FooterNav from "../components/FooterNav.vue";
import Header from "../components/Header.vue";
import apiClient from "../api/axios";
import kbbankLogo from "../assets/images/kbbank.png";
import shinhanLogo from "../assets/images/shinhan.png";
import kakaobankLogo from "../assets/images/kakaobank.png";
import hanabankLogo from "../assets/images/hanabank.png";
import ibkbankLogo from "../assets/images/IBKbank.png";
import wooriLogo from "../assets/images/wooribank.png";
import tossLogo from "../assets/images/toss.png";
import nhLogo from "../assets/images/NHbank.png";
import copyIcon from "../assets/images/copy.png";
import { useMemberStore } from "../stores/MemberStore.js";
import { useTransferStore } from "../stores/TransferStore.js";

export default {
  name: "MainPage",
  components: {
    Swiper,
    SwiperSlide,
    FooterNav,
    Header,
  },
  setup() {
    const transferStore = useTransferStore();
    return { transferStore };
  },
  data() {
    return {
      cardDescriptions: [
        "스타벅스 최대 60%할인은 기본교통·택시·통신 등 일상생활 할인!",
        "통신·교통·외식 등 생활영역 10%할인 <br> 주유 리터당 60원 할인혜택!",
        "쇼핑, 편의점 10% 청구할인실적 / 조건없이 <br> 국내가맹점 0.5%할인",
        "해외가맹점 최대 3% 포인트리 적립전월 <br> 실적없이 국내가맹점 0.3%적립",
        "스카이패스 1500원당 최대3마일 적립 전세계 <br> 공항라운지 동반1인 무료",
        "대한항공 및 저가항공사 15만원할인!<br>국내가맹점+특별영역, 중복할인",
      ],
      cardTitle: [
        "카페 최대60%할인, 일상할인까지",
        "생활업종 할인으로 혜택 가득한 하루!",
        "데일리 스탬프 모으면 전월실적 <br>채워드림!",
        "포인트리 적립받고 <br>해외배송료 할인까지",
        "여행도 프리미엄! <br> 마일리지적립 + 라운지 무료",
        "라운지 무료이용과 항공권 할인!",
      ],
      showamount: false,
      accounts: [],
      isConnected: false,
      bankLogos: {
        국민은행: kbbankLogo,
        신한은행: shinhanLogo,
        카카오뱅크: kakaobankLogo,
        하나은행: hanabankLogo,
        우리은행: wooriLogo,
        IBK기업은행: ibkbankLogo,
        토스은행: tossLogo,
        농협은행: nhLogo,
      },
      copyIcon: copyIcon,
      cardImages: [
        "https://storage.googleapis.com/team2rum-bucket/1/img/74821ddb-746d-4561-b064-d6b1df35b963kbcard3.png.image/png",
        "https://storage.googleapis.com/team2rum-bucket/1/img/1e1eed26-9c8f-43fe-962d-2900d90b8304kbcard.png.image/png",
        "https://storage.googleapis.com/team2rum-bucket/1/img/29de9ec0-2228-45a1-9262-a1f728fab1fakbcard2.png.image/png",
        "https://storage.googleapis.com/team2rum-bucket/1/img/29c35903-947d-43f4-b540-dac42371c977kbcard4.png.image/png",
        "https://storage.googleapis.com/team2rum-bucket/1/img/c24bfe3e-df72-4591-abc6-a3fbd6660fcbkbcard5.png.image/png",
        "https://storage.googleapis.com/team2rum-bucket/1/img/451649d8-0cae-4c8b-b7a4-27f48322a06akbcard6.png.image/png",
      ],
    };
  },
  created() {
    this.checkConnectionStatus();
  },
  methods: {
    checkConnectionStatus() {
      apiClient
        .get("/member/connect/check")
        .then((response) => {
          if (response.data.isSuccess) {
            this.isConnected = response.data.result.isConnected;
            if (this.isConnected) {
              this.fetchAccounts();
            }
          }
        })
        .catch((error) => {
          console.error("연동 상태를 확인하는 중 오류 발생:", error);
        });
    },
    fetchAccounts() {
      apiClient
        .get("/account/all")
        .then((response) => {
          if (response.data.isSuccess) {
            this.accounts = response.data.result.accountList;
          }
        })
        .catch((error) => {
          console.error("계좌 정보를 가져오는 중 오류 발생:", error);
        });
    },
    copyAccountNumber(accountNumber) {
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
      this.$router.push("/grouppay");
    },
    goToAgreementPage() {
      this.$router.push("/agree1");
    },
    selectAccount(account) {
      this.transferStore.selectedAccount = account;
      this.transferStore.availableAmount = account.amount;
      this.$router.push("/transfer");
    },
  },
};
</script>

<style scoped>
#main-title {
  margin-top: 30px;
}

.main-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 20px;
  overflow-x: hidden; /* 좌우 스크롤을 제거 */
}

.container {
  max-width: 100%;
  overflow-y: auto;
  padding-bottom: 80px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: hidden; /* 좌우 스크롤을 제거 */
}

.container::-webkit-scrollbar {
  display: none;
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
  color: #ffffff7b;
}

.copy-icon {
  margin-left: 8px;
  cursor: pointer;
}

.bank-icon {
  margin-left: 0px;
  margin-right: 5px;
  height: 20px;
  margin-top: 1.5px;
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
  margin-left: -30px;
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
  padding: 0 28px;
}

.btn-light {
  background-color: white;
  color: #000;
  border: none;
  font-weight: bold;
}

.account-button .btn {
  width: 80px;
  height: 43px;
  color: #505050;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(86, 86, 86, 0.773);
}

.account-button .check {
  margin-left: -13px;
}

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
  padding: 0 20px;
}

.swiper {
  width: 100%;
  overflow: visible;
}

.swiper-slide {
  transition: transform 0.3s;
}

.swiper-slide:not(.swiper-slide-active) {
  transform: scale(0.9);
  opacity: 0.6;
}

.account-card {
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
}

.connect-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.connect-card-container {
  background-color: #6981d6;
  color: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  width: 300px;
  height: 200px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  margin: 30px auto;
  margin-bottom: 5px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.connect-logo {
  width: 160px;
  height: auto;
}

.connect-message {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 0px;
}

.connect-button {
  background-color: white;
  color: #333;
  font-weight: bold;
  border-radius: 8px;
  padding: 10px 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border: none;
  transition: background-color 0.3s ease;
  margin-bottom: 12px;
  width: 230px;
}

.recommend_card {
  margin-top: 20px;
  padding-bottom: 20px;
}

.recommend_title {
  margin-left: 10px;
  margin-top: 60px;
  font-size: 11px;
}

.recommend_title h6 {
  margin-bottom: 30px;
}

.card-slider {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.slide-card .card-content {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
  padding-bottom: 10px;
  text-align: center;
}

.card-image-fixed {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 10px;
}

.cardTitle {
  color: #6981d6;
  font-weight: bold;
  margin-bottom: 5px;
}

.cardDescription {
  font-size: 12px;
}

</style>