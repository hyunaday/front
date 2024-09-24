<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <h1 class="card-title">내 카드</h1>
    <!-- 카드 추가하기 창 -->
    <div class="card-container">
      <button class="add-button" @click="addCard">+</button>
    </div>
    <!-- 안내 문구 추가 -->
    <p class="register-message">카드를 추가해주세요.</p>
    <!-- 최근 거래 내역 목록 -->
    <div class="transaction-history">
      <div class="line"></div>
      <h2 style="text-align: left">최근 거래 내역</h2>
      <div class="line"></div>
      <ul>
        <!-- 최근 거래 항목 추가 -->
      </ul>
      <div class="fixed-line"></div>
      <!-- 하단에 고정된 선 -->
    </div>
    <!-- 카드 등록 창 오버레이 -->
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
          placeholder=""
        />
        <input
          type="text"
          maxlength="4"
          @input="moveToNext($event, 'card-number-3')"
          id="card-number-2"
          placeholder=""
        />
        <input
          type="text"
          maxlength="4"
          @input="moveToNext($event, 'card-number-4')"
          id="card-number-3"
          placeholder=""
        />
        <input
          type="text"
          maxlength="4"
          @input="moveToNext($event, '')"
          id="card-number-4"
          placeholder=""
        />
      </div>

      <!-- 유효기간 입력 -->
      <label for="expiry-date">유효기간:<span class="required">*</span></label>
      <input type="text" id="expiry-date" placeholder="MM/YY" />

      <!-- 비밀번호 입력 -->
      <label for="password">비밀번호:<span class="required">*</span></label>
      <input type="password" id="password" placeholder="비밀번호 입력" />
      <!-- 확인, 취소 버튼 배치 -->
      <div class="button-container">
        <button type="submit" @click="registerCard">확인</button>
        <button @click="closeCardRegistration">취소</button>
      </div>
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
      isCardRegistrationVisible: false, // 카드 등록 창의 가시성 상태
    };
  },
  methods: {
    addCard() {
      this.isCardRegistrationVisible = true;
    },
    moveToNext(event, nextInputId) {
      // 입력 필드가 가득 차면 다음 입력 필드로 포커스 이동
      if (event.target.value.length >= 4 && nextInputId) {
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

      // 카드번호를 하나의 문자열로 결합
      const cardNumber = `${cardNumber1}${cardNumber2}${cardNumber3}${cardNumber4}`;

      // 유효성 검사
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
        // 6자리 숫자 확인
        alert("비밀번호는 6자리 숫자여야 합니다.");
        return;
      }
      console.log("카드 등록 버튼 클릭");
      this.closeCardRegistration();
    },

    closeCardRegistration() {
      this.isCardRegistrationVisible = false;
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
  width: 297px;
  position: relative; /* 상대 위치 설정 */
}

/* 선 스타일 */
.line {
  width: 297px; /* 선의 너비 */
  height: 1px; /* 선의 두께 */
  background-color: black; /* 선의 색상 */
  margin: 10px 0; /* 상하 여백 */
}

/* 제목 스타일 */
.transaction-history h2 {
  font-size: 16px;
  text-align: center; /* 중앙 정렬 */
  margin: 0; /* 기본 마진 제거 */
}

/* 거래 목록 스타일 */
.transaction-history ul {
  list-style-type: none; /* 기본 리스트 스타일 제거 */
  padding: 0; /* 기본 패딩 제거 */
  margin: 10px 0; /* 항목 간격 */
}

.transaction-history li {
  font-size: 14px; /* 글자 크기 */
  color: #333; /* 글자 색상 */
}

.fixed-line {
  position: absolute; /* 절대 위치로 설정 */
  top: 220px; /* 하단에 고정 */
  width: 297px; /* 선의 너비 */
  height: 1px; /* 선의 두께 */
  background-color: black; /* 선의 색상 */
}
</style>
