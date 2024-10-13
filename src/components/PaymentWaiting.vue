<template>
  <div class="main-container d-flex flex-column">
    <div class="header">
      <button @click="goBack" class="back-button">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h2 class="title">결제대기</h2>
    </div>

    <div class="content">
      <div class="circle-background">
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

      <h2 class="waiting-message">잠시만 기다려주세요</h2>
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
const totalParticipants = ref(priceStore.maxMemberCnt); // 전체 참여자 수
const route = useRoute();

const orderIdx = route.query.orderIdx;
const marketIdx = route.query.marketIdx;

// 참여자 수 업데이트 함수
const updateParticipantCount = () => {
  completedParticipants.value = orderInfoStore.maxMemberCnt;
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
};

// 소켓 메시지 감시
watch(
  () => socketStore.messages,
  (newMessages) => {
    const lastMessage = newMessages[newMessages.length - 1];
    if (!lastMessage) return;

    try {
      const parsedMessage = JSON.parse(lastMessage);
      if (parsedMessage.type === 'PARTICIPANT_INFO') {
        priceStore.setPriceData(parsedMessage);
        updateParticipantCount();
      }

      if (parsedMessage.type === 'MENU_INFO') {
          console.log('MENU_INFO 메시지 도착:', parsedMessage);
          orderStore.setOrderIdx(parsedMessage.orderIdx);
          orderStore.setMaxMemberCnt(parsedMessage.maxMemberCnt);
          orderStore.setType(parsedMessage.roomType);
          totalParticipants.value = parsedMessage.maxMemberCnt;
          alert('MENU_INFO 수신 완료. 다음 페이지로 이동합니다.');
          router.push('/menucheck'); // 페이지 이동 (소켓 연결 유지)
        } else if (parsedMessage.type === 'PARTICIPANT_INFO') {
          orderStore.setType("BY_PRICE")
          console.log('PARTICIPANT_INFO 메시지 도착:', parsedMessage);
          priceStore.setPriceData(parsedMessage);
          router.push('/requestPay')
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

// 컴포넌트가 언마운트될 때 소켓 연결 해제하지 않음 (필요 시 추가)
onBeforeUnmount(() => {
  // socketStore.disconnect(); // 소켓 연결 해제할 경우 사용
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
  text-align: center;
  margin-top: auto;
  margin-bottom: 100px;
}

.circle-background {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #6981d9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
}

.circle-text {
  font-size: 50px;
  color: white;
  font-weight: bold;
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
