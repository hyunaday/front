<template>
  <div class="main-container">
    <Header />

    <div class="selected-card">
      <div class="name-tag-group">
        <button
          @click="goBackToMyCard"
          class="back-to-my-card-button"
          :class="{ active: !isCardListVisible }"
        >
          {{ nameTagLabel }}
        </button>
        <button
          class="name-tag-sec"
          cancel-button
          @click="goToCardList"
          :class="{ active: isCardListVisible }"
        >
          명함 목록
        </button>
      </div>

      <div class="card">
        <div v-if="isCardListVisible">
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
                  <p>{{ card.position }} / {{ card.part }}</p>
                  <p>{{ card.company }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="preview-box">
          <h3>{{ formData.company || '회사 정보 없음' }}</h3>
          <p>{{ formData.address || '주소 없음' }}</p>
          <p>{{ formData.name || '이름 없음' }}</p>
          <p>{{ formData.position || '직책 없음' }}</p>
          <p>{{ formData.part || '부서 없음' }}</p>
          <p>{{ formData.phoneNum || '전화번호 없음' }}</p>
          <p>{{ formData.tel_num || '유선전화 없음' }}</p>
          <p>{{ formData.email || '이메일 없음' }}</p>

          <hr>
              <!-- QR 코드 이미지를 주소 아래에 표시 -->
         <div
              v-if="qrCodeData"
              class="qr-code-container"
              @click="showModal = true"
            >
              <img
                :src="qrCodeData"
                alt="QR 코드"
                class="qr-code-image"
                style="width: 140px; height: 140px"
              />
            </div>
        </div>  
      </div>

        <!-- QR 코드 모달 -->
  <div v-if="showModal" class="modal" @click="closeModal">
    <div class="modal-content qr-modal" @click.stop>
      <div class="qr-code-container">
        <img
          :src="qrCodeData"
          alt="QR 코드"
          class="qr-code-image"
          style="width: 200px; height: 200px"
        />
      </div>
    </div>
    <p class="additional-text">QR 코드를 <br>스캔하세요</p>
  </div>

      <div
        class="button-container"
        v-if="!isCardListVisible && !isCardDetailModalVisible"
      >
        <button type="button" @click="openBottomSheet">수정</button>
        <button @click="deleteCard">삭제</button>
      </div>
    </div>
  </div>

  <FooterNav :buttonType="'plus'" :buttonAction="goToaddBusinessCard" />

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
        <input v-model="editData.part" type="text" />
        <label>휴대전화:</label>
        <input v-model="editData.phoneNum" type="text" />
        <label>유선전화:</label>
        <input v-model="editData.tel_num" type="text" />
        <label>이메일:</label>
        <input v-model="editData.email" type="text" />
        <div v-if="isFriendCard">
          <label>메모:</label>
          <textarea
            v-model="editData.memo"
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
</template>

<script>
import apiClient from '../../api/axios.js';
import FooterNav from '../../components/FooterNav.vue';
import Header from '../../components/Header.vue';
import QrcodeVue from 'qrcode.vue';
export default {
  name: 'BusinessCard',
  components: {
    FooterNav,
    Header,
    QrcodeVue,
  },
  data() {
    return {
      formData: {
        name: '',
        phoneNum: '',
        email: '',
        position: '',
        part: '',
        company: '',
        address: '',
        tel_num: '',
        memo: '',
      },
      cardList: [],
      isCardListVisible: false,
      isCardDetailModalVisible: false,
      selectedCard: null,
      editSelectedCard: {},
      showModal: false,
      qrCodeData: '', // QR 코드 데이터를 저장할 변수
      isBottomSheetVisible: false,
      editData: {},
      isBottomSheetVisible: false,
      editData: {},
    };
  },
  computed: {
    nameTagLabel() {
      return '나의 명함';
    },
  },
  created() {
    this.fetchBusinessCardData();
  },
  methods: {
    async fetchBusinessCardData() {
      try {
        const response = await apiClient.get('/businessCard/myBusinessCard');
        console.log('서버 응답 데이터:', response.data);

        if (response.data.isSuccess) {
          console.log('명함 데이터:', response.data.result);

          const cardData = response.data.result.businessCardList[0]; // 첫 번째 카드 데이터
          console.log('비즈니스 카드 데이터:', cardData);

          this.formData = {
            idx: cardData.idx,
            name: cardData.name,
            phoneNum: cardData.phoneNum,
            email: cardData.email,
            position: cardData.position,
            part: cardData.part,
            company: cardData.company,
            address: cardData.address,
            tel_num: cardData.tel_num,
          };

          // QR 코드 이미지 URL이 있으면 qrCodeData에 할당
          if (cardData.imgurl) {
            // 서버에서 받은 데이터의 imgurl
            this.qrCodeData = cardData.imgurl;
          } else {
            console.error('QR 코드 데이터가 없습니다.');
            alert('QR 코드 데이터가 없습니다.');
          }
        } else {
          console.error(response.data.message);
          alert(response.data.message);
        }
      } catch (error) {
        console.error('명함 정보를 가져오는 중 오류 발생:', error);
        if (
          confirm(
            '등록된 나의 명함 정보가 없습니다. 새 명함을 등록하시겠습니까?'
          )
        ) {
          this.$router.push('/addbusinesscard');
        }
      }
    },

    toggleCardList() {
      this.isCardListVisible = !this.isCardListVisible;
    },
    goBackToMyCard() {
      this.isCardListVisible = false;
    },
    goToCardList() {
      this.$router.push('/businesscardlist'); // 페이지 이동
    },
   goToCardList() {
      this.$router.push('/businesscardlist'); // 페이지 이동
    },
   goToaddBusinessCard() {
      this.$router.push('/addbusinesscard');
    },
    openBottomSheet() {
      this.editData = { ...this.formData };
      const bottomSheet = document.getElementById('editBottomSheet');
      if (bottomSheet) {
        bottomSheet.openSheet();
      } else {
        console.error('Bottom sheet element not found');
      }
    },
    closeBottomSheet() {
      const bottomSheet = document.getElementById('editBottomSheet');
      if (bottomSheet) {
        bottomSheet.closeSheet();
      }
    },
saveChanges() {
  if (!this.formData.idx) {
    alert('명함 ID가 설정되지 않았습니다.');
    console.error('formData에서 idx 값이 없습니다:', this.formData);
    return;
  }

  console.log('전송할 데이터:', this.editData);

  // PATCH 요청으로 서버에 데이터 수정 요청
  apiClient
    .patch(`/businessCard?idx=${this.formData.idx}`, this.editData)
    .then((response) => {
      console.log('서버 응답:', response.data);

      if (response.data.isSuccess) {
        this.formData = { ...this.editData }; // 수정된 데이터로 formData 업데이트
        alert('나의 명함 정보가 저장되었습니다.');
      } else {
        alert('수정 실패: ' + response.data.message);
      }
    })
    .catch((error) => {
      console.error('명함 정보 수정 중 오류 발생:', error);
      alert('명함 정보 수정 중 오류가 발생했습니다.');
    })
    .finally(() => {
      this.closeBottomSheet(); // Bottom sheet 닫기
    });
},
    deleteCard() {
      if (confirm('정말로 이 명함을 삭제하시겠습니까?')) {
        // DELETE 요청으로 서버에 명함 삭제 요청
        apiClient
          .delete(`/businessCard?idx=${this.formData.idx}`)
          .then((response) => {
            // 서버 응답 확인
            console.log('서버 응답:', response.data);

            if (response.data.isSuccess) {
              alert('명함이 삭제되었습니다.');
              // 명함 삭제 후 상태를 업데이트하거나 리스트를 새로고침할 수 있음
              this.fetchBusinessCardData(); // 비즈니스 카드 목록을 새로고침하는 메서드 호출
            } else {
              alert('삭제 실패: ' + response.data.message);
            }
          })
          .catch((error) => {
            console.error('명함 삭제 중 오류 발생:', error);
            alert('명함 삭제 중 오류가 발생했습니다.');
          });
      }
    },
    closeModal() {
      this.showModal = false;
    },
    saveFormData() {
      this.cardList.push({ ...this.formData });
      this.formData = {
        name: '',
        phoneNum: '',
        email: '',
        position: '',
        part: '',
        company: '',
        address: '',
        tel_num: '',
        memo: '',
      };
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
  margin-top: 140px;
  background: none; /* 배경 없애기 */
  border: none; /* 테두리 없애기 */
  font-size: 24px; /* 글자 크기 조정 */
  cursor: pointer; /* 커서 포인터로 변경 */
  color: black;
  text-align: right;
}

.close-button:hover {
  color: red; /* 마우스 오버 시 색상 변경 (선택 사항) */
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

/* 내 명함 */
.preview-box {
  margin : 10px 0 28px 10px;
  text-align: center;
  padding: 10px 25px 20px 15px;
  height: 375px;
  width: 300px;
  }

.preview-box h3 {
  font-size: 23px; /* 회사명 폰트 크기 */
  font-weight: bold; /* 굵게 */
  text-align: right;
  margin: 0px;
}

/* 이름 */
.preview-box p {
  margin: 0px 0; /* 각 문장 간의 간격 */
  font-size: 15px; /* 일반 텍스트 크기 */
  /* text-align: left; */
}

.preview-box p:nth-child(2) {
  font-size: 14px; /* 주소 폰트 크기 */
  text-align: right;
  margin: 3px 0px;
}

.preview-box p:nth-child(3) {
  font-size: 22px; /* 이름 폰트 크기 */
  text-align: left;
  margin: 0px 0px 3px;
  font-weight: bold; /* 이름 텍스트 굵게 */

}
.preview-box p:nth-child(4),
.preview-box p:nth-child(5) {
  font-size: 13px; /* 직책과 부서 폰트 크기 */
  font-weight: bold; /* 직책과 부서 텍스트 굵게 */
  text-align: left;
}

.preview-box p:nth-child(6),
.preview-box p:nth-child(7),
.preview-box p:nth-child(8) {
  font-size: 13px; /*  전화번호, 유선전화번호, 이메일 크기 */
  text-align: left;
}

.preview-box p:nth-child(4)::before {
  content: 'Position: '; /* 직책 앞에 텍스트 추가 */
}

.preview-box p:nth-child(5)::before {
  content: 'Dept: '; /* 부서 앞에 텍스트 추가 */
}

.preview-box p:nth-child(6)::before {
  content: 'H.P: '; /* 전화번호 앞�� 텍스트 추가 */
}

.preview-box p:nth-child(7)::before {
  content: 'TEL: '; /* 유선전화번호 앞에 텍스트 추가 */
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

/* 사용 유무 확인 필요 */
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
  padding: 60px 20px 40px 20px;
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

.active {
  position: relative; /* z-index 적용을 위해 position을 relative로 설정 */
  z-index: 10; /* 원하는 z-index 값으로 설정 */
  background-color: #6981d9;
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

.name-tag-sec:active {
  background-color: #4e5ba3;
}

.name-tag-sec:focus {
  background-color: #6981d9;
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
  font-size: 13px;
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
  cursor: pointer;
  margin: 0 13px 0 0 ;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-content.qr-modal {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 15px 15px 25px;
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
  height: 250px;
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