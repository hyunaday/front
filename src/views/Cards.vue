페이지네이션_다음페이지 초기화_삭제버튼

<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <h1 class="card-title">내 카드</h1>

    <!-- 카드 추가하기 창 -->
    <div class="card-container">
      <button class="add-button" @click="addCard">+</button>
    </div>

    <!-- 안내 문구: 마지막 빈 페이지에서만 표시 -->
    <p class="register-message" v-if="currentPage === totalPages">
      카드를 추가해주세요.
    </p>

    <!-- 등록된 카드 목록을 페이지네이션으로 표시 (마지막 페이지가 아닐 때만) -->
    <div class="card-list" v-if="currentPage !== totalPages">
      <h2>등록된 카드 목록</h2>
      <ul>
        <li v-for="(card, index) in paginatedCards" :key="index">
          <p>
            {{ card.cardCompany }} - {{ card.cardNumber }} -
            {{ card.expiryDate }}
          </p>
          <!-- 삭제 버튼에 아이콘만 표시되도록 수정 -->
          <button @click="deleteCard(index)" class="delete-button">
            <i class="fa-solid fa-trash"></i>
          </button>
        </li>
      </ul>
    </div>

    <!-- 카드 등록창 오버레이 -->
    <div class="overlay" v-if="isCardRegistrationVisible"></div>

    <!-- 카드 등록 창 -->
    <div class="card-registration" v-if="isCardRegistrationVisible">
      <div class="card-info-header">
        <i class="fas fa-credit-card"></i>
        <span class="card-info-title">카드정보 입력</span>
      </div>

      <!-- 카드사 선택 -->
      <label for="card-company">카드사:<span class="required">*</span></label>
      <select id="card-company">
        <option value="" disabled selected>카드사를 선택하세요</option>
        <option value="kb">KB국민카드</option>
        <option value="shinhan">신한카드</option>
        <option value="hana">하나카드</option>
        <option value="lotte">롯데카드</option>
        <option value="bc">BC카드</option>
        <option value="nh">NH농협카드</option>
        <option value="samsung">삼성카드</option>
        <option value="hyundai">현대카드</option>
      </select>

      <!-- 카드번호 입력 -->
      <label for="card-number">카드번호:<span class="required">*</span></label>
      <div class="card-number-inputs">
        <input
          type="text"
          maxlength="4"
          @input="moveToNext($event, 'card-number-2')"
          id="card-number-1"
        />
        <input
          type="text"
          maxlength="4"
          @input="moveToNext($event, 'card-number-3')"
          id="card-number-2"
        />
        <input
          type="text"
          maxlength="4"
          @input="moveToNext($event, 'card-number-4')"
          id="card-number-3"
        />
        <input
          type="text"
          maxlength="4"
          @input="moveToNext($event, '')"
          id="card-number-4"
        />
      </div>

      <!-- 유효기간 입력 -->
      <label for="expiry-date">유효기간:<span class="required">*</span></label>
      <input type="text" id="expiry-date" placeholder="MM/YY" />

      <!-- 비밀번호 입력 -->
      <label for="password">비밀번호:<span class="required">*</span></label>
      <input type="password" id="password" placeholder="비밀번호 입력" />

      <!-- 확인, 취소 버튼 -->
      <div class="button-container">
        <button type="submit" @click="registerCard">확인</button>
        <button @click="closeCardRegistration">취소</button>
      </div>
    </div>

    <!-- 최근 거래 내역 -->
    <div class="transaction-history">
      <h2>최근 거래 내역</h2>
      <div
        class="transaction-summary"
        v-if="currentPage !== totalPages"
        style="min-height: 50px"
      >
        <div class="transaction-date">
          <span class="day">20</span>
          <span class="day-info">수요일</span>
          <span class="year-month">2024.01</span>
        </div>
        <div class="transaction-total">
          <span :class="totalAmount < 0 ? 'negative' : 'positive'">
            {{ totalAmount < 0 ? "-" : ""
            }}{{ Math.abs(totalAmount).toLocaleString() }}원
          </span>
        </div>
      </div>

      <div class="line"></div>

      <ul class="transaction-list">
        <li
          v-for="(transaction, index) in transactions"
          :key="index"
          class="transaction-item"
          style="min-height: 40px"
        >
          <div class="transaction-details">
            <div class="description" v-if="currentPage !== totalPages">
              {{ transaction.description }}
            </div>
            <div class="category" v-if="currentPage !== totalPages">
              {{ transaction.category }}
            </div>
            <div class="time" v-if="currentPage !== totalPages">
              {{ transaction.time }}
            </div>
            <div class="bank" v-if="currentPage !== totalPages">
              {{ transaction.bank }}
            </div>
          </div>
          <div class="transaction-amount" v-if="currentPage !== totalPages">
            <span :class="transaction.amount < 0 ? 'negative' : 'positive'">
              {{ transaction.amount < 0 ? "-" : ""
              }}{{ Math.abs(transaction.amount).toLocaleString() }}원
            </span>
          </div>
        </li>
      </ul>

      <div class="fixed-line"></div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        다음
      </button>
    </div>

    <FooterNav />
  </div>
</template>

<script>
import FooterNav from "../components/FooterNav.vue";

export default {
  name: "Cards",
  components: {
    FooterNav,
  },
  data() {
    return {
      isCardRegistrationVisible: false,
      cards: [],
      currentPage: 1,
      cardsPerPage: 1,
      transactions: [
        {
          description: "생활용품",
          category: "주방/욕실",
          bank: "신한은행",
          time: "오후 2:42",
          amount: -30000,
        },
        {
          description: "부수입",
          category: "현금",
          bank: "",
          time: "오후 1:42",
          amount: 3000,
        },
      ],
      totalAmount: -27000,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.cards.length / this.cardsPerPage) + 1;
    },
    paginatedCards() {
      const start = (this.currentPage - 1) * this.cardsPerPage;
      const end = start + this.cardsPerPage;

      if (this.currentPage === this.totalPages) {
        return [];
      }

      return this.cards.slice(start, end);
    },
  },
  methods: {
    addCard() {
      this.isCardRegistrationVisible = true;
    },
    // 카드 번호 입력 시 4자리를 입력하면 다음 필드로 이동
    moveToNext(event, nextInputId) {
      if (event.target.value.length === 4 && nextInputId) {
        // 다음 입력 필드로 포커스를 이동
        document.getElementById(nextInputId).focus();
      }
    },
    registerCard() {
      const cardCompany = document.getElementById("card-company").value;
      const cardNumber1 = document.getElementById("card-number-1").value;
      const cardNumber2 = document.getElementById("card-number-2").value;
      const cardNumber3 = document.getElementById("card-number-3").value;
      const cardNumber4 = document.getElementById("card-number-4").value;
      const expiryDate = document.getElementById("expiry-date").value;
      const password = document.getElementById("password").value;

      const cardNumber = `${cardNumber1}${cardNumber2}${cardNumber3}${cardNumber4}`;

      if (!cardCompany) {
        alert("카드사를 입력해주세요.");
        return;
      }
      if (!/^\d{16}$/.test(cardNumber)) {
        alert("카드번호는 16자리 숫자여야 합니다.");
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        alert("유효기간은 MM/YY 형식이어야 합니다.");
        return;
      }
      if (!/^\d{6}$/.test(password)) {
        alert("비밀번호는 6자리 숫자여야 합니다.");
        return;
      }

      this.cards.push({
        cardCompany,
        cardNumber,
        expiryDate,
      });

      this.closeCardRegistration();
    },
    deleteCard(index) {
      this.cards.splice(index, 1);
      if (this.currentPage > this.totalPages) {
        this.currentPage--;
      }
    },
    closeCardRegistration() {
      this.isCardRegistrationVisible = false;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}

/* 제목 스타일 */
h1 {
  margin-bottom: 20px;
  font-weight: bold;
  margin-top: 0;
}
/* 버튼 스타일 */
.button {
  width: 200px;
  padding: 15px;
  margin: 10px 0;
  background-color: #7189ff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}
/* 카드 등록 창 스타일 */
.card-registration {
  position: absolute;
  width: 235px;
  height: auto;
  left: calc(50% - 117.5px);
  top: 255px;
  background: #f6f6f6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px;
  z-index: 20; /* 오버레이보다 위에 위치하도록 설정 */
}
/* 입력 필드 스타일 */
.card-registration label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.card-registration input {
  width: 100%;
  padding: 6px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

/* 카드 추가 버튼 스타일 */
.card-container {
  width: 259.15px; /* 카드 추가 창 너비 */
  height: 142.4px; /* 카드 추가 창 높이 */
  border-radius: 20px; /* 모서리 둥글게 */
  display: flex; /* Flexbox 사용 */
  border: 1px solid black;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  position: relative; /* 상대 위치 설정 */
}
/* 버튼 스타일 */
.add-button {
  width: 46px; /* 버튼 너비 */
  height: 46px; /* 버튼 높이 */
  font-size: 42px; /* 버튼 텍스트 크기 */
  color: white; /* 버튼 텍스트 색상 */
  background-color: #7189ff; /* 버튼 배경색 */
  border: none; /* 버튼 테두리 제거 */
  border-radius: 50%; /* 원형 버튼 */
  cursor: pointer; /* 마우스 커서 변경 */
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
  line-height: 1; /* 텍스트 줄 간격 설정 */
}
/* 안내 문구 스타일 */
.register-message {
  margin-top: 10px; /* 카드 추가 창과의 간격 */
  font-size: 14px; /* 글자 크기 */
  color: #555; /* 글자 색상 */
  text-align: center; /* 텍스트 중앙 정렬 */
  line-height: 1.5; /* 한 줄 크기 조정 */
  white-space: nowrap; /* 문구를 한 줄로 유지 */
}
/* 카드번호 입력란 */
.card-number-inputs {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
/* 카드번호 입력란 */
.card-number-inputs input {
  width: 25%; /* 4개의 입력 필드가 균등하게 분배되도록 설정 */
  padding: 6px;
  margin-right: 1px; /* 필드 간 간격 */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
.card-info-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 아래쪽 여백 추가 */
}
.card-info-title {
  font-weight: bold; /* 굵은 글씨 */
  margin-left: 8px; /* 아이콘과의 간격 */
}
.card-registration button {
  width: 40px;
  height: 18px;
  border-radius: 5px;
  background-color: white; /* 원하는 배경색 */
  color: #555; /* 텍스트 색상 */
  border: black; /* 테두리 없애기 */
  cursor: pointer; /* 커서 변경 */
  font-size: 12px; /* 텍스트 크기 조정 */
  margin-top: 10px; /* 버튼 간 간격 */
}

/* 오버레이 스타일 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 배경 */
  z-index: 10; /* 카드 등록 창보다 위에 위치하도록 설정 */
}

/* *별표시 */
.required {
  color: red;
  font-weight: bold;
  margin-left: 5px; /* 글자와의 간격 */
}

/* 확인 취소 버튼 */
.button-container {
  display: flex;
  justify-content: center; /* 버튼을 중앙으로 정렬 */
  gap: 10px; /* 버튼 사이 간격 */
  margin-top: 10px; /* 상단 여백 */
}
.button-container button {
  width: 40px;
  height: 25px;
  border-radius: 5px;
  background-color: white;
  color: #555;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 12px;
}

/* 카드사 선택 영역 스타일 */
label[for="card-company"] {
  font-size: 14px; /* 텍스트 크기 */
  margin-bottom: 5px; /* 텍스트와 셀렉트박스 사이의 간격 */
  display: block; /* 블록 형태로 표시해 요소들이 세로로 정렬되게 함 */
}

#card-company {
  width: 100%; /* 선택 박스 너비 */
  padding: 8px; /* 선택 박스 내부 여백 */
  margin-top: 5px; /* 라벨과 선택 박스 사이의 간격 */
  border: 1px solid #ccc; /* 선택 박스 테두리 */
  border-radius: 5px; /* 모서리를 둥글게 */
  font-size: 14px; /* 텍스트 크기 */
  background-color: white; /* 배경색 */
  color: black;
}

/* 최근 거래 내역창 */
.transaction-history {
  width: 350px;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  position: relative;
  /* 부모 컨테이너가 상대적 위치를 갖도록 설정 */
}

/* 제목 스타일 */
h2 {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

/* 날짜 및 총합 블록 */
.transaction-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.transaction-date {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day {
  font-size: 36px;
  font-weight: bold;
}

.day-info,
.year-month {
  font-size: 14px;
  color: #888;
}

.transaction-total {
  font-size: 20px;
  font-weight: bold;
}

.negative {
  color: red;
}

.positive {
  color: blue;
}

/* 거래 목록 */
.transaction-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.transaction-details {
  display: flex;
  flex-direction: column;
}

.description {
  font-size: 16px;
  font-weight: bold;
}

.category,
.bank,
.time {
  font-size: 14px;
  color: #888;
}

.transaction-amount {
  font-size: 16px;
  font-weight: bold;
}

.line {
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
}

.fixed-line {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 20px;
}

/* 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
  background-color: #7189ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 삭제 버튼 스타일 */
.delete-button {
  background: none; /* 배경 없애기 */
  border: none; /* 테두리 없애기 */
  padding: 0; /* 기본 여백 없애기 */
  cursor: pointer; /* 클릭 가능 커서 */
}

.delete-button i {
  font-size: 18px; /* 아이콘 크기 조정 */
  color: #ff6b6b; /* 아이콘 색상 */
}

.delete-button i:hover {
  color: #ff4b4b; /* 마우스 오버 시 색상 변경 */
}
</style>
