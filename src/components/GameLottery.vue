<template>
  <div class="main-container d-flex flex-column">
    <div class="header">
      <button @click="goBack" class="back-button">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h2 class="title">룰렛 돌리기</h2>
    </div>
    <div class="roulette-container">
      <canvas
        ref="canvas"
        width="300"
        height="300"
        class="roulette-canvas"
      ></canvas>
      <img src="../assets/images/arrow.png" alt="화살표" class="arrow-image" />
    </div>

    <button v-if="isOwner"
      @click="startLottery"
      :disabled="participants.length === 0 || spinning"
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
          <span class="winner-text">{{ winner }}</span>님이 당첨 되었습니다!!
        </p>
        <div class="button-group">
          <button v-if="isOwner" @click="restartLottery">다시 뽑기</button>
          <button v-if="isOwner" @click="confirm">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSocketStore } from '../stores/socketStore.js';
import { useMemberStore } from '../stores/MemberStore.js';
import { useOrderStore, useOrderInfoStore } from '../stores/orderStore.js';
import { onMounted, watch } from 'vue';

export default {
  data() {
    return {
      participants: [], // 소켓 응답으로 받은 참가자 정보를 담습니다.
      winner: null,
      rotationAngle: 0,
      targetAngle: 0,
      spinning: false,
      showModal: false,
      isOwner: false,
    };
  },
  mounted() {
    this.setOwner(); // 방장 여부 확인
    this.handleSocketResponse(); // 소켓 응답 감시
    this.sendSocketRequest(); // 참가자 목록 요청
  },
  watch: {
    participants: {
      handler() {
        this.drawRoulette(); // 참가자 정보가 업데이트되면 룰렛을 그림
      },
      deep: true,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    sendSocketRequest() {
      const socketStore = useSocketStore();
      const memberStore = useMemberStore();
      const orderStore = useOrderStore();

      if (!socketStore.stompClient || !socketStore.stompClient.connected) {
        console.error('소켓이 연결되지 않았습니다.');
        return;
      }

      const message = {
        orderIdx: orderStore.orderIdx,
        memberId: memberStore.memberId,
      };
      if (this.isOwner) {
        try {
        socketStore.stompClient.send(
            '/pub/order/room/list',
            {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'content-type': 'application/json',
              'MemberId': memberStore.memberId,
            },
            JSON.stringify(message)
          );
        } catch (error) {
          console.error('소켓 요청 실패:', error);
        }
      }
      
    },
    setOwner() {
      const memberStore = useMemberStore();
      const orderInfoStore = useOrderInfoStore();

      this.isOwner = memberStore.idx === orderInfoStore.ownerMemberIdx;
      console.log("memberStore.idx: ", memberStore.idx);
      console.log("orderInfoStore.ownerMemberIdx: ", orderInfoStore.ownerMemberIdx);
      console.log("isOwner: ", this.isOwner);
    },
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
              // 참가자 목록을 업데이트
              this.participants = parsedMessage.memberInfoList.map(
                (member) => member.memberName
              );
              this.targetAngle = parsedMessage.targetAngle;
              this.drawRoulette();
            }

            if (parsedMessage.type === 'GAME_RESULT') {
              // 서버에서 받은 당첨자 정보
              this.winner = parsedMessage.memberName;
              this.targetAngle = parsedMessage.targetAngle;
              this.selectWinner(); // 당첨자를 바탕으로 룰렛을 돌림
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
      if (!canvas || this.participants.length === 0) return;

      const ctx = canvas.getContext('2d');
      const totalSegments = this.participants.length;
      const arc = (2 * Math.PI) / totalSegments;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 초기화

      for (let i = 0; i < totalSegments; i++) {
        const angleStart = i * arc + this.rotationAngle;
        const angleEnd = (i + 1) * arc + this.rotationAngle;

        ctx.beginPath();
        ctx.moveTo(150, 150); // 중심으로 이동
        ctx.arc(150, 150, 150, angleStart, angleEnd); // 원 그리기
        ctx.fillStyle = this.getColor(i);
        ctx.fill();
        ctx.closePath();

        // 참가자 이름 표시
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(angleStart + arc / 2);
        ctx.textAlign = 'right';
        ctx.font = '20px Pretendard';
        ctx.fillStyle = '#000';
        ctx.fillText(this.participants[i], 130, 10);
        ctx.restore();
      }
    },
    startLottery() {
      if (this.spinning || this.participants.length === 0) return;
      this.spinning = true;

      // 서버에 게임 시작 요청 전송
      this.sendGameRequest();
    },
    sendGameRequest() {
      const socketStore = useSocketStore();
      const memberStore = useMemberStore();
      const orderStore = useOrderStore();
      const orderInfoStore = useOrderInfoStore();

      if (!socketStore.stompClient || !socketStore.stompClient.connected) {
        console.error('소켓이 연결되지 않았습니다.');
        return;
      }

      const message = {
        orderIdx: orderStore.orderIdx,
        memberId: memberStore.memberId,
      };
      if (orderInfoStore.ownerMemberIdx === memberStore.memberId) {
          try {
          socketStore.stompClient.send(
            '/pub/order/room/game/start',
            {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'content-type': 'application/json',
              'MemberId': memberStore.memberId,
            },
            JSON.stringify(message)
          );
        } catch (error) {
          console.error('게임 시작 소켓 요청 실패:', error);
        }
      }

      
    },
    selectWinner() {
      const winnerIndex = this.participants.findIndex(
        (participant) => participant === this.winner
      );
      const totalSegments = this.participants.length;
      const arc = (2 * Math.PI) / totalSegments;

      // 해당 참가자의 범위 내에서 랜덤한 각도를 생성
      const randomWithinSegment = Math.random() * arc;
      const targetAngletmp = 5 * 2 * Math.PI + winnerIndex * arc + randomWithinSegment + Math.PI / 2;

      const startTime = performance.now();
      const duration = 5000;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);

        this.rotationAngle = easeOutProgress * this.targetAngle;
        console.log("targetAngletmp: ", this.rotationAngle);

        this.drawRoulette(); // 각도에 따라 룰렛을 다시 그리기

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.spinning = false;
          this.showModal = true;
        }
      };

      requestAnimationFrame(animate);
    },
    getColor(index) {
      const colors = ['#f14545', '#54e4fa', '#ca66f2', '#80ff80', '#9FC5E8', '#F6B26B'];


      return colors[index % colors.length];
    },
    closeModal() {
      this.showModal = false;
    },
    restartLottery() {
      this.showModal = false;
      this.rotationAngle = 0;
      this.spinning = false;
      this.drawRoulette();
    },
    confirm() {
      this.$router.push({
      path: '/requestPay',
      query: {
        winner: this.winner,
      },
    });
    },
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
  overflow: hidden;
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
.roulette-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin-top: 50%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
  border-radius: 50%; /* 둥근 테두리 */
}

.roulette-canvas {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* 원 모양 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
}
.arrow-image {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: auto;
  pointer-events: none;
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
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  position: relative;
}
.modal-content h3 {
  font-size: 24px;
  margin-bottom: 15px;
}
.modal-content .winner-text {
  font-size: 24px;
  font-weight: bold;
  color: #6981d9;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.button-group button {
  width: 48%;
  background-color: #6981d9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.button-group button:hover {
  background-color: #4a5c9c;
}
.start-lottery-button {
  background-color: #6981d9;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 90px;
  width: 300px;
}
.start-lottery-button:hover {
  background-color: #4a5c9c;
  transform: scale(1.05);
}
.start-lottery-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
