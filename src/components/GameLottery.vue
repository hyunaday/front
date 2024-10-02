<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <button @click="goBack" class="back-button">
      <i class="fas fa-chevron-left"></i>
    </button>
    <div class="main-container">
      <h2>나만 아니면 돼</h2>
      <div class="input-group">
        <label for="participants">참여자 목록:</label>
        <input v-model="participantInput" placeholder="이름 입력" />
        <button @click="addParticipant">추가</button>
      </div>
      <div class="participants-list">
        <h3>참여자:</h3>
        <ul>
          <li v-for="(participant, index) in participants" :key="index">
            {{ participant }}
          </li>
        </ul>
      </div>

      <canvas
        ref="canvas"
        width="400"
        height="400"
        class="roulette-canvas"
      ></canvas>

      <button @click="startLottery" :disabled="participants.length === 0">
        제비 뽑기
      </button>

      <!-- 모달창 -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h3>행운의 주인공</h3>
          <p>축하합니다~! {{ winner }}님이 행운의 중인공이 되었습니다!!</p>
          <button @click="closeModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      participants: [],
      participantInput: '',
      winner: null,
      rotationAngle: 0,
      spinning: false,
      showModal: false, // 모달 표시 여부
    };
  },
  methods: {
    addParticipant() {
      if (this.participantInput) {
        this.participants.push(this.participantInput);
        this.participantInput = ''; // 입력 필드 초기화
      }
    },
    startLottery() {
      if (this.spinning) return; // 이미 회전 중이면 무시
      this.spinning = true;
      const randomIndex = Math.floor(Math.random() * this.participants.length);
      this.animateRoulette(randomIndex);
    },
    animateRoulette(winnerIndex) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const totalSegments = this.participants.length;
      const arc = (2 * Math.PI) / totalSegments;
      const rotationSpeed = 10; // 회전 속도
      const totalRotations = 5; // 총 회전 수
      const totalAnimationTime = 3000; // 총 애니메이션 시간 (밀리초)
      const startTime = performance.now();

      const animate = (currentTime) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 현재 회전 각도 계산
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / totalAnimationTime, 1);
        this.rotationAngle =
          progress * totalRotations * 2 * Math.PI + winnerIndex * arc; // 최종 각도 계산

        // 룰렛 그리기
        for (let i = 0; i < totalSegments; i++) {
          ctx.beginPath();
          ctx.moveTo(150, 150); // 중심점
          ctx.arc(
            150,
            150,
            150,
            this.rotationAngle + i * arc,
            this.rotationAngle + (i + 1) * arc
          );
          ctx.fillStyle = this.getColor(i); // 색상 적용
          ctx.fill();
          ctx.closePath();
        }

        // 애니메이션 종료 조건
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.winner = this.participants[winnerIndex]; // 당첨자 설정
          this.spinning = false; // 회전 종료
          this.showModal = true; // 모달 표시
        }
      };

      requestAnimationFrame(animate);
    },
    getColor(index) {
      const colors = [
        'yellow',
        'skyblue',
        'green',
        'yellow',
        'orange',
        'purple',
        'pink',
        'cyan',
        'magenta',
        'lime',
      ];
      return colors[index % colors.length];
    },
    closeModal() {
      this.showModal = false; // 모달 닫기
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 360px;
  height: 800px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.back-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  color: #000;
  text-align: left;
  margin-left: -270px;
  margin-bottom: 30px;
}
.input-group {
  margin-bottom: 20px;
}
.participants-list {
  margin: 10px 0;
}
.roulette-canvas {
  margin-top: 20px;
  margin-left: 30%;
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
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  width: 360px;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
