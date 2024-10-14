<template>
  <div class="main-container d-flex flex-column">
    <div class="header">
      <button @click="goBack" class="back-button">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h2 class="title">룰렛 돌리기</h2>
    </div>
    <img src="../assets/images/logo.png" alt="로고" class="logo-image" />

    <div class="roulette-container">
      <canvas
        ref="canvas"
        width="300"
        height="300"
        class="roulette-canvas"
      ></canvas>
      <img src="../assets/images/arrow.png" alt="화살표" class="arrow-image" />
    </div>

    <button
      @click="startLottery"
      :disabled="participants.length === 0"
      class="start-lottery-button"
    >
      당첨자 추첨하기
    </button>

    <!-- 모달창 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>행운의 주인공</h3>
        <p>
          축하합니다~!
          <span class="winner-text">{{ winner }}</span
          >님이 당첨 되었습니다!!
        </p>
        <div class="button-group">
          <button @click="restartLottery">다시 뽑기</button>
          <button @click="confirm">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNavigationStore } from '../../src/stores/navigation.js'; // Pinia Store import
import { useSocketStore } from '../stores/socketStore.js';
import { useMemberStore } from '../stores/memberStore.js';
import { useOrderStore, useOrderInfoStore } from '../stores/orderStore.js';

import { watch, onMounted } from 'vue';

export default {
  data() {
    return {
      participants: [],
      winner: null,
      rotationAngle: 0,
      spinning: false,
      showModal: false,
    };
  },
  mounted() {
    this.handleSocketResponse(); // 소켓 응답 감시 시작
    this.sendSocketRequest(); // 페이지 로드 시 소켓 요청
  },
  watch: {
    participants: {
      handler() {
        this.drawRoulette();
      },
      deep: true,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 소켓 요청을 보내는 함수
    sendSocketRequest() {
      const socketStore = useSocketStore();
      const memberStore = useMemberStore();
      const orderInfoStore = useOrderInfoStore();

      if (!socketStore.stompClient || !socketStore.stompClient.connected) {
        console.error('소켓이 연결되지 않았습니다.');
        return;
      }
      if (memberStore.memberId === orderInfoStore.ownerMemberIdx) {
        const message = {
          orderIdx: 1,
          memberId: memberStore.memberId,
        };

        try {
          socketStore.stompClient.send(
            '/pub/order/room/list',
            {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'MemberId': memberStore.memberId,
              'content-type': 'application/json',
            },
            JSON.stringify(message)
          );
        } catch (error) {
          console.error('소켓 요청 실패:', error);
        }
      }
    },
    // 소켓으로부터 받은 데이터를 처리하는 함수
    handleSocketResponse() {
      const socketStore = useSocketStore();

      watch(
        () => socketStore.messages,
        (newMessages) => {
          const lastMessage = newMessages[newMessages.length - 1];
          if (!lastMessage) return;

          try {
            const parsedMessage = JSON.parse(lastMessage);

            if (parsedMessage.type === 'MEMBER_LIST_INFO') {
              const memberNameList = parsedMessage.memberInfoList.map(member => member.memberName);

              // store에 저장된 memberNameList를 participants로 설정
              this.participants = [...memberNameList];
            }
          } catch (error) {
            console.error('메시지 파싱 실패:', error);
          }
        },
        { deep: true }
      );
    },
    drawRoulette() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const totalSegments = this.participants.length;

      if (totalSegments === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const arc = (2 * Math.PI) / totalSegments;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < totalSegments; i++) {
        const angleStart = i * arc + this.rotationAngle;
        const angleEnd = (i + 1) * arc + this.rotationAngle;

        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, angleStart, angleEnd);
        ctx.fillStyle = this.getColor(i);
        ctx.fill();
        ctx.closePath();

        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(angleStart + arc / 2);
        ctx.textAlign = 'right';
        ctx.font = '20px Pretendard';
        ctx.fillStyle = '#000';
        ctx.fillText(this.participants[i], 130, 10); // 12시 방향에 텍스트를 그립니다
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(150, 150, 10, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.closePath();
    },
    startLottery() {
      if (this.spinning || this.participants.length === 0) return;
      this.spinning = true;

      const totalSegments = this.participants.length;
      const arc = (2 * Math.PI) / totalSegments;

      const randomSegment = Math.floor(Math.random() * totalSegments);

      const targetAngle = 5 * 2 * Math.PI + randomSegment * arc + Math.PI / 2;

      const startTime = performance.now();
      const duration = 5000;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutProgress = 1 - Math.pow(1 - progress, 3);

        this.rotationAngle = easeOutProgress * targetAngle;

        this.drawRoulette();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          const normalizedAngle = this.rotationAngle % (2 * Math.PI);
          const winnerIndex =
            Math.floor((normalizedAngle + Math.PI / 2) / arc) % totalSegments;

          this.winner = this.participants[winnerIndex];
          this.spinning = false;
          this.showModal = true;
        }
      };

      requestAnimationFrame(animate);
    },
    getColor(index) {
      const colors = [
        '#d0cdc9',
        '#918981',
        '#9fa4a3',
        '#717b7f',
        '#667579',
        '#4c5b6c',
        '#698476',
        '#667579',
      ];
      return colors[index % colors.length];
    },
    closeModal() {
      this.showModal = false;
    },
    restartLottery() {
      this.showModal = false;
      this.participants = [];
      this.winner = null;
      this.rotationAngle = 0;
      this.spinning = false;
      this.drawRoulette();
    },
    confirm() {
      const navigationStore = useNavigationStore();

      // 경로가 정의되어 있는지 확인
      if (
        !navigationStore.navigationPath ||
        navigationStore.navigationPath.length === 0
      ) {
        console.error('navigationPath가 정의되지 않았거나 비어 있습니다.');
        return; // 경로가 없으면 동작하지 않음
      }

      const targetPage =
        navigationStore.navigationPath[
          navigationStore.navigationPath.length - 1
        ];
      this.$router.push(targetPage); // 저장된 최종 목적지로 이동
      navigationStore.clearNavigationPath(); // 경로 초기화
    },
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
</style>


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

.back-button {
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #000;
  margin-bottom: auto;
}

.title {
  font-size: 18px;
  margin: 0;
  text-align: center;
}
.input-group {
  margin-top: 30px;
  margin-left: 20px;
  margin-bottom: 20px;
}
input {
  padding: 12px; /* 내부 여백 */
  border: 1px solid #ccc; /* 테두리 색상 */
  border-radius: 25%; /* 모서리 둥글게 */
  width: 250px; /* 너비 조정 */
  font-size: 16px; /* 글자 크기 */
  text-align: center;
  margin-right: 10px;
  color: #333; /* 글자 색상 */
  background-color: #f9f9f9; /* 배경색 */
  transition: border-color 0.3s, box-shadow 0.3s; /* 호버 시 테두리 색상 전환 효과 */
}

/* 포커스 상태 스타일 */
input:focus {
  border-color: #007bff; /* 포커스 시 테두리 색상 */
  outline: none; /* 기본 아웃라인 제거 */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 포커스 시 그림자 효과 */
}
.roulette-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin-top: 20px;
}
.roulette-canvas {
  width: 100%;
  height: 100%;
}
.arrow-image {
  position: absolute;
  top: -20px; /* 캔버스 위에 위치하도록 조정 */
  left: 50%;
  transform: translateX(-50%);
  width: 40px; /* 화살표 크기 조정 */
  height: auto;
  pointer-events: none; /* 화살표 클릭 방지 */
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
}
.modal-content {
  background: #ffffff; /* 배경색 */
  padding: 20px; /* 내부 여백 */
  border-radius: 10px; /* 모서리 둥글게 */
  text-align: center; /* 텍스트 중앙 정렬 */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); /* 그림자 효과 */
  max-width: 400px; /* 최대 너비 */
  width: 90%; /* 반응형 너비 */
  position: relative; /* 포지셔닝 */
}
.modal-content h3 {
  font-size: 24px; /* 제목 크기 */
  margin-bottom: 15px; /* 아래 여백 */
  color: #333; /* 제목 색상 */
}
.modal-content button {
  background-color: #6981d9; /* 버튼 배경색 */
  color: white; /* 버튼 글자색 */
  padding: 10px 20px; /* 버튼 내부 여백 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 5px; /* 버튼 모서리 둥글게 */
  cursor: pointer; /* 커서 변경 */
  transition: background-color 0.3s; /* 배경색 전환 효과 */
}
.button-group {
  display: flex; /* 수평 배치 */
  justify-content: space-between; /* 버튼 간 간격 조정 */
  margin-top: 20px; /* 버튼 그룹과 다른 요소 간의 여백 */
}

.button-group button {
  width: 48%; /* 버튼 너비 조정 */
}

.modal-content button:hover {
  background-color: #4a5c9c; /* 호버 시 색상 변경 */
}
.start-lottery-button {
  background-color: #6981d9; /* 버튼 배경색 (녹색) */
  color: white; /* 글자색 */
  padding: 12px 24px; /* 버튼 내부 여백 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 5px; /* 모서리 둥글게 */
  font-size: 18px; /* 글자 크기 */
  cursor: pointer; /* 커서 변경 */
  transition: background-color 0.3s, transform 0.2s; /* 전환 효과 */
  margin-top: 90px; /* 위쪽 여백 */
  width: 300px;
}

.start-lottery-button:hover {
  background-color: #4a5c9c; /* 호버 시 색상 변경 */
  transform: scale(1.05); /* 호버 시 살짝 커지기 */
}

.start-lottery-button:disabled {
  background-color: #6c757d; /* 비활성화된 버튼 색상 */
  cursor: not-allowed; /* 비활성화된 버튼 커서 */
}
.logo-image {
  width: 300px;
  height: auto;
  margin-top: auto;
}
.winner-text {
  font-size: 24px; /* 글씨 크기 조정 */
  font-weight: bold;
  color: #6981d9; /* 글자 색상 (원하는 색상으로 변경 가능) */
}
.add-participant-button {
  background-color: #6981d9; /* 배경색 (녹색) */
  color: white; /* 글자색 */
  font-size: 24px; /* 글자 크기 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 50%; /* 둥근 버튼 */
  width: 50px; /* 너비 */
  height: 50px; /* 높이 */
  cursor: pointer; /* 커서 변경 */
  display: flex; /* 수평 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  transition: background-color 0.3s, transform 0.2s; /* 전환 효과 */
}

.add-participant-button:hover {
  background-color: #4a5c9c; /* 호버 시 색상 변경 */
  transform: scale(1.1); /* 호버 시 살짝 커지기 */
}

.add-participant-button:focus {
  outline: none; /* 포커스 시 아웃라인 제거 */
}
</style>
