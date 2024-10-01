<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <button @click="goBack" class="back-button">
      <i class="fas fa-chevron-left"></i>
    </button>

    <div class="lottery-container">
      <h2>나만 아니면 돼</h2>
      <div class="input-group">
        <label for="participants">참여자 목록:</label>
        <div
          v-for="(participant, index) in participants"
          :key="index"
          class="participant-input"
        >
          <input v-model="participant.name" placeholder="이름 입력" />
          <button @click="removeParticipant(index)">-</button>
        </div>
        <button @click="addParticipant">+</button>
      </div>
      <div class="input-group">
        <label for="winners">행운의 주인공:</label>
        <input
          type="number"
          v-model="numWinners"
          min="1"
          :max="participants.length"
        />
      </div>
      <button
        class="lottery-button"
        @click="drawLottery"
        :disabled="isDrawing || !participants.length || !numWinners"
      >
        {{ isDrawing ? '뽑는 중...' : '제비 뽑기' }}
      </button>
    </div>

    <!-- 바텀 시트 모달 -->
    <bottom-sheet id="testBottomSheet" title="결과">
      <main class="_example modal-content">
        <h3 class="modal-title">축하합니다~!</h3>
        <p class="winners-list">{{ winners.join(', ') }}</p>
        <button type="button" class="confirm-button" @click="navigateToPayInfo">
          확인
        </button>
      </main>
    </bottom-sheet>
  </div>
</template>

<script>
export default {
  name: 'GameLottery',
  data() {
    return {
      participants: [{ name: '' }],
      numWinners: 0,
      isDrawing: false,
      winners: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addParticipant() {
      this.participants.push({ name: '' });
    },
    removeParticipant(index) {
      this.participants.splice(index, 1);
    },
    drawLottery() {
      this.isDrawing = true;
      setTimeout(() => {
        this.winners = [];
        const uniqueIndexes = new Set();

        while (this.winners.length < this.numWinners) {
          const randomIndex = Math.floor(
            Math.random() * this.participants.length
          );
          if (!uniqueIndexes.has(randomIndex)) {
            uniqueIndexes.add(randomIndex);
            this.winners.push(this.participants[randomIndex].name);
          }
        }

        document.getElementById('testBottomSheet').openSheet();
        this.isDrawing = false;
      }, 2000);
    },
    navigateToPayInfo() {
      this.$router.push({ name: 'PayInfo' }); // PayInfo.vue로 이동
    },
  },
};
</script>

<style scoped>
.back-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  color: #000;
  text-align: left;
  margin-left: -270px;
  margin-top: -300px;
  margin-bottom: 30px;
}

.back-button:hover {
  color: #7189ff;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

input[type='number'] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

.lottery-button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #6981d9;
  color: white;
  font-size: 18px;
  transition: background-color 0.3s;
}

.lottery-button:hover:not(:disabled) {
  background-color: #5a6fbf;
}

.lottery-button:disabled {
  background-color: #cccccc;
}

.participant-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.participant-input input {
  margin-right: 10px;
  flex-grow: 1;
}

button {
  cursor: pointer;
}

/* 추가 스타일 */
.modal-content {
  text-align: center; /* 가운데 정렬 */
}

.modal-title {
  margin-bottom: 20px;
}

.winners-list {
  margin-bottom: 20px;
}

.confirm-button {
  padding: 10px 15px;
  background-color: #4caf50; /* 원하는 배경색 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #45a049; /* 호버 시 색상 변경 */
}
</style>
