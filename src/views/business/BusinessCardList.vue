<template>
  <div class="main-container">
    <!-- 헤더 컴포넌트 -->
    <Header />

    <!-- 선택된 명함 표시 -->
    <div class="selected-card">
      <div class="name-tag-group">
        <!-- 뒤로 가기 버튼 -->
        <button @click="goBackToMyCard" class="back-to-my-card-button">
          {{ nameTagLabel }}
        </button>
        <!-- 명함 목록 토글 버튼 -->
        <button
          class="name-tag-sec"
          :class="{ active: isCardListVisible }"
          @click="showCardList"
        >
          명함목록
        </button>
      </div>

      <!-- 명함 목록 또는 나의 명함 상세 정보 표시 -->
      <div class="card">
        <!-- 명함 목록 표시: isCardListVisible가 true일 때 -->
        <div class="card-list">
          <div
            v-for="card in cardList"
            :key="card.id"
            class="card-item"
            @click="openCardDetailModal(card)"
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
                <!-- 카드의 상세 정보 표시 -->
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
    </div>

    <!-- 하단 내비게이션 -->
    <FooterNav :buttonType="'plus'" :buttonAction="goToaddBusinessCard" />

    <!-- 새로운 명함 상세 모달 -->
    <div
      v-if="isCardDetailModalVisible"
      class="modal"
      @click="closeCardDetailModal"
    >
      <div class="modal-content card-detail-container" @click.stop>
        <div class="modal-header">
          <button class="close-btn" @click="closeCardDetailModal">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <h3>{{ selectedCard.company || '회사 정보 없음' }}</h3>
        </div>

        <div class="card-detail-form">
          <div class="form-row">
            <label class="form-label">회사명:</label>
            <input v-model="editSelectedCard.company" type="text" />
          </div>
          <div class="form-row">
            <label class="form-label">주소:</label>
            <input v-model="editSelectedCard.address" type="text" />
          </div>
          <div class="form-row">
            <label class="form-label">이름:</label>
            <input v-model="editSelectedCard.name" type="text" />
          </div>
          <div class="form-row">
            <label class="form-label">직책:</label>
            <input v-model="editSelectedCard.position" type="text" />
          </div>
          <div class="form-row">
            <label class="form-label">부서:</label>
            <input v-model="editSelectedCard.department" type="text" />
          </div>
          <div class="form-row">
            <label class="form-label">휴대전화:</label>
            <input v-model="editSelectedCard.phone" type="text" />
          </div>
          <div class="form-row">
            <label class="form-label">유선전화:</label>
            <input v-model="editSelectedCard.phoneLandline" type="text" />
          </div>
          <div class="form-row">
            <label class="form-label">이메일:</label>
            <input v-model="editSelectedCard.email" type="text" />
          </div>
          <div class="form-row">
            <label class="form-label">메모:</label>
            <input v-model="editSelectedCard.memo" type="text" />
          </div>
        </div>

        <!-- 저장 및 삭제 버튼 -->
        <div class="modal-buttons">
          <button @click="saveCardDetails">저장</button>
          <button @click="deleteCardDetails">삭제</button>
        </div>
      </div>
    </div>

    <!-- 수정 bottom-sheet -->
    <bottom-sheet id="editBottomSheet" title="명함 수정">
      <main>
        <div class="edit-form">
          <label>회사명:</label>
          <input v-model="editData.company" type="text" />

          <label>주소:</label>
          <input v-model="editData.address" type="text" />

          <label>이름:</label>
          <input v-model="editData.name" type="text" />

          <label>직책:</label>
          <input v-model="editData.position" type="text" />

          <label>부서:</label>
          <input v-model="editData.department" type="text" />

          <label>휴대전화:</label>
          <input v-model="editData.phone" type="text" />

          <label>유선전화:</label>
          <input v-model="editData.phoneLandline" type="text" />

          <label>이메일:</label>
          <input v-model="editData.email" type="text" />
        </div>
        <div class="modal-buttons">
          <button @click="saveChanges">저장</button>
          <!-- 변경 사항 저장 버튼 -->
          <button @click="closeBottomSheet">취소</button>
          <!-- 취소 버튼 -->
        </div>
      </main>
    </bottom-sheet>
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';
import Header from '../../components/Header.vue';
import QrcodeVue from 'qrcode.vue'; // QR 코드 라이브러리

export default {
  name: 'BusinessCard',
  components: {
    FooterNav,
    Header,
    QrcodeVue,
  },
  data() {
    return {
      isCardListVisible: true,
      formData: {
        name: '',
        phone: '',
        email: '',
        position: '',
        department: '',
        company: '',
        address: '',
        phoneLandline: '',
        memo: '',
      }, // 나의 명함 데이터
      cardList: [
        {
          id: 1,
          name: 'Alice Johnson',
          position: 'Developer',
          department: 'Engineering',
          company: 'Tech Corp',
          address: '123 Tech Street',
          phone: '010-1234-5678',
          phoneLandline: '02-123-4567',
          email: 'alice@techcorp.com',
          memo: '',
        },
        {
          id: 2,
          name: 'Bob Lee',
          position: 'Designer',
          department: 'Creative',
          company: 'Creative Agency',
          address: '456 Creative Ave',
          phone: '010-8765-4321',
          phoneLandline: '031-765-4321',
          email: 'bob@creativeagency.com',
          memo: '',
        },
        {
          id: 3,
          name: 'Charlie Kim',
          position: 'Project Manager',
          department: 'Operations',
          company: 'Business Solutions',
          address: '789 Business Blvd',
          phone: '010-1111-2222',
          phoneLandline: '051-111-2222',
          email: 'charlie@businesssolutions.com',
          memo: '',
        },
        {
          id: 4,
          name: 'David Park',
          position: 'Marketing Specialist',
          department: 'Marketing',
          company: 'Marketing Group',
          address: '321 Marketing Rd',
          phone: '010-3333-4444',
          phoneLandline: '053-333-4444',
          email: 'david@marketinggroup.com',
          memo: '',
        },
      ], // 명함 목록 데이터
      isCardListVisible: false, // 명함 목록 표시 상태
      isCardDetailModalVisible: false, // 명함 상세 모달 표시 상태
      selectedCard: null, // 선택된 명함 데이터
      editSelectedCard: {}, // 명함 상세 모달 수정 데이터
      showModal: false, // QR 코드 모달 표시 상태
      editData: {}, // 나의 명함 수정 데이터
    };
  },
  computed: {
    nameTagLabel() {
      return '나의 명함'; // 항상 "나의 명함"으로 표시
    },
  },
  created() {
    // cardList 로드 (옵션: 필요 시)
    const storedCardList = localStorage.getItem('cardList');
    if (storedCardList) {
      this.cardList = JSON.parse(storedCardList);
    }
  },
  methods: {
    showCardList() {
      this.isCardListVisible = true;
    },
    goBackToMyCard() {
      this.$router.push('/businesscard'); // Vue Router를 사용하여 이동
    },
    openCardDetailModal(card) {
      this.selectedCard = card;
      // 선택한 명함의 데이터를 임시 편집 데이터로 복사
      this.editSelectedCard = { ...card };
      this.isCardDetailModalVisible = true; // 새로운 명함 상세 모달 열기
    },
    closeCardDetailModal() {
      this.isCardDetailModalVisible = false; // 명함 상세 모달 닫기
      this.editSelectedCard = {}; // 임시 편집 데이터 초기화
    },
    saveCardDetails() {
      // 선택한 명함의 데이터를 업데이트
      Object.assign(this.selectedCard, this.editSelectedCard);

      // cardList에서도 업데이트된 명함을 반영
      const index = this.cardList.findIndex(
        (card) => card.id === this.selectedCard.id
      );
      if (index !== -1) {
        this.cardList.splice(index, 1, { ...this.selectedCard });
      }

      // cardList를 로컬 스토리지에 저장
      localStorage.setItem('cardList', JSON.stringify(this.cardList));

      // 모달 닫기
      this.isCardDetailModalVisible = false;
      this.editSelectedCard = {};

      // 선택한 명함의 변경 사항을 로컬 스토리지에 저장 (필요 시)
      // 예시: 모든 명함 데이터를 로컬 스토리지에 저장
      localStorage.setItem('businessCardData', JSON.stringify(this.formData));
      alert('명함 정보가 저장되었습니다.');
    },
    deleteCardDetails() {
      // 삭제 확인을 위한 alert 창
      const confirmDelete = confirm('정말로 이 명함을 삭제하시겠습니까?');
      if (confirmDelete) {
        // 명함을 목록에서 삭제
        const index = this.cardList.findIndex(
          (card) => card.id === this.selectedCard.id
        );
        if (index !== -1) {
          this.cardList.splice(index, 1); // 선택한 명함 삭제
        }

        // cardList를 로컬 스토리지에 저장
        localStorage.setItem('cardList', JSON.stringify(this.cardList));

        // 모달 닫기 및 선택한 카드 초기화
        this.isCardDetailModalVisible = false;
        this.editSelectedCard = {};

        alert('명함이 삭제되었습니다.');
      }
    },
    goToaddBusinessCard() {
      this.$router.push('/addbusinesscard'); // 라우터를 이용한 페이지 전환
    },
    openBottomSheet() {
      // 수정 bottom-sheet 열기
      this.editData = { ...this.formData }; // 나의 명함 수정 데이터 초기화
      const bottomSheet = document.getElementById('editBottomSheet');
      if (bottomSheet) {
        bottomSheet.openSheet(); // bottom-sheet 열기
      } else {
        console.error('Bottom sheet element not found'); // 오류 로그
      }
    },
    closeBottomSheet() {
      // 수정 bottom-sheet 닫기
      const bottomSheet = document.getElementById('editBottomSheet');
      if (bottomSheet) {
        bottomSheet.closeSheet(); // bottom-sheet 닫기
      }
    },
    saveChanges() {
      // "나의 명함" 수정 사항 저장
      this.formData = { ...this.editData };
      localStorage.setItem('businessCardData', JSON.stringify(this.formData)); // 로컬 스토리지에 저장

      // 나의 명함이 수정되었음을 반영 (필요 시)
      alert('나의 명함 정보가 저장되었습니다.');

      this.closeBottomSheet(); // bottom-sheet 닫기
    },
    deleteCard() {
      // 카드 삭제
      if (confirm('정말로 이 명함을 삭제하시겠습니까?')) {
        // 나의 명함 삭제
        this.resetMyCard();
        alert('나의 명함 정보가 초기화되었습니다.'); // 초기화 완료 메시지
      }
    },
    resetMyCard() {
      // 나의 명함 초기화
      this.formData = {
        name: '',
        phone: '',
        email: '',
        position: '',
        department: '',
        company: '',
        address: '',
        phoneLandline: '',
        memo: '',
      }; // 명함 데이터 초기화
      localStorage.removeItem('businessCardData'); // 로컬 스토리지에서 삭제
    },
    closeModal() {
      // QR 코드 모달 닫기
      this.showModal = false; // 모달 닫기
    },
  },
};
</script>

<style scoped>
.input {
  width: 200px;
}
.modal-header {
  display: flex;
  justify-content: space-between; /* 제목과 X 버튼 간의 간격 설정 */
  align-items: center; /* 수직 정렬 */
  margin-bottom: 20px; /* 아래쪽 여백 추가 */
}

.close-btn {
  margin-top: 160px;
  margin-left: 260px;
  margin-bottom: -15px;
  background: none; /* 배경 없애기 */
  border: none; /* 테두리 없애기 */
  font-size: 24px; /* 글자 크기 조정 */
  cursor: pointer; /* 커서 포인터로 변경 */
  color: black;
  text-align: right;
}

.form-label {
  margin-top: 10px; /* label 위쪽 여백 추가 */
  text-align: left;
}

.form-row {
  display: flex;
  align-items: center; /* 수직 정렬을 중앙으로 맞춤 */
  margin-bottom: 10px; /* 각 행 간의 간격 추가 */
}

.form-row label {
  width: 100px; /* label의 고정 너비 설정 (필요에 따라 조정 가능) */
  margin-right: -20px; /* label과 input 사이의 간격 추가 */
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
  width: 300px;
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
  font-size: 2px; /* 전화번호, 유선전화번호, 이메일 크기 축소 */
  text-align: right;
}

.preview-box-small p:nth-child(4)::before {
  content: 'Position: '; /* 직책 앞에 텍스트 추가 */
}

.preview-box-small p:nth-child(5)::before {
  content: 'Dept: '; /* 부서 앞에 텍스트 추가 */
}

.preview-box-small p:nth-child(6)::before {
  content: 'H.P: '; /* 전화번호 앞에 텍스트 추가 */
}

.preview-box-small p:nth-child(7)::before {
  content: 'TEL: '; /* 유선전화번호 앞에 텍스트 추가 */
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
  background-color: #afafaf;
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
  background-color: #4e5ba3;
  transform: translateY(-5px); /* 살짝 위로 이동 */
  box-shadow: 0 24px 36px rgba(0, 0, 0, 0.15); /* hover 시 그림자 강화 */
}

.name-tag-sec {
  background-color: #afafaf;
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

.name-tag-sec.active {
  background-color: #6981d9;
  z-index: 9999;
}

.name-tag-sec.focus {
  background-color: #6981d9;
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
.card-detail-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  height: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.card-detail-container h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.card-detail-container p {
  font-size: 14px;
  margin: 5px 0;
}

/* QR 코드 모달 스타일 */
.qr-code-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-content.qr-modal {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* 새로운 명함 상세 모달 스타일 */
.card-detail-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.card-detail-container h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.card-detail-form {
  display: flex;
  flex-direction: column;
}

.card-detail-form label {
  font-weight: bold;
  margin-top: 10px;
}

.card-detail-form input {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 명함 상세 모달의 버튼 스타일 */
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-buttons button {
  font-size: 12px;
  border: 1.5px solid #ccc;
  border-radius: 5px;
  background-color: #6981d9; /* 저장 버튼: 초록색 */
  color: #ffffff;
  cursor: pointer;
  padding: 8px 16px;
}

.modal-buttons button.cancel-button {
  background-color: #f44336; /* 취소 버튼: 빨간색 */
}

.modal-buttons button:hover {
  opacity: 0.8;
}

.modal-buttons button:active {
  opacity: 1;
}

/* QR 코드 모달 스타일 */
.qr-modal {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* QR 코드 모달의 추가 텍스트 스타일 */
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

/* 명함 상세 모달의 버튼 스타일 */
.card-detail-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.card-detail-buttons button {
  font-size: 12px;
  border: 1.5px solid #ccc;
  border-radius: 5px;
  background-color: #4caf50; /* 저장 버튼: 초록색 */
  color: #ffffff;
  cursor: pointer;
  padding: 8px 16px;
}

.card-detail-buttons button.cancel-button {
  background-color: #f44336; /* 취소 버튼: 빨간색 */
}

.card-detail-buttons button:hover {
  opacity: 0.8;
}

.card-detail-buttons button:active {
  opacity: 1;
}
</style>
