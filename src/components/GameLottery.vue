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
      rotationAngle: 0,
      spinning: false,
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
      if (this.participantInput) {
        this.participants.push(this.participantInput);
        this.participantInput = ''; // 입력 필드 초기화
      }
    },
    drawRoulette() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const totalSegments = this.participants.length;
      const arc = (2 * Math.PI) / totalSegments;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < totalSegments; i++) {
        const angleStart = i * arc;
        const angleEnd = (i + 1) * arc;

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
      const baseRotationSpeed = 0.3; // 회전 시작 속도
      const totalAnimationTime = 5000; // 총 애니메이션 시간 (밀리초)
      const startTime = performance.now();
      const targetRotation = 5; // 총 몇 바퀴를 돌 것인지

      const animate = (currentTime) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 현재 시간 계산
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / totalAnimationTime, 1);

        // 회전 속도를 점점 줄이기 위한 계산 (Easing)
        const easingFactor = 1 - progress; // 시간이 지남에 따라 점점 줄어듦
        const currentSpeed = baseRotationSpeed * easingFactor;

        // 회전 각도 계산
        this.rotationAngle += currentSpeed; // 현재 속도에 따라 각도 증가
        const finalAngle = this.rotationAngle + winnerIndex * arc;

        // 룰렛 그리기
        for (let i = 0; i < totalSegments; i++) {
          const angleStart = finalAngle + i * arc;
          const angleEnd = finalAngle + (i + 1) * arc;

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
    goToPayInfo() {
      window.location.href = '/payinfo'; // 페이지 이동
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
