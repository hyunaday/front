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

        let url;
        if (this.isValidUrl(decodedString)) {
          url = decodedString;
        } else {
          const parsedData = JSON.parse(decodedString);
          url = parsedData.url;
        }

        if (this.isValidUrl(url)) {
          console.log('링크로 이동:', url);
          const parsedUrl = new URL(url);
          const path = parsedUrl.pathname;
          const query = Object.fromEntries(parsedUrl.searchParams.entries());
          this.$router.push({ path, query });
        } else {
          console.error('유효하지 않은 URL:', url);
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
      try {
        // URL 객체로 변환이 가능하면 유효한 URL로 간주
        new URL(string);
        return true;
      } catch (error) {
        // URL 객체로 변환이 불가능하면 잘못된 URL
        return false;
      }
    }
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
