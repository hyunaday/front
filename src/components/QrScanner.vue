<template>
  <div class="qr-scanner">
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <button class="close-button" @click="closeScanner">닫기</button>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue3-qrcode-reader';

export default {
  name: 'QrScanner',
  components: {
    QrcodeStream,
  },
  methods: {
    onDecode(decodedString) {
      try {
        console.log('스캔된 데이터:', decodedString);

        // 스캔된 데이터가 URL인지 확인
        if (this.isValidUrl(decodedString)) {
          console.log('링크로 이동:', decodedString);
          window.location.href = decodedString; // 현재 탭에서 링크 열기
        } else {
          // URL이 아닌 경우, 명함 정보로 간주하여 부모 컴포넌트로 전송
          console.log('명함 정보 스캔됨:', decodedString);
          this.$emit('scanned', decodedString); // 부모 컴포넌트로 전달

          // 페이지 이동 로직 (결제 방식에 따라 이동)
          if (this.$route.query.paymentType === 'SoloPay') {
            this.$router.push('/solopay');
          } else if (this.$route.query.paymentType === 'MainPay') {
            this.$router.push('/payinfo');
          } else {
            console.error('유효하지 않은 URL 또는 결제 방식:', decodedString);
          }
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
        'i'
      );
      return pattern.test(string);
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
