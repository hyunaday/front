<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <button @click="goBack" class="back-button">
      <i class="fas fa-chevron-left"></i>
    </button>

    <h3>
      결제할 <span style="color: #6981d9">방법</span>을 <br />
      선택해주세요
    </h3>

    <button class="custom-button" @click="showScanner('SoloPay')">
      개인 결제
    </button>
    <button class="custom-button" @click="showScanner('MainPay')">
      함께 결제
    </button>

    <div id="reader" style="width: 600px; display: none"></div>

    <div v-if="showScannerModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">X</button>
        <qrcode-stream @decode="onDecode" @init="onInit" style="width: 360px" />

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="decodedData" class="decoded-data">
          스캔된 데이터: <strong>{{ decodedData }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue3-qrcode-reader';
import SoloPay from '../pay/SoloPay.vue';
import MainPay from '../pay/MainPay.vue';
import { Html5Qrcode } from 'html5-qrcode';

export default {
  name: 'PaymentSelection',
  components: {
    QrcodeStream,
    SoloPay,
    MainPay,
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
      this.currentPaymentComponent = paymentType;
      this.showScannerModal = true;
      this.initializeScanner();
    },
    async initializeScanner() {
      const html5QrCode = new Html5Qrcode('reader');
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        this.decodedData = decodedText; // 스캔된 데이터를 여기에 할당합니다.
        this.errorMessage = '';
        // 여기서 결제 페이지로 리디렉션할 수 있습니다.
        // 예: this.redirectToPayment(decodedText);
      };
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices.length) {
          const cameraId = devices[0].id;
          html5QrCode
            .start(
              { deviceId: { exact: cameraId } },
              config,
              qrCodeSuccessCallback
            )
            .catch((err) => {
              console.error('카메라 시작 오류:', err);
              this.errorMessage =
                '카메라를 시작할 수 없습니다. 권한을 확인하세요.';
            });
        } else {
          this.errorMessage = '사용 가능한 카메라가 없습니다.';
        }
      } catch (error) {
        console.error('카메라 접근 오류:', error);
        this.errorMessage = '카메라에 접근할 수 없습니다. 권한을 확인하세요.';
      }
    },
    async onInit(success, error) {
      if (error) {
        console.error('카메라 초기화 실패:', error);
        this.errorMessage = '카메라에 접근할 수 없습니다. 권한을 확인하세요.';
      } else if (success) {
        console.log('카메라 초기화 성공');
        this.errorMessage = '';
        await this.requestCameraPermission();
      }
    },
    closeModal() {
      this.showScannerModal = false;
      this.decodedData = '';
    },
    async requestCameraPermission() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } else {
        throw new Error('이 브라우저는 getUserMedia를 지원하지 않습니다.');
      }
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  min-height: 100vh;
  background-color: #c0c0c0;
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
  margin-left: 70px;
  margin-bottom: 100px;
  display: block;
  width: 100%;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  color: #000;
  text-align: left;
  color: #000;
  margin-left: -270px;
  margin-top: -300px;
  margin-bottom: 30px;
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
  background: white;
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
  outline: none;
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
