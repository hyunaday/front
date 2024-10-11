<template>
  <div class="main-container d-flex flex-column">
    <div class="header">
      <button @click="goBack" class="back-button">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h2 class="title">카드를 선택해주세요</h2>
    </div>

    <div class="card-selection-container">
      <div class="card-slider">
        <button class="arrow" @click="prevCard">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="card-display">
          <div class="pagination">
            <span
              v-for="(card, index) in cards"
              :key="index"
              @click="!isModalOpen ? (currentCardIndex = index) : null"
              class="pagination-dot"
              :class="{ active: currentCardIndex === index }"
            ></span>
          </div>
          <div class="card">
            <img
              :src="currentCard.image"
              alt="카드 이미지"
              class="card-image"
            />
            <p class="card-name">{{ currentCard.name }}</p>
          </div>
        </div>
        <button class="arrow" @click="nextCard">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <button v-if="currentCard" @click="isModalOpen = true" class="pay-button">
        다음
      </button>
      <p v-if="paymentResult">{{ paymentResult }}</p>
    </div>

    <!-- 모달 -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">결제 비밀번호를 입력해주세요</h3>

        <div class="password-container">
          <div
            v-for="i in 6"
            :key="i"
            class="password-circle"
            :class="{ filled: i <= paymentPassword.length }"
          ></div>
        </div>

        <input
          type="password"
          v-model="paymentPassword"
          maxlength="6"
          placeholder="6자리 비밀번호"
          class="password-input"
          @input="updateCircles"
        />

        <button @click="confirmPayment" class="confirm-button">결제하기</button>
        <button @click="closeModal" class="cancel-button">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentResult: '',
      cards: [
        {
          id: 1,
          name: '청춘대로 톡톡카드',
          image: '../src/assets/images/국민카드1.png',
        },
        {
          id: 2,
          name: '굿데이 플래티늄카드',
          image: '../src/assets/images/국민카드2.png',
        },
        {
          id: 3,
          name: '스카이패스 KB국민카드',
          image: '../src/assets/images/국민카드3.png',
        },
        {
          id: 4,
          name: '가온올림카드(실속형)',
          image: '../src/assets/images/국민카드4.png',
        },
        {
          id: 5,
          name: 'BeV Ⅴ카드 (스카이패스형)',
          image: '../src/assets/images/국민카드5.png',
        },
        {
          id: 6,
          name: 'HERITAGE Exclusive',
          image: '../src/assets/images/국민카드6.png',
        },
      ],
      currentCardIndex: 0,
      isModalOpen: false,
      paymentPassword: '',
    };
  },
  computed: {
    currentCard() {
      return this.cards[this.currentCardIndex];
    },
  },
  methods: {
    prevCard() {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex--;
      } else {
        this.currentCardIndex = this.cards.length - 1;
      }
    },
    nextCard() {
      if (this.currentCardIndex < this.cards.length - 1) {
        this.currentCardIndex++;
      } else {
        this.currentCardIndex = 0;
      }
    },
    closeModal() {
      this.isModalOpen = false;
      this.paymentPassword = '';
    },
    updateCircles() {
      // 원 채우기 로직은 템플릿의 바인딩으로 처리하므로 이 메소드는 필요 없습니다.
    },
    confirmPayment() {
      if (this.paymentPassword.length === 6) {
        // 비밀번호 확인 로직 추가
        if (this.paymentPassword === '123456') {
          this.$router.push('/success');
        } else {
          this.$router.push('/failure');
        }
        this.closeModal();
      } else {
        alert('비밀번호는 6자리여야 합니다.');
      }
    },
    goBack() {
      this.$router.go(-1); // 이전 페이지로 이동
    },
  },
};
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
</style>

<style scoped>
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
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

.card-selection-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  flex: 1; /* 남은 공간을 차지 */
}

.card-slider {
  display: flex;
  align-items: center;
  justify-content: center; /* 수평 중앙 정렬 */
}

.card-display {
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  align-items: center; /* 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  overflow: hidden;
  border-color: none;
  height: 100%; /* 카드의 높이를 설정하여 수직 중앙 정렬 */
}

.card {
  min-width: 200px;
  transition: transform 0.3s ease;
  margin-left: 30px;
  border: none; /* 테두리 제거 */
}

.card-image {
  width: 90%;
  border-radius: 8px;
  margin-top: 50px;
}

.card-name {
  margin-top: 20px;
  margin-left: -20px;
  text-align: center;
  font-weight: bold;
}

.arrow {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #949495;
}

.pay-button {
  background-color: #7189ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  width: 300px;
}

.pay-button:hover {
  background-color: #6a7bff;
}

/* 슬라이더 페이지네이션 스타일 */
.pagination {
  display: flex;
  justify-content: center;
  margin-bottom: -30px; /* 카드 이미지와의 간격 조절 */
  z-index: 1; /* 페이지네이션이 카드 위에 오도록 설정 */
}

.pagination-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 5px;
  cursor: pointer;
}

.pagination-dot.active {
  background-color: #7189ff; /* 활성화된 페이지네이션 색상 */
}

/* 모달 창 스타일 */
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

.modal-title {
  font-size: 1.1rem;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  width: 320px;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.password-input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #fff1f1;
  border-radius: 4px;
  z-index: 9999;
}

.password-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  z-index: 9990;
}

.password-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin: 0 2px;
  z-index: 990;
}

.password-circle.filled {
  background-color: #7189ff;
}

.confirm-button {
  background-color: #6981d9;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
}

.cancel-button {
  background-color: #e67b73;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
