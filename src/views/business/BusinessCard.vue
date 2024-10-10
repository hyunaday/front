명함페이지 css완
<template>
  <div class="main-container">
    <!-- 헤더 -->
    <Header />

    <!-- 선택된 명함 표시 -->
    <div class="selected-card">
      <div class="name-tag-group">
        <button @click="goBackToMyCard" class="back-to-my-card-button">
          {{ nameTagLabel }}
        </button>
        <button class="name-tag-sec" @click="toggleCardList">명함목록</button>
      </div>

      <!-- 명함 상세 정보 또는 명함 목록 -->
      <div class="card">
        <!-- 명함 목록 표시: isCardListVisible가 true일 때 -->
        <div v-if="isCardListVisible">
          <div class="card-list">
            <div
              v-for="card in cardList"
              :key="card.id"
              class="card-item"
              @click="selectCard(card)"
            >
              <div class="card-content">
                <div class="card-text">
                  <p>
                    <strong>{{ card.name }}</strong>
                  </p>
                  <p>{{ card.position }} / {{ card.department }}</p>
                  <p>{{ card.company }}</p>
                </div>
                <div class="preview-box-small">
                  <h3>{{ card.company }}</h3>
                  <p>{{ card.address }}</p>
                  <p>{{ card.name }}</p>
                  <p>{{ card.position }}</p>
                  <p>{{ card.department }}</p>
                  <p>{{ card.phone }}</p>
                  <p>{{ card.phoneLandline }}</p>
                  <p>{{ card.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 선택된 명함의 상세 정보 표시: isCardListVisible가 false일 때 -->
        <div v-else class="preview-box">
          <h3>{{ formData.company || "회사 정보 없음" }}</h3>
          <p>{{ formData.address || "주소 없음" }}</p>
          <p>{{ formData.name || "이름 없음" }}</p>
          <p>{{ formData.position || "직책 없음" }}</p>
          <p>{{ formData.department || "부서 없음" }}</p>
          <p>{{ formData.phone || "전화번호 없음" }}</p>
          <p>{{ formData.phoneLandline || "유선전화 없음" }}</p>
          <p>{{ formData.email || "이메일 없음" }}</p>
        </div>

        <!-- QR 코드 및 명함 상세 정보 -->
        <div v-if="!isCardListVisible" class="card-details-container">
          <div class="card-details">
            <p><strong>이름:</strong> {{ formData.name }}</p>
            <p><strong>회사:</strong> {{ formData.company }}</p>
            <p><strong>부서:</strong> {{ formData.department }}</p>
            <p><strong>직책:</strong> {{ formData.position }}</p>
            <p><strong>연락처:</strong> {{ formData.phone }}</p>
            <p><strong>유선전화:</strong> {{ formData.phoneLandline }}</p>
            <p><strong>이메일:</strong> {{ formData.email }}</p>
            <p><strong>주소:</strong> {{ formData.address }}</p>
            <p v-if="isFriendCard">
              <strong>메모:</strong> {{ formData.memo }}
            </p>
            <qrcode-vue
              :value="qrValue"
              :size="75"
              class="qr-code"
              @click="showModal = true"
            />
          </div>
        </div>
      </div>

      <!-- 수정 및 삭제 버튼 -->
      <div class="button-container">
        <button type="button" @click="openBottomSheet">수정</button>
        <button @click="deleteCard">삭제</button>
      </div>
    </div>

    <FooterNav :buttonType="'plus'" :buttonAction="goToaddBusinessCard" />

    <!-- 수정 bottom-sheet -->
    <bottom-sheet id="editBottomSheet" title="명함 수정">
      <main>
        <div class="edit-form">
          <label>회사명:</label>
          <input v-model="formData.company" type="text" />
          <label>주소:</label>
          <input v-model="formData.address" type="text" />
          <label>이름:</label>
          <input v-model="formData.name" type="text" />
          <label>직책:</label>
          <input v-model="formData.position" type="text" />
          <label>부서:</label>
          <input v-model="formData.department" type="text" />
          <label>휴대전화:</label>
          <input v-model="formData.phone" type="text" />
          <label>유선전화:</label>
          <input v-model="formData.phoneLandline" type="text" />
          <label>이메일:</label>
          <input v-model="formData.email" type="text" />
          <div v-if="isFriendCard">
            <label>메모:</label>
            <textarea
              v-model="formData.memo"
              class="memo-textarea"
              placeholder="메모를 입력하세요..."
            ></textarea>
          </div>
        </div>
        <div class="modal-buttons">
          <button @click="saveChanges">저장</button>
          <button @click="closeBottomSheet">취소</button>
        </div>
      </main>
    </bottom-sheet>

    <!-- QR 코드 모달 -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="qr-code-container">
          <qrcode-vue
            :value="qrValue"
            size="200"
            class="qr-code"
            @click="showModal = true"
          />
        </div>
      </div>
      <p class="additional-text">QR코드를 스캔하세요</p>
    </div>
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />

  </div>
</template>

<script>
import FooterNav from "../../components/FooterNav.vue";
import QrcodeVue from "qrcode.vue";
import Header from "../../components/Header.vue";

export default {
  name: "BusinessCard",
  components: {
    FooterNav,
    QrcodeVue,
    Header,
  },
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        email: "",
        position: "",
        department: "",
        company: "",
        address: "",
        phoneLandline: "",
        memo: "",
      },
      cardList: [
        {
          id: 1,
          name: "Alice Johnson",
          position: "Developer",
          department: "Engineering",
          company: "Tech Corp",
          memo: "",
        },
        {
          id: 2,
          name: "Bob Lee",
          position: "Designer",
          department: "Creative",
          company: "Creative Agency",
          memo: "",
        },
        {
          id: 3,
          name: "Charlie Kim",
          position: "Project Manager",
          department: "Operations",
          company: "Business Solutions",
          memo: "",
        },
        {
          id: 4,
          name: "David Park",
          position: "Marketing Specialist",
          department: "Marketing",
          company: "Marketing Group",
          memo: "",
        },
      ],
      isCardListVisible: false, // 명함 목록 표시 상태
      showModal: false,
      isFriendCard: false,
    };
  },
  computed: {
    nameTagLabel() {
      return this.isFriendCard ? "친구 명함" : "나의 명함";
    },
    qrValue() {
      return `
  이름: ${this.formData?.name || "이름 없음"}
  연락처: ${this.formData?.phone || "연락처 없음"}
  이메일: ${this.formData?.email || "이메일 없음"}
  주소: ${this.formData?.address || "주소 없음"}
  메모: ${this.formData?.memo || ""}
  `.trim();
    },
  },
  methods: {
    goToGroupPayPage() {
      this.$router.push("/grouppay");
    },
    toggleCardList() {
      this.isCardListVisible = !this.isCardListVisible;
    },
    goBackToMyCard() {
      this.isFriendCard = false;
      this.isCardListVisible = false; // 명함 목록을 닫음
      const storedData = localStorage.getItem("businessCardData");
      if (storedData) {
        this.formData = JSON.parse(storedData);
        alert("로컬 스토리지에서 명함 정보를 불러왔습니다!");
      } else {
        alert("로컬 스토리지에 명함 정보가 없습니다.");
      }
    },
    selectCard(card) {
      this.formData = { ...card };
      this.isFriendCard = true;
      this.isCardListVisible = false;
    },
    openBottomSheet() {
      const bottomSheet = document.getElementById("editBottomSheet");
      if (bottomSheet) {
        bottomSheet.openSheet();
      } else {
        console.error("Bottom sheet element not found");
      }
    },
    closeBottomSheet() {
      const bottomSheet = document.getElementById("editBottomSheet");
      if (bottomSheet) {
        bottomSheet.closeSheet();
      }
    },
    saveChanges() {
      localStorage.setItem("businessCardData", JSON.stringify(this.formData));
      const cardIndex = this.cardList.findIndex(
        (card) => card.id === this.formData.id
      );
      if (cardIndex !== -1) {
        this.cardList[cardIndex] = { ...this.formData };
      }
      this.closeBottomSheet();
    },
    deleteCard() {
      if (confirm("정말로 이 명함을 삭제하시겠습니까?")) {
        if (this.isFriendCard) {
          const index = this.cardList.findIndex(
            (card) => card.id === this.formData.id
          );
          if (index !== -1) {
            this.cardList.splice(index, 1);
            alert("명함이 삭제되었습니다.");
          }
        } else {
          this.resetMyCard();
          alert("나의 명함 정보가 초기화되었습니다.");
        }
      }
    },
    resetMyCard() {
      this.formData = {};
      localStorage.removeItem("businessCardData");
    },
    goToaddBusinessCard() {
      this.$router.push("/addbusinesscard");
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
/* 내 명함 */
.preview-box {
  margin-top: 5px;
  text-align: center;
  padding: 8px 20px;
  height: 150px;
  width: 300px;
  background-color: white;
  border: 2px solid #b3b3b3; /* 조금 더 진한 테두리 색상 */
  border-radius: 5px; /* 더 둥글게 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05); /* 그림자 강화 */
}

.preview-box h3 {
  font-size: 18px; /* 회사명 폰트 크기 */
  font-weight: bold; /* 굵게 */
  text-align: left;
  margin: 0px;
}

/* 이름 */
.preview-box p {
  margin: 0px 0; /* 각 문장 간의 간격 */
  font-size: 15px; /* 일반 텍스트 크기 */
  text-align: left;
}

.preview-box p:nth-child(2) {
  font-size: 10px; /* 주소 폰트 크기 */
  text-align: left;
  margin: 0px 0px 3px;
}

.preview-box p:nth-child(4),
.preview-box p:nth-child(5) {
  font-size: 10px; /* 직책과 부서 폰트 크기 */
  font-weight: bold; /* 직책과 부서 텍스트 굵게 */
  text-align: left;
}

.preview-box p:nth-child(6),
.preview-box p:nth-child(7),
.preview-box p:nth-child(8) {
  font-size: 10px; /*  전화번호, 유선전화번호, 이메일 크기 */
  text-align: right;
}

.preview-box p:nth-child(4)::before {
  content: "Position: "; /* 직책 앞에 텍스트 추가 */
}

.preview-box p:nth-child(5)::before {
  content: "Dept: "; /* 부서 앞에 텍스트 추가 */
}

.preview-box p:nth-child(6)::before {
  content: "H.P: "; /* 전화번호 앞에 텍스트 추가 */
}

.preview-box p:nth-child(7)::before {
  content: "TEL: "; /* 유선전화번호 앞에 텍스트 추가 */
}

.preview-box p:nth-child(8)::before {
}

/* 명함수정 */
button,
select {
  text-transform: none;
  border: none;
  font-weight: bold;
  font-size: 14px;
  background-color: #6981d9;
  color: #ffffff;
}

.edit-form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.edit-form label {
  font-weight: bold;
  margin-bottom: 5px;
}

.edit-form input {
  margin-bottom: 15px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.edit-form input,
.memo-textarea {
  margin-bottom: 15px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%; /* input 필드와 동일한 너비 */
  box-sizing: border-box; /* padding 포함한 너비 계산 */
}

/* 필요하다면 추가적인 수정 */
.memo-textarea {
  resize: none; /* 크기 조절 불가 */
  height: 100px; /* 적당한 높이 설정 */
}

/* 모달 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 불투명한 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.additional-text {
  position: absolute; /* 절대 위치 설정 */
  top: 25%; /* 화면의 세로 중앙으로 이동 */
  left: 50%; /* 화면의 가로 중앙으로 이동 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 변환 */
  font-size: 37px; /* 글꼴 크기 설정 */
  font-weight: bolder; /* 글꼴 두께 설정 */
  color: white; /* 글꼴 색상 설정 */
  text-align: center; /* 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
}
.modal-content {
  padding: 10px;
  text-align: center;
  position: relative; /* 내용이 절대 위치 설정된 요소에 대해 상대적임을 나타냄 */
  width: 242px;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex; /* 플렉스 박스 사용 */
  flex-direction: column; /* 세로 방향 정렬 */
  align-items: center; /* 아이템을 중앙 정렬 */
  justify-content: center; /* 아이템을 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
  background-color: rgba(255, 255, 255, 0.9);
}

/* 추가된 스타일 */
.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.card-text {
  flex: 1;
  padding-right: 10px; /* 이미지와 텍스트 간격 확보 */
  word-wrap: break-word; /* 텍스트가 너무 길 경우 줄바꿈 처리 */
}

.preview-box-small {
  text-align: center; /* 가운데 정렬 */
  padding: 3px 8px; /* 내부 패딩을 줄임 */
  height: 40px; /* 고정된 높이 */
  width: 80px; /* 고정된 너비 */
  background-color: white;
  border: 1px solid #b3b3b3; /* 조금 더 진한 테두리 색상 */
  border-radius: 3px; /* 더 둥글게 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05); /* 그림자 강화 */
}

.preview-box-small h3 {
  font-size: 5px; /* 회사명 폰트 크기 축소 */
  font-weight: bold; /* 굵게 */
  text-align: left;
  margin: 0px;
}

/* 이름 */
.preview-box-small p {
  margin: 0px 0; /* 각 문장 간의 간격 */
  font-size: 4px; /* 일반 텍스트 크기 축소 */
  text-align: left;
}

.preview-box-small p:nth-child(2) {
  font-size: 3px; /* 주소 폰트 크기 축소 */
  text-align: left;
  margin: 0px 0px 1px; /* 간격 축소 */
}

.preview-box-small p:nth-child(4),
.preview-box-small p:nth-child(5) {
  font-size: 3px; /* 직책과 부서 폰트 크기 축소 */
  font-weight: bold; /* 직책과 부서 텍스트 굵게 */
  text-align: left;
}

.preview-box-small p:nth-child(6),
.preview-box-small p:nth-child(7),
.preview-box-small p:nth-child(8) {
  font-size: 3px; /* 전화번호, 유선전화번호, 이메일 크기 축소 */
  text-align: right;
}

.preview-box-small p:nth-child(4)::before {
  content: "Position: "; /* 직책 앞에 텍스트 추가 */
}

.preview-box-small p:nth-child(5)::before {
  content: "Dept: "; /* 부서 앞에 텍스트 추가 */
}

.preview-box-small p:nth-child(6)::before {
  content: "H.P: "; /* 전화번호 앞에 텍스트 추가 */
}

.preview-box-small p:nth-child(7)::before {
  content: "TEL: "; /* 유선전화번호 앞에 텍스트 추가 */
}

/* 카드 아이템 스타일 */
.card-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  /* display: flex; */
  justify-content: space-between;
}

.card-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

/* 기존 스타일 */
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  margin-bottom: 60px;
  background-color: white;
  overflow-y: auto;
}

/* 명함 카드 스타일 */
.selected-card {
  background-color: #6981d9;
  padding: 20px;
  margin-top: 38px;
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 서류 모양의 그림자 */
  position: relative;
  border: 1px solid #efeded; /* 서류 경계선 */
  width: 350px; /* 카드 너비 */
}

/* 네임택 스타일 */
.name-tag-group {
  position: absolute;
  display: flex;
  align-items: center;
  top: -20px;
  gap: 0px;
  left: 0px;
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* 애니메이션 추가 */
}

.back-to-my-card-button {
  padding: 8px 15px;
  border-radius: 10px;
  background-color: #6981d9;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1),
    /* 위쪽 그림자 */ 4px 0px 10px rgba(0, 0, 0, 0.1); /* 오른쪽 그림자 */
  transform: translateY(0px); /* 위치 조정 */
  z-index: 2; /* 더 위에 오도록 설정 */
}

.back-to-my-card-button:hover {
  background-color: #5a6cbf;
  transform: translateY(-5px); /* 살짝 위로 이동 */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); /* hover 시 그림자 강화 */
}
.back-to-my-card-button:active {
  background-color: #4e5ba3;
}

.name-tag-sec {
  background-color: #6981d9;
  padding: 8px 15px;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  font-size: 16px;
  margin-left: -15px;
}

/* 버튼 호버 및 클릭 시 스타일 추가 */
.name-tag-sec:hover {
  background-color: #5a6cbf;
  transform: translateY(-5px); /* 살짝 위로 이동 */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); /* hover 시 그림자 강화 */
}

.name-tag-sec:active {
  background-color: #4e5ba3;
}

/* 명함 내용 스타일 */
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  height: 550px;
  z-index: 2;
}

.card-details-container {
  display: flex;
  align-items: flex-start;
  max-width: 100%;
  overflow: hidden;
  position: relative; /* 상대적 위치 설정 */
  min-height: 150px; /* 컨테이너의 최소 높이 설정 */
}

.card-details {
  flex: 1;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 13px;
  line-height: 1.2;
  max-height: 100%;
  overflow-y: overlay; /* auto에서 overlay로 변경 */
  /* padding-right: 150px; QR 코드 공간 확보 */
  width: 300px;
  height: 390px;
}

/* QR 코드 스타일 수정 */
.qr-code {
  position: absolute; /* 절대 위치 설정 */
  right: 15px; /* 오른쪽에서 10px 떨어짐 */
  bottom: 70px; /* 아래에서 10px 떨어짐 */
  width: 75px; /* QR 코드의 너비 설정 */
  height: 75px; /* QR 코드의 높이 설정 */
}

/* 스크롤바 스타일 */
.card-details::-webkit-scrollbar {
  width: 6px;
}

.card-details::-webkit-scrollbar-track {
  background: transparent;
}

.card-details::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

/* 호버 시에만 스크롤바 표시 */
.card-details:not(:hover)::-webkit-scrollbar-thumb {
  background-color: transparent;
}

/* 명함 목록 스타일 */
.card-list {
  background-color: white;
  padding: 20px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  /* width: 350px; */
  height: 470px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  overflow-y: auto;
  /* margin-top: 30px; */
  position: relative;
}

.divider {
  width: 100%;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.memo-container {
  display: flex;
  align-items: center; /* 텍스트와 텍스트 영역이 같은 높이에 위치하도록 설정 */
  margin-top: 10px;
}

.memo-container strong {
  margin-right: 10px; /* "메모:"와 textarea 사이 간격 설정 */
}

.memo-textarea {
  margin-bottom: 15px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 수정/삭제버튼 */
.button-container {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽에 정렬 */
  gap: 10px; /* 버튼 간의 간격 설정 */
  margin-top: 10px;
}

.button-container button {
  font-size: 12px;
  border: 1.5px solid #efeded;
  border-radius: 5px;
  background-color: #6981d9;
  color: #ffffff;
  cursor: pointer;
}

.button-container button:hover {
  background-color: #e0e0e0; /* 호버 시 색상 변경 */
}

.button-container button:active {
  background-color: #fff; /* 클릭 시 색상 변경 */
}

/* 취소/저장버튼 */
.modal-buttons {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  gap: 10px; /* 버튼 간격 */
  margin-top: 20px; /* 위쪽 간격 추가 */
}

.modal-buttons button {
  font-size: 12px;
  border: 1.5px solid #ccc;
  border-radius: 5px;
  background-color: #ffffff;
  color: black;
  cursor: pointer;
  padding: 8px 16px; /* 적당한 padding 설정 */
}

.modal-buttons button:hover {
  background-color: #e0e0e0; /* hover 시 색상 변경 */
}

.modal-buttons button:active {
  background-color: #fff; /* 클릭 시 색상 변경 */
}
</style>
