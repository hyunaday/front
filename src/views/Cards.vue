<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <h1 class="card-title">내 카드</h1>
    <!-- 카드추가하기 창 -->
    <div class="card-container">
      <button class="add-button" @click="addCard">+</button>
      <!-- 플러스 버튼 -->
    </div>
    <!-- 안내 문구 추가 -->
    <p class="register-message">카드를 등록해주세요.</p>
    <!-- 카드 등록 창 -->
    <div class="card-registration" v-if="isCardRegistrationVisible">
      <div class="card-info-header">
        <i class="fas fa-credit-card"></i>
        <span class="card-info-title">카드정보 입력</span>
      </div>
      <label for="card-company">카드사:</label>
      <input type="text" id="card-company" placeholder="카드사 입력" />
      <label for="card-number">카드번호:</label>
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
      <label for="expiry-date">유효기간:</label>
      <input type="text" id="expiry-date" placeholder="MM/YY" />
      <label for="password">비밀번호:</label>
      <input type="password" id="password" placeholder="비밀번호 입력" />
      <button type="submit" @click="registerCard">확인</button>
      <button @click="closeCardRegistration">취소</button>
    </div>
  </div>
  <div class="navbar">
    <!-- 홈 버튼, 홈 페이지로 이동 -->
    <router-link to="/" class="nav-item" exact-active-class="active">
      <i class="fas fa-home"></i>
      <span>홈</span>
    </router-link>
    <!-- 내 자산 버튼, 내 자산 페이지로 이동 -->
    <router-link to="/myassets" class="nav-item" exact-active-class="active">
      <i class="fas fa-wallet"></i>
      <span>내 자산</span>
    </router-link>
    <!-- 결제 버튼, 결제 페이지로 이동 -->
    <router-link to="/grouppay" class="pay-btn" exact-active-class="active">
      <i class="fas fa-credit-card"></i>
      <span>결제</span>
    </router-link>
    <!-- 가계부 버튼, 가계부 페이지로 이동 -->
    <router-link to="/accountbook" class="nav-item" exact-active-class="active">
      <i class="fas fa-book"></i>
      <span>가계부</span>
    </router-link>
    <!-- 전자 명함 버튼, 전자 명함 페이지로 이동 -->
    <router-link
      to="/businesscard"
      class="nav-item"
      exact-active-class="active"
    >
      <i class="fas fa-id-card"></i>
      <span>전자 명함</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Cards',
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
      const cardCompany = document.getElementById('card-company').value;
      const cardNumber1 = document.getElementById('card-number-1').value;
      const cardNumber2 = document.getElementById('card-number-2').value;
      const cardNumber3 = document.getElementById('card-number-3').value;
      const cardNumber4 = document.getElementById('card-number-4').value;
      const expiryDate = document.getElementById('expiry-date').value;
      const password = document.getElementById('password').value;
      // 카드번호를 하나의 문자열로 결합
      const cardNumber = `${cardNumber1}${cardNumber2}${cardNumber3}${cardNumber4}`;
      // 유효성 검사
      if (!cardCompany) {
        alert('카드사를 입력해주세요.');
        return;
      }
      if (!/^\d{16}$/.test(cardNumber)) {
        alert('카드번호는 16자리 숫자여야 합니다.');
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        alert('유효기간은 MM/YY 형식이어야 합니다.');
        return;
      }
      if (!/^\d{3,4}$/.test(password)) {
        alert('비밀번호는 3자리 또는 4자리 숫자여야 합니다.');
        return;
      }
      console.log('카드 등록 버튼 클릭');
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
/* 전체 컨테이너 스타일 */
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
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
  height: auto; /* 높이는 자동으로 조정 */
  left: calc(50% - 117.5px); /* 중앙 정렬 */
  top: 255px;
  background: #f6f6f6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px; /* 내부 여백 */
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
/* 네비게이션 바 스타일 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: white;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  max-width: 360px;
  width: 100%;
}
/* 네비게이션 아이템 스타일 */
.navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #555;
  flex: 1;
}
/* 네비게이션 아이템 아이콘 스타일 */
.navbar .nav-item i {
  font-size: 24px;
  margin-bottom: 5px;
}
/* 결제 버튼 스타일 */
.pay-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 65px;
  height: 65px;
  background-color: #7189ff;
  border-radius: 50%;
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
/* 활성화된 네비게이션 아이템 스타일 */
.navbar .nav-item.active {
  color: #7189ff; /* 텍스트 색상 변경 */
  font-weight: bold; /* 강조를 위해 볼드체로 */
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
  font-size: 36px; /* 버튼 텍스트 크기 */
  color: white; /* 버튼 텍스트 색상 */
  background-color: #7189ff; /* 버튼 배경색 */
  border: none; /* 버튼 테두리 제거 */
  border-radius: 50%; /* 원형 버튼 */
  cursor: pointer; /* 마우스 커서 변경 */
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
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
</style>
