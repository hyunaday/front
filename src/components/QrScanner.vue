<template>
  <div class="qr-scanner">
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <button @click="closeScanner">닫기</button>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qr-reader';

export default {
  name: 'QrScanner',
  components: {
    QrcodeStream,
  },
  methods: {
    onDecode(decodedString) {
      console.log('Decoded string:', decodedString);
      // 여기에 QR 코드에서 스캔한 값을 처리하는 로직 추가
      // 예를 들어, 사용자에게 알림을 표시하거나 페이지를 리다이렉트할 수 있습니다.
    },
    onInit(error) {
      if (error) {
        console.error('QR Code scanner error:', error);
      } else {
        console.log('QR Code scanner ready!');
      }
    },
    closeScanner() {
      this.$emit('close'); // 스캐너를 닫기 위한 이벤트 발생
    },
  },
};
</script>

<style scoped>
.qr-scanner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
