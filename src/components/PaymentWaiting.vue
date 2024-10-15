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
      <p class="waiting-description">{{ watingMessage }}</p>

      <!-- 참여 완료 메시지 (알림창처럼 상단에 고정) -->
      <transition name="fade">
        <div v-if="showCompletionMessage" class="completion-message">
          모두 참여를 완료했습니다.
          <button @click="closeCompletionMessage" class="close-error-button">X</button>
        </div>
      </transition>
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
const showCompletionMessage = ref(false); // 완료 메시지 표시 여부
const watingMessage = ref("다른 팀원들이 결제를 준비하고 있어요!"); // 에러 메시지 표시 여부

const orderIdx = route.query.orderIdx;
const marketIdx = route.query.marketIdx;

const updateParticipantCount = () => {
  totalParticipants.value = orderStore.maxMemberCnt;
};

// 뒤로 가기 버튼
const goBack = () => {
  socketStore.disconnect();
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

        // "모두 참여를 완료했습니다" 메시지를 3초 동안 표시 후 페이지 이동
        showCompletionMessage.value = true;
        setTimeout(() => {
          showCompletionMessage.value = false;
          router.push('/menucheck'); // 페이지 이동 (소켓 연결 유지)
        }, 3000);
      } else if (parsedMessage.type === 'PARTICIPANT_INFO') {
        orderStore.setType("BY_PRICE");
        console.log('PARTICIPANT_INFO 메시지 도착:', parsedMessage);
        priceStore.setPriceData(parsedMessage);
        showCompletionMessage.value = true;
        setTimeout(() => {
          showCompletionMessage.value = false;
          // router.push('/requestPay'); // 페이지 이동 (소켓 연결 유지)
        }, 3000);
        watingMessage.value = "팀장이 게임 여부를 선택하고 있어요!";
      } else if (parsedMessage.type === 'IS_GAME') {
        console.log('IS_GAME 메시지 도착:', parsedMessage);
        if (parsedMessage.isGame) {
          router.push('/lottery-game');
        } else {
          router.push('/requestPay');
        }
      }
      
      else if (parsedMessage.type === 'ENTER') {
        completedParticipants.value = parsedMessage.memberCnt;
        totalParticipants.value = parsedMessage.maxMemberCnt;
        orderStore.setMaxMemberCnt(parsedMessage.maxMemberCnt);
        orderStore.setType(parsedMessage.roomType);
      }
    } catch (error) {
      console.error('메시지 파싱 실패:', error);
    }
  },
  { deep: true }
);

// 성공 메시지 닫기 함수
const closeCompletionMessage = () => {
  showCompletionMessage.value = false;
};

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
  flex-grow: 1;
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
  animation: pulse 3s infinite ease-in-out, rotate 5s infinite linear;
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
    opacity: 1;
  }
  85% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* 성공 메시지 알림창 */
.completion-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  text-align: center;
  z-index: 1000;
  box-sizing: border-box;
  transition: opacity 0.5s ease-out;
  width: 90%;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close-error-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
  position: absolute;
  right: 10px;
  top: 10px;
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
