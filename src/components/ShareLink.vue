<template>
  <div>
    <div class="main-container d-flex flex-column">
      <div class="share-link-container">
        <div class="header">
          <button @click="goBack" class="back-button">
            <i class="fas fa-chevron-left"></i>
          </button>
          <h2 class="title">결제 초대하기</h2>
        </div>
        <QRCode :value="shareableLink" :size="200" />
        <br />
        <h3>함께 결제를 위한 QR코드</h3>
        <br />
        <p style="text-align: center">
          함께 결제할 팀원들에게 해당 QR코드를<br />
          공유하거나 링크를 보내주세요!
        </p>
        <button @click="shareLink" class="share-button">링크 전송</button>
        <button @click="goToNext" class="next-button">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode.vue';
import { useOrderStore } from '../stores/orderStore.js';
import apiClient from '../../src/api/axios.js';
import { onMounted, onUnmounted, ref } from 'vue';
import { useSocketStore } from '../stores/socketStore.js';

export default {
  components: {
    QRCode,
  },
  setup() {
    const orderStore = useOrderStore();
    const socketStore = useSocketStore();
    const shareableLink = ref('');

    const createRoom = async () => {
      try {
        const response = await apiClient.post('/order/room/create', {
          orderIdx: orderStore.orderIdx,
          maxMemberCnt: orderStore.maxMemberCnt,
          type: orderStore.type,
        });
        shareableLink.value = `${response.data.result.idx}`;
        console.log('방 생성 성공:', response.data);

        // 방이 생성된 후 소켓 연결 시작
        socketStore.connect();
      } catch (error) {
        console.error('방 생성 실패:', error);
      }
    };

    onMounted(() => {
      createRoom();
    });

    onUnmounted(() => {
      socketStore.disconnect();
    });

    return {
      shareableLink,
      goBack() {
        window.history.back();
      },
      goToNext() {
        this.$router.push('/gamelist');
      },
      shareLink() {
        navigator.clipboard
          .writeText(shareableLink.value)
          .then(() => {
            alert('링크가 클립보드에 복사되었습니다!');
          })
          .catch((err) => {
            console.error('링크 복사 실패:', err);
          });
      },
    };
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  overflow: hidden; /* 전체 스크롤 숨김 */
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  width: 100%;
}

.back-button {
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #000;
}

.title {
  font-size: 18px;
  margin: 0;
  text-align: center;
}

.share-link-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50%;
}

.next-button,
.share-button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: white; /* 버튼 색상 */
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px; /* 버튼 너비 */
  font-size: 19px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.next-button:hover,
.share-button:hover {
  background-color: #6981d9; /* 마우스 오버 시 색상 변경 */
  color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 호버 시 더 강조된 그림자 */
}
</style>
