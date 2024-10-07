<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <button @click="goBack" class="back-button">
      <i class="fas fa-chevron-left"></i>
    </button>

    <h3>
      친구 <span style="color: #6981d9">명함</span>을 <br />
      등록해주세요
    </h3>

    <button class="custom-button" @click="showScanner">QR 스캐너 실행</button>

    <!-- QR 스캐너 모달 -->
    <div v-if="showScannerModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">X</button>
        <div id="reader" style="width: 360px; height: 360px"></div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="decodedData" class="decoded-data">
          스캔된 데이터: <strong>{{ decodedData }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BusinessCardForm from "../../components/BusinessCardForm.vue";
import FooterNav from "../../components/FooterNav.vue"; // FooterNav 컴포넌트 import
import { Html5Qrcode } from "html5-qrcode";
import { QrcodeStream } from "vue3-qrcode-reader";

export default {
  components: {
    QrcodeStream,
    BusinessCardForm,
    FooterNav, // FooterNav 컴포넌트 등록
  },

  name: "QrScanner",
  data() {
    return {
      decodedData: "",
      errorMessage: "",
      showScannerModal: false,
      html5QrCode: null, // QR 스캐너 인스턴스 저장
      friendCardList: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showScanner() {
      this.showScannerModal = true;
      this.$nextTick(() => {
        this.initializeScanner();
      });
    },
    async initializeScanner() {
      this.html5QrCode = new Html5Qrcode("reader");
      const qrCodeSuccessCallback = (decodedText) => {
        this.decodedData = decodedText;
        this.errorMessage = "";
        this.closeModal(); // 스캔 성공 시 모달 닫기
      };
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices.length) {
          const cameraId = devices[0].id;
          this.html5QrCode
            .start(
              { deviceId: { exact: cameraId } },
              config,
              qrCodeSuccessCallback
            )
            .catch((err) => {
              console.error("카메라 시작 오류:", err);
              this.errorMessage =
                "카메라를 시작할 수 없습니다. 권한을 확인하세요.";
            });
        } else {
          this.errorMessage = "사용 가능한 카메라가 없습니다.";
        }
      } catch (error) {
        console.error("카메라 접근 오류:", error);
        this.errorMessage = "카메라에 접근할 수 없습니다. 권한을 확인하세요.";
      }
    },
    closeModal() {
      if (this.html5QrCode) {
        this.html5QrCode
          .stop()
          .then(() => {
            this.html5QrCode.clear();
          })
          .catch((err) => {
            console.error("QR 스캐너 종료 오류:", err);
          });
      }
      this.showScannerModal = false;
      this.decodedData = "";
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

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: white;
  overflow-y: auto;
  margin-bottom: 60px;
}

.form-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 40px;
  padding: 0 10px; /* 좌우 여백 줄임 */
  max-height: calc(100vh - 80px);
}

input,
textarea {
  width: 100%; /* 필드가 최대 폭을 차지하도록 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-bottom: 10px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: white;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  max-width: 360px;
  width: 100%;
}

.navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #555;
  flex: 1;
}

.navbar .nav-item i {
  font-size: 24px;
  margin-bottom: 5px;
}
</style>
