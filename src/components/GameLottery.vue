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
      <!-- 화살표 이미지 추가 -->
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
          <button @click="closeModal">다시 뽑기</button>
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
      rotationAngle: 0, // 현재 회전 각도
      spinning: false, // 회전 중 여부
      showModal: false, // 모달 표시 여부
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
        this.participantInput = ''; // 입력 필드 초기화
        this.drawRoulette(); // 참가자 추가 시 룰렛 다시 그리기
      } else {
        // 중복 또는 빈 입력에 대한 피드백을 추가할 수 있습니다.
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

      // 각 세그먼트의 각도 계산 (참여자가 1명일 때도 정상적으로 표시)
      const arc = (2 * Math.PI) / totalSegments;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < totalSegments; i++) {
        const angleStart = i * arc + this.rotationAngle;
        const angleEnd = (i + 1) * arc + this.rotationAngle;

        // 룰렛 칸 그리기
        ctx.beginPath();
        ctx.moveTo(150, 150); // 중심점
        ctx.arc(150, 150, 150, angleStart, angleEnd);
        ctx.fillStyle = this.getColor(i); // 색상 적용
        ctx.fill();
        ctx.closePath();

        // 텍스트 그리기
        ctx.save();
        ctx.translate(150, 150); // 중심으로 이동
        ctx.rotate(angleStart + arc / 2); // 텍스트가 중간에 위치하게 회전
        ctx.textAlign = 'right'; // 텍스트 오른쪽 정렬
        ctx.font = '20px Pretendard';
        ctx.fillStyle = '#000';
        ctx.fillText(this.participants[i], 130, 10); // 텍스트 위치
        ctx.restore();
      }

      // 참여자가 1명일 때는 텍스트가 중앙에 위치하도록 추가 조정
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

      // 중앙 원 그리기 (선택 사항)
      ctx.beginPath();
      ctx.arc(150, 150, 10, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.closePath();
    },
    startLottery() {
      if (this.spinning || this.participants.length === 0) return; // 이미 회전 중이거나 참가자가 없으면 무시
      this.spinning = true;

      const totalSegments = this.participants.length;
      const arc = (2 * Math.PI) / totalSegments;

      // 랜덤하게 당첨자 인덱스 선택
      const randomSegment = Math.floor(Math.random() * totalSegments);

      // 화살표가 12시 방향을 가리키도록 회전 각도 계산
      const targetAngle =
        5 * 2 * Math.PI + // 최소 5바퀴 회전
        randomSegment * arc + // 목표 세그먼트
        Math.PI / 2; // 12시 방향으로 조정

      const startTime = performance.now();
      const duration = 5000; // 5초 동안 회전

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out 효과 (속도 감소)
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);

        // 회전 각도 업데이트
        this.rotationAngle = easeOutProgress * targetAngle;

        this.drawRoulette();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // 최종 회전 각도에서 당첨자 계산
          const normalizedAngle = this.rotationAngle % (2 * Math.PI);
          // 12시 방향을 기준으로 당첨자 인덱스 계산
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
      window.location.href = '/lottery-game';
    },
    goToPayInfo() {
      this.$router.push('/payinfo'); // Vue 라우터를 사용하여 페이지 이동
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
