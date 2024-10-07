<template>
  <div class="main-container d-flex flex-column">
    <div class="header">
      <button @click="goBack" class="back-button">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h2 class="title">룰렛 돌리기</h2>
    </div>
    <img src="../assets/images/logo.png" alt="로고" class="logo-image" />
    <div class="input-group">
      <label for="participants"></label>
      <input v-model="participantInput" placeholder="참여자를 추가해주세요" />
      <button @click="addParticipant" class="add-participant-button">+</button>
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
          <button @click="goToPayInfo">확인</button>
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
      showModal: false,
      selectedMethod: null, // 선택된 방법
    };
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
    addParticipant() {
      const trimmedInput = this.participantInput.trim();
      if (trimmedInput && !this.participants.includes(trimmedInput)) {
        this.participants.push(trimmedInput);
        this.participantInput = '';
        this.drawRoulette();
      } else {
        if (!trimmedInput) {
          alert('참여자 이름을 입력해주세요.');
        } else {
          alert('이미 추가된 참여자입니다.');
        }
      }
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
        ctx.fillText(this.participants[i], 130, 10);
        ctx.restore();
      }

      if (totalSegments === 1) {
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(this.rotationAngle);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '20px Pretendard';
        ctx.fillStyle = '#000';
        ctx.fillText(this.participants[0], 0, 0);
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
      this.participantInput = '';
      this.drawRoulette();
    },
    goToPayInfo() {
      // 선택된 방법에 따라 이동할 페이지 결정
      const targetPage =
        this.selectedMethod === 'split' ? '/paysplit' : '/paymenu';
      this.$router.push(targetPage);
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
  width: 50px;
  height: 50px;
}
.start-lottery-button {
  padding: 12px 20px; /* 버튼 내부 여백 */
  background-color: #007bff; /* 배경색 */
  color: white; /* 글자 색상 */
  border: none; /* 테두리 없음 */
  border-radius: 5px; /* 모서리 둥글게 */
  cursor: pointer; /* 커서 포인터로 변경 */
  font-size: 16px; /* 글자 크기 */
  margin-top: 20px; /* 위쪽 여백 */
  transition: background-color 0.3s; /* 호버 시 배경색 전환 효과 */
}

/* 호버 상태 스타일 */
.start-lottery-button:hover {
  background-color: #0056b3; /* 호버 시 배경색 */
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}
.button-group {
  margin-top: 10px;
}
.button-group button {
  margin: 0 5px; /* 버튼 간의 간격 */
}
.winner-text {
  font-weight: bold; /* 당첨자 글자 강조 */
}
</style>
