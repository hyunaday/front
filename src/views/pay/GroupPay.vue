<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
    <button @click="goBack" class="back-button">
      <i class="fas fa-chevron-left"></i>
    </button>
    <h3>함께 결제하기</h3>
    <button class="custom-button" @click="showScanner('SoloPay')">
      개인 결제
    </button>
    <button class="custom-button" @click="showScanner('MainPay')">
      대표 결제
    </button>
    <button class="custom-button" @click="showScanner('MemberPay')">
      팀원 결제
    </button>

    <div v-if="showScannerModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">X</button>
        <qrcode-stream @decode="onDecode" @init="onInit" style="width: 360px" />

        <!-- 스캔 결과 출력 -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="decodedData" class="decoded-data">
          스캔된 데이터: <strong>{{ decodedData }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import SoloPay from './SoloPay.vue';
import MainPay from './MainPay.vue';
import MemberPay from './MemberPay.vue';

export default {
  name: 'PaymentSelection',
  components: {
    QrcodeStream,
    SoloPay,
    MainPay,
    MemberPay,
  },
  data() {
    return {
      decodedData: '',
      errorMessage: '',
      showScannerModal: false,
      currentPaymentComponent: null,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showScanner(paymentType) {
      this.currentPaymentComponent =
        paymentType === 'SoloPay'
          ? SoloPay
          : paymentType === 'MainPay'
          ? MainPay
          : MemberPay;
      this.showScannerModal = true;
    },
    onDecode(data) {
      console.log('Decoded data:', data);
      this.decodedData = data; // 스캔된 데이터 저장
      this.errorMessage = ''; // 오류 메시지 초기화
      this.redirectToPayment(data); // 결제 페이지로 리디렉션
    },
    async onInit(success, error) {
      if (error) {
        console.error('Camera initialization failed:', error);
        this.errorMessage = '카메라에 접근할 수 없습니다. 권한을 확인하세요.';
      } else if (success) {
        console.log('Camera initialization successful');
        this.errorMessage = '';

        // 카메라 접근 권한 요청
        try {
          await this.requestCameraPermission();
        } catch (err) {
          console.error('Camera permission denied:', err);
          this.errorMessage = '카메라 권한이 필요합니다.';
        }
      }
    },
    closeModal() {
      this.showScannerModal = false;
      this.decodedData = ''; // 모달 닫을 때 결과 초기화
    },
    async requestCameraPermission() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } else {
        throw new Error('getUserMedia is not supported in this browser.');
      }
    },
  },
};
</script>


<style scoped>
/* 전체 템플릿 */
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  min-height: 100vh;
  background-color: #c0c0c0; /* 나머지 화면은 회색 */
}

.main-container {
  width: 360px;
  height: 800px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

h3 {
  font-size: 20px;
  font-weight: 530;
  text-align: left;
  margin-left: -170px;
  margin-bottom: 50px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #000;
  margin-left: -270px;
  margin-top: -300px;
  margin-bottom: 30px; /* 제목과 버튼 사이의 여백 */
}

.back-button:hover {
  color: #7189ff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white; /* 모달 배경 색상 */
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  width: 380px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.custom-button {
  width: 300px;
  height: 100px;
  background-color: #ffffff;
  border: 1px solid gray;
  border-radius: 9px;
  color: #000000;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, color 0.3s;
}

.custom-button:hover {
  background-color: #f3f8fe;
  color: #333;
}

.error-message {
  color: red;
  margin-top: 20px;
}

.decoded-data {
  margin-top: 20px;
}
</style>
