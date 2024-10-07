<template>
  <div class="qr-scanner">
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <button @click="closeScanner">닫기</button>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue3-qrcode-reader';
import axios from 'axios'; // Axios 임포트

export default {
  name: 'QrScanner',
  components: {
    QrcodeStream,
  },
  methods: {
    async onDecode(decodedString) {
      try {
        console.log('스캔된 데이터:', decodedString);

        // 백엔드에 스캔된 데이터 전송
        await this.sendDataToBackend(decodedString);

        // 스캔된 문자열이 URL인지 확인하고 자동으로 이동
        if (this.isValidUrl(decodedString)) {
          console.log('링크로 이동:', decodedString);
          window.location.href = decodedString; // 현재 탭에서 링크 열기
        } else {
          console.error('유효하지 않은 URL:', decodedString);
        }
      } catch (error) {
        console.error('onDecode 처리 중 오류 발생:', error);
      }
    },
    onInit(success, error) {
      try {
        if (error) {
          console.error('QR Code scanner error:', error);
          this.$emit(
            'error',
            '카메라에 접근할 수 없습니다. 권한을 확인하세요.'
          );
        } else if (success) {
          console.log('QR Code scanner ready!');
        }
      } catch (error) {
        console.error('onInit 처리 중 오류 발생:', error);
      }
    },
    closeScanner() {
      this.$emit('close');
    },
    isValidUrl(string) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // 프로토콜 (http 또는 https)
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|' + // 도메인
          'localhost|' + // localhost
          '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IPv4
          '\\[([0-9a-f]{1,4}:){1,7}[0-9a-f]{1,4}\\]|' + // IPv6
          '([a-f0-9]{1,4}:){1,7}:|:((:[a-f0-9]{1,4}){1,7}|:))' + // IPv6 대체
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
        'i' // 포트 및 경로
      );
      return pattern.test(string);
    },
    async sendDataToBackend(data) {
      try {
        const response = await axios.post(
          'https://your-backend-url/api/endpoint',
          {
            scannedData: data,
          }
        );
        console.log('백엔드로 데이터 전송 성공:', response.data);
      } catch (error) {
        console.error('백엔드로 데이터 전송 중 오류 발생:', error);
      }
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
