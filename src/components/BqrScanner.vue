<template>
  <div class="qr-scanner">
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <button class="close-button" @click="closeScanner">닫기</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { QrcodeStream } from 'vue3-qrcode-reader';

export default {
  name: 'BqrScanner',
  components: {
    QrcodeStream,
  },
  setup(props, { emit }) {
    const scannedData = ref(null);

    const onDecode = (decodedString) => {
      try {
        console.log('스캔된 데이터:', decodedString);
        const cardData = JSON.parse(decodedString); // JSON으로 변환

        // 명함 정보를 상태에 추가 (스토어 없이 처리)
        console.log('명함 정보가 추가되었습니다:', cardData);

        // 부모 컴포넌트에 스캔 완료 이벤트를 보냄
        emit('scanned', cardData);
      } catch (error) {
        console.error('onDecode 처리 중 오류 발생:', error);
        alert('스캔된 데이터가 유효하지 않습니다.');
      }
    };

    const onInit = (promise) => {
      promise.catch((error) => {
        if (error.name === 'NotAllowedError') {
          alert('카메라 접근 권한이 필요합니다.');
        } else {
          console.error(error);
        }
      });
    };

    const closeScanner = () => {
      emit('close');
    };

    return { onDecode, onInit, closeScanner };
  },
};
</script>

<style scoped>
.qr-scanner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.close-button {
  padding: 10px 20px;
  background-color: #6981d9;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  width: 90px;
}
</style>
