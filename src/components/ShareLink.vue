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
import { usePriceStore } from '../stores/orderStore.js';
import apiClient from '../../src/api/axios.js';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useSocketStore } from '../stores/socketStore.js';
import { useRouter } from 'vue-router'; // vue-router 사용

export default {
  components: {
    QRCode,
  },
  setup() {
    const orderStore = useOrderStore();
    const socketStore = useSocketStore();
    const shareableLink = ref('');
    const router = useRouter(); // router 사용 선언
    const priceStore = usePriceStore();

    // 방 생성 함수
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

    // MENU_INFO 메시지를 감시하고 도착 시 페이지 이동
    watch(
      () => socketStore.messages,
      (newMessages) => {
        const lastMessage = newMessages[newMessages.length - 1];
        const parsedMessage = JSON.parse(lastMessage);

        // MENU_INFO 타입 메시지가 도착하면 페이지 이동
        if (parsedMessage.type === 'MENU_INFO' && orderStore.type === "BY_MENU") {
          console.log('MENU_INFO 메시지 도착:', parsedMessage);
          alert('MENU_INFO 수신 완료. 다음 페이지로 이동합니다.');
          router.push('/gamelist'); // 페이지 이동 (소켓 연결 유지)
        } else if (parsedMessage.type === 'PARTICIPANT_INFO' && orderStore.type === "BY_PRICE") {
          console.log('PARTICIPANT_INFO 메시지 도착:', parsedMessage);
          
          priceStore.setPriceData(parsedMessage);
          router.push('/requestPay')
        }
      },
      { deep: true }
    );

    // 컴포넌트가 마운트되면 방 생성
    onMounted(() => {
      createRoom();
    });

    // 컴포넌트가 언마운트되면 소켓 연결 해제 (소켓을 유지하려면 이 부분은 삭제해도 됨)
    onUnmounted(() => {
      // socketStore.disconnect(); // 소켓 연결을 해제하지 않음
    });

    return {
      shareableLink,
      goBack() {
        router.go(-1); // router 사용하여 뒤로가기 처리
      },
      goToNext() {
        router.push('/gamelist');
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
