<template>
  <div class="main-container d-flex flex-column">
    <div class="header">
      <button @click="goBack" class="back-button">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h2 class="title">결제대기</h2>
    </div>

    <div class="content">
      <div class="circle-background pulse rotate">
        <RadialProgress
          :diameter="200"
          :completed-steps="completedParticipants"
          :total-steps="totalParticipants"
        >
          <text
            x="50%"
            y="50%"
            text-anchor="middle"
            dominant-baseline="middle"
            class="circle-text"
          >
            {{ completedParticipants }} / {{ totalParticipants }}
          </text>
        </RadialProgress>
      </div>

      <h2 class="waiting-message blink">잠시만 기다려주세요</h2>
      <p class="waiting-description">다른 팀원들이 결제를 준비하고 있어요!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import RadialProgress from 'vue3-radial-progress';
import { useOrderStore, useOrderInfoStore, usePriceStore } from '../stores/orderStore.js';
import { useSocketStore } from '../stores/socketStore.js';

const router = useRouter();
const socketStore = useSocketStore();
const orderStore = useOrderStore();
const orderInfoStore = useOrderInfoStore();
const priceStore = usePriceStore();
const completedParticipants = ref(0);
const totalParticipants = ref(0); // 전체 참여자 수
const route = useRoute();

const orderIdx = route.query.orderIdx;
const marketIdx = route.query.marketIdx;

const updateParticipantCount = () => {
  totalParticipants.value = orderStore.maxMemberCnt;
};

// 뒤로 가기 버튼
const goBack = () => {
  router.go(-1);
};

// 방 입장 및 구독
const joinRoom = async () => {
  socketStore.connect();
};

// 주문 정보 가져오기
const loadOrderInfo = async () => {
  orderInfoStore.getOrderInfo(orderIdx, marketIdx);
  orderStore.setOrderIdx(orderIdx);
};

// 소켓 메시지 감시
watch(
  () => socketStore.messages,
  (newMessages) => {
    const lastMessage = newMessages[newMessages.length - 1];
    if (!lastMessage) return;

    try {
      const parsedMessage = JSON.parse(lastMessage);

      if (parsedMessage.type === 'MENU_INFO') {
        console.log('MENU_INFO 메시지 도착:', parsedMessage);
        orderStore.setOrderIdx(parsedMessage.orderIdx);
        orderStore.setMaxMemberCnt(parsedMessage.maxMemberCnt);
        orderStore.setType(parsedMessage.roomType);
        totalParticipants.value = parsedMessage.maxMemberCnt;
        alert('MENU_INFO 수신 완료. 다음 페이지로 이동합니다.');
        router.push('/menucheck'); // 페이지 이동 (소켓 연결 유지)
      } else if (parsedMessage.type === 'PARTICIPANT_INFO') {
        orderStore.setType("BY_PRICE");
        console.log('PARTICIPANT_INFO 메시지 도착:', parsedMessage);
        priceStore.setPriceData(parsedMessage);
        router.push('/requestPay');
      } else if (parsedMessage.type === 'ENTER') {
        completedParticipants.value = parsedMessage.memberCnt;
        orderStore.setMaxMemberCnt(parsedMessage.maxMemberCnt);
        orderStore.setType(parsedMessage.roomType);
      }
    } catch (error) {
      console.error('메시지 파싱 실패:', error);
    }
  },
  { deep: true }
);

// 컴포넌트가 마운트될 때 소켓 연결 및 방 입장, 주문 정보 로드
onMounted(async () => {
  await loadOrderInfo();
  joinRoom();
  updateParticipantCount();
});
</script>

<style scoped>
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1; /* 화면 중앙으로 정렬하기 위해 flex-grow 사용 */
  text-align: center;
}

.circle-background {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #6981d9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: pulse 3s infinite ease-in-out, rotate 5s infinite linear; /* pulse 및 rotate 애니메이션 추가 */
  margin-bottom: 40px;
}

.circle-text {
  font-size: 50px;
  color: white;
  font-weight: bold;
}



/* 텍스트 깜박임 애니메이션 */
.blink {
  animation: blink 3s ease-in-out infinite;
}

@keyframes blink {
  0%, 70% {
    opacity: 1; /* 글씨가 보이는 구간 */
  }
  85% {
    opacity: 0; /* 서서히 사라짐 */
  }
  100% {
    opacity: 1; /* 다시 서서히 나타남 */
  }
}

.waiting-message {
  margin-top: 20px;
  font-size: 20px;
}

.waiting-description {
  font-size: 14px;
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
</style>
