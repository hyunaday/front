<template>
  <div class="main-container d-flex flex-column justify-content-center align-items-center">
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

    <!-- QR Scanner Modal -->
    <div v-if="showScannerModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">X</button>
        <QrScanner @decode="onDecode" @close="closeScanner" />
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="decodedData" class="decoded-data">
          스캔된 데이터: <strong>{{ decodedData }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import QrScanner from '../../components/QrScanner.vue'; // QrScanner 컴포넌트 임포트
import { useOrderStore } from '../../stores/orderStore';

export default {
  name: 'Grouppay',
  components: {
    QrScanner,
  },
  data() {
    return {
      decodedData: '',
      errorMessage: '',
      showScannerModal: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showScanner(paymentType) {
      this.$router.push({ query: { paymentType } });
      this.showScannerModal = true;
    },
    onDecode(decodedString) {
      this.decodedData = decodedString;
      this.errorMessage = '';
      this.showScannerModal = false;

      const orderStore = useOrderStore();
      orderStore.setOrderIdx(decodedString); // orderIdx를 Pinia에 저장
    },
    closeScanner() {
      this.showScannerModal = false;
      this.decodedData = '';
    },
    closeModal() {
      this.showScannerModal = false;
      this.decodedData = '';
    },
  },
};
</script>

<style scoped>
/* 스타일 코드 유지 */
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
