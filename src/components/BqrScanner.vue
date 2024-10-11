<template>
  <div class="qr-scanner">
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <button class="close-button" @click="closeScanner">닫기</button>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue3-qrcode-reader';

export default {
  name: 'BqrScanner',
  components: {
    QrcodeStream,
  },
  setup() {
    const { addBusinessCard } = useBusinessCardStore();

    const onDecode = (decodedString) => {
      try {
        console.log('스캔된 데이터:', decodedString);
        const cardData = JSON.parse(decodedString); // JSON으로 변환

        // 명함 정보를 상태에 추가
        addBusinessCard(cardData);

        console.log('명함 정보가 추가되었습니다:', cardData);
        // 부모 컴포넌트에 스캔 완료 이벤트를 보냄
        this.$emit('scanned', cardData);
      } catch (error) {
        console.error('onDecode 처리 중 오류 발생:', error);
      }
    };

    const onInit = (success, error) => {
      if (error) {
        console.error('QR Code scanner error:', error);
        this.$emit('error', '카메라에 접근할 수 없습니다. 권한을 확인하세요.');
      } else if (success) {
        console.log('QR Code scanner ready!');
      }
    };

    const closeScanner = () => {
      this.$emit('close');
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
