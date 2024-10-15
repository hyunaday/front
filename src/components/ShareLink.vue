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

        <!-- QR 코드 자리에 이미지 표시 -->
        <div v-if="orderStore.imgUrl">
          <img :src="orderStore.imgUrl" alt="공유된 이미지" class="shared-img" />
        </div>

        <br />
        <h3>함께 결제를 위한 이미지</h3>
        <br />
        <p style="text-align: center">
          함께 결제할 팀원들에게 해당 이미지를<br />
          공유하거나 링크를 보내주세요!
        </p>

        <!-- 버튼들 -->
        <button @click="shareLink" class="share-button">링크 전송</button>
      </div>

      <!-- 링크 복사 완료 모달 -->
      <transition name="fade">
        <div v-if="showModal" class="modal-overlay" @click="closeModal">
          <div class="modal-content" @click.stop>
            <h3>복사 완료</h3>
            <p>링크가 클립보드에 복사되었습니다!</p>
            <button @click="closeModal" class="close-modal-button">확인</button>
          </div>
        </div>
      </transition>

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

<script>
import { useOrderStore } from '../stores/orderStore.js';
import { usePriceStore } from '../stores/orderStore.js';
import apiClient from '../../src/api/axios.js';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useSocketStore } from '../stores/socketStore.js';
import { useRouter } from 'vue-router'; // vue-router 사용

export default {
  setup() {
    const orderStore = useOrderStore();
    const socketStore = useSocketStore();
    const shareableLink = ref('');
    const showCompletionMessage = ref(false); // 완료 메시지 표시 여부
    const showModal = ref(false); // 모달 상태 관리
    const router = useRouter();
    const priceStore = usePriceStore();

    const fetchOrderStore = async () => {}

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
        orderStore.setImgUrl(response.data.result.imgUrl); // imgUrl 설정

        // 방이 생성된 후 소켓 연결 시작
        socketStore.connect();
      } catch (error) {
        console.error('방 생성 실패:', error);
      }
    };

    const shareLink = () => {
      navigator.clipboard
        .writeText(orderStore.imgUrl)
        .then(() => {
          showModal.value = true; // 링크 복사 성공 시 모달 열기
        })
        .catch((err) => {
          console.error('링크 복사 실패:', err);
        });
    };

    // 모달 닫기
    const closeModal = () => {
      showModal.value = false;
    };

    // MENU_INFO 메시지를 감시하고 도착 시 페이지 이동
    watch(
      () => socketStore.messages,
      (newMessages) => {
        const lastMessage = newMessages[newMessages.length - 1];
        const parsedMessage = JSON.parse(lastMessage);

        // MENU_INFO 타입 메시지가 도착하면 알림창 표시 후 페이지 이동
        if (parsedMessage.type === 'MENU_INFO' && orderStore.type === 'BY_MENU') {
          console.log('MENU_INFO 메시지 도착:', parsedMessage);

          // "모두 참여를 완료했습니다" 메시지를 3초 동안 표시 후 페이지 이동
          showCompletionMessage.value = true;
          setTimeout(() => {
            showCompletionMessage.value = false;
            router.push('/menucheck'); // 페이지 이동 (소켓 연결 유지)
          }, 3000);
        } else if (parsedMessage.type === 'PARTICIPANT_INFO' && orderStore.type === 'BY_PRICE') {
          console.log('PARTICIPANT_INFO 메시지 도착:', parsedMessage);

          priceStore.setPriceData(parsedMessage);
          showCompletionMessage.value = true;
          setTimeout(() => {
            showCompletionMessage.value = false;
            router.push('/gamelist'); // 페이지 이동 (소켓 연결 유지)
          }, 3000);
        }
      },
      { deep: true }
    );

    // 컴포넌트가 마운트되면 방 생성
    onMounted(() => {
      fetchOrderStore(),
      createRoom();
    });

    // 컴포넌트가 언마운트되면 소켓 연결 해제 (소켓을 유지하려면 이 부분은 삭제해도 됨)
    onUnmounted(() => {
      // socketStore.disconnect(); // 소켓 연결을 해제하지 않음
    });

    // 성공 메시지 닫기 함수
    const closeCompletionMessage = () => {
      showCompletionMessage.value = false;
    };

    return {
      shareableLink,
      fetchOrderStore,
      orderStore,
      showModal,
      closeModal,
      showCompletionMessage,
      closeCompletionMessage,
      goBack() {
        router.go(-1); // router 사용하여 뒤로가기 처리
      },
      goToNext() {
        router.push('/gamelist');
      },
      shareLink,
    };
  },
};
</script>

<style scoped>
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
  margin-top: 20%;
}

.shared-img {
  margin-top: 20px;
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
}

.next-button,
.share-button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #6981d9; /* 버튼 색상 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px; /* 버튼 너비 */
  font-size: 19px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.share-button:hover {
  background-color: #b0b0b0; /* 마우스 오버 시 색상 변경 */
  color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
}

.modal-content {
  background: #ffffff;
  padding: 30px 20px; /* 패딩 추가 */
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 더 진한 그림자 */
  max-width: 360px; /* 최대 너비 조정 */
  width: 90%;
  animation: fadeIn 0.3s ease; /* 나타나는 애니메이션 추가 */
}

.modal-content h3 {
  font-size: 24px; /* 제목 폰트 크기 확대 */
  margin-bottom: 15px;
  color: #333; /* 좀 더 짙은 텍스트 색상 */
}

.modal-content p {
  font-size: 18px; /* 본문 폰트 크기 확대 */
  margin-bottom: 20px;
  color: #555; /* 본문 텍스트 색상 */
}

.close-modal-button {
  padding: 12px 24px; /* 버튼 크기 확대 */
  background-color: #6981d9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px; /* 버튼 폰트 크기 확대 */
  transition: background-color 0.3s ease;
}

.close-modal-button:hover {
  background-color: #4a5c9c;
}

/* 모달 애니메이션 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 성공 메시지 알림창 */
.completion-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #6981d9;
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

.completion-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #6981d9;
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
</style>
