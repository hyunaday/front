<template>
  <div class="main-container">
    <!-- 나의 명함으로 돌아가기 버튼 추가 -->

    <!-- 선택된 명함 표시 -->
    <div class="selected-card">
      <div class="name-tag">
        <button @click="goBackToMyCard" class="back-to-my-card-button">
          {{ nameTagLabel }}
        </button>
      </div>

      <div class="card">
        <!-- preview-box 안에 실시간으로 formData 내용을 반영 -->
        <div class="preview-box">
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
        <div class="card-details-container">
          <div class="card-details">
            <p><strong>이름:</strong> {{ formData.name }}</p>
            <p><strong>연락처:</strong> {{ formData.phone }}</p>
            <p><strong>이메일:</strong> {{ formData.email }}</p>
            <p><strong>주소:</strong> {{ formData.address }}</p>
            <!-- 친구 명함일 때만 메모 표시 -->
            <p v-if="isFriendCard">
              <strong>메모:</strong> {{ formData.memo }}
            </p>
            <qrcode-vue
              :value="qrValue"
              :size="60"
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

    <!-- 명함 목록 -->
    <div class="name-tag-sec">
      <span>명함목록</span>
    </div>
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

    <div class="divider"></div>

    <!-- FooterNav 컴포넌트 -->
    <FooterNav :buttonType="'plus'" :buttonAction="goToaddBusinessCard" />

    <!-- 수정 bottom-sheet -->
    <bottom-sheet id="editBottomSheet" title="명함 수정">
      <main>
        <!-- 명함 정보 수정 입력 폼 -->
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

          <!-- 친구 명함일 때만 메모 수정 가능 -->
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
          <qrcode-vue :value="qrValue" :size="200" />
        </div>
      </div>
      <p class="additional-text">QR코드를 스캔하세요</p>
    </div>
  </div>
</template>

<script>
import FooterNav from "../../components/FooterNav.vue"; // 경로를 올바르게 수정
import QrcodeVue from "qrcode.vue"; // QR 코드 라이브러리 임포트

export default {
  name: "BusinessCard",
  components: {
    FooterNav, // FooterNav 컴포넌트 등록
    QrcodeVue, // QR 코드 컴포넌트 등록
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
          memo: "", // 메모 추가
        },
        {
          id: 2,
          name: "Bob Lee",
          position: "Designer",
          department: "Creative",
          company: "Creative Agency",
          memo: "", // 메모 추가
        },
        {
          id: 3,
          name: "Charlie Kim",
          position: "Project Manager",
          department: "Operations",
          company: "Business Solutions",
          memo: "", // 메모 추가
        },
        {
          id: 4,
          name: "David Park",
          position: "Marketing Specialist",
          department: "Marketing",
          company: "Marketing Group",
          memo: "", // 메모 추가
        },
      ],
      showModal: false, // 모달 표시 상태
      isFriendCard: false, // 친구 명함 여부 상태 추가
    };
  },
  mounted() {
    // 로컬 스토리지에서 데이터를 불러오기
    const storedData = localStorage.getItem("businessCardData");
    if (storedData) {
      this.formData = JSON.parse(storedData); // JSON 데이터를 객체로 변환하여 formData에 할당
    }
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
    // 나의 명함으로 돌아가는 메서드
    goBackToMyCard() {
      this.isFriendCard = false; // '나의 명함'으로 돌아올 때 원래 상태로 변경
      const storedData = localStorage.getItem("businessCardData");
      if (storedData) {
        this.formData = JSON.parse(storedData); // 로컬 스토리지의 값을 formData에 할당
        alert("로컬 스토리지에서 명함 정보를 불러왔습니다!");
      } else {
        alert("로컬 스토리지에 명함 정보가 없습니다.");
      }
    },

    isChanged(field) {
      return (
        this.formData &&
        this.originalFormData &&
        this.formData[field] !== this.originalFormData[field]
      );
    },
    selectCard(card) {
      this.formData = { ...card }; // 선택한 카드 데이터를 formData에 복사
      this.isFriendCard = true; // 명함을 선택하면 '친구 명함'으로 변경
    },

    saveMemo() {
      const cardIndex = this.cardList.findIndex(
        (card) => card.id === this.formData.id
      );
      if (cardIndex !== -1) {
        this.cardList[cardIndex].memo = this.formData.memo; // 메모 업데이트
        alert("메모가 저장되었습니다.");
      }
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
      // 수정된 내용을 저장하는 로직 추가 가능
      localStorage.setItem("businessCardData", JSON.stringify(this.formData)); // 저장된 내용을 로컬 스토리지에 반영
      const cardIndex = this.cardList.findIndex(
        (card) => card.id === this.formData.id
      );
      if (cardIndex !== -1) {
        this.cardList[cardIndex] = { ...this.formData }; // 선택된 카드 데이터 업데이트
      }
      this.closeBottomSheet(); // 저장 후 bottom-sheet 닫기
    },

    deleteCard() {
      if (confirm("정말로 이 명함을 삭제하시겠습니까?")) {
        // 친구 명함이면 cardList에서 삭제
        if (this.isFriendCard) {
          const index = this.cardList.findIndex(
            (card) => card.id === this.formData.id
          );
          if (index !== -1) {
            this.cardList.splice(index, 1);
            alert("명함이 삭제되었습니다.");
          }
        } else {
          // 나의 명함이면 formData 초기화
          this.resetMyCard();
          alert("나의 명함 정보가 초기화되었습니다.");
        }
      }
    },
    resetMyCard() {
      // 나의 명함 정보를 초기화
      this.formData = { ...this.originalFormData };
      localStorage.removeItem("businessCardData"); // 로컬 스토리지에서도 삭제
    },

    goToaddBusinessCard() {
      this.$router.push("/addbusinesscard");
    },
    closeModal() {
      this.showModal = false; // 모달 닫기
    },
  },
};
</script>

<style scoped>
/* 내 명함 */
.preview-box {
  text-align: center; /* 가운데 정렬 */
  padding: 8px 20px; /* 내부 패딩 */
  height: 150px;
  width: 300px; /* 고정된 너비 */
  background-color: white;
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

edit-form input,
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
  background-color: #efeded;
  padding: 20px;
  margin-top: 38px;
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 서류 모양의 그림자 */
  position: relative;
  border: 1px solid #ffffff; /* 서류 경계선 */
  width: 350px; /* 카드 너비 */
}

/* 네임택 스타일 */
.name-tag {
  position: absolute;
  top: -20px; /* 서류에서 튀어나온 듯한 느낌 */
  left: 1px;
  background-color: #efeded; /* 네임택 색상 */
  padding: 5px 15px;
  border-radius: 5px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 14px;
}
/* 명함 목록 네임택 */
.name-tag-sec {
  position: relative; /* 명함 목록 상단에 고정 */
  top: 35px; /* 상단에서 살짝 떨어지도록 설정 */
  left: -135.8px; /* 왼쪽으로 살짝 떨어지도록 설정 */
  background-color: #efeded;
  padding: 5px 15px; /* 패딩을 조정해 텍스트에 맞춤 */
  border-radius: 5px 5px 0 0; /* 상단 모서리 둥글게 설정 */
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 14px;
  z-index: 10; /* 다른 요소들 위로 오도록 설정 */
}

/* 명함 내용 스타일 */
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #efeded;
  z-index: 2;
}

card-details-container {
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
  margin-left: 0;
  font-size: 13px;
  line-height: 1.2;
  overflow-y: overlay; /* auto에서 overlay로 변경 */
  max-height: 150px;
  padding-right: 150px; /* QR 코드 공간 확보 */
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

/* QR 코드 스타일 수정 */
.qr-code {
  position: absolute; /* 절대 위치 설정 */
  right: 15px; /* 오른쪽에서 10px 떨어짐 */
  bottom: 70px; /* 아래에서 10px 떨어짐 */
  width: 60px; /* QR 코드의 너비 설정 */
  height: 60px; /* QR 코드의 높이 설정 */
}

/* 명함 목록 스타일 */
.card-list {
  background-color: #efeded;
  padding: 20px;
  border-top-right-radius: 0; /* 상단 우측 모서리 둥글기 제거 */
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 350px;
  height: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  margin-top: 30px; /* 네임택이 들어갈 수 있도록 간격 추가 */
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
  border: 1.5px solid #ccc;
  border-radius: 5px;
  background-color: #efeded;
  color: black;
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
