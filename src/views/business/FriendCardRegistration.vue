<template>
  <div class="main-container d-flex flex-column">
    <div class="form-container">
      <div v-if="loading">로딩 중…</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else-if="friendCardData">
        <div class="header">
          <h3 class="friend-card-title">친구 명함 정보</h3>
          <button class="close-button" @click="closePopup">X</button>
        </div>
        <div class="preview-box">
          <h3>{{ friendCardData.company || '회사 정보 없음' }}</h3>
          <p>{{ friendCardData.address || '주소 없음' }}</p>
          <p>{{ friendCardData.name || '이름 없음' }}</p>
          <p>{{ friendCardData.position || '직책 없음' }}</p>
          <p>{{ friendCardData.part || '부서 없음' }}</p>
          <p>{{ friendCardData.phone_num || '전화번호 없음' }}</p>
          <p>{{ friendCardData.tel_num || '유선전화 없음' }}</p>
          <p>{{ friendCardData.email || '이메일 없음' }}</p>
        </div>

        <!-- 메모 스타일 수정 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 입력 필드 추가 -->
        <div class="memo-container">
          <strong>메모:</strong>
          <textarea v-model="formData.memo" placeholder="메모를 입력하세요..." class="memo-textarea"></textarea>
        </div>

        <div class="button-container">
          <button class="button edit-button" @click="editFriendCard">수정하기</button>
          <button class="button delete-button" @click="deleteFriendCard">삭제하기</button>
        </div>
      </div>
      <div v-else>
        <BusinessCardForm title="친구 명함 등록하기" />
      </div>
    </div>
    <FooterNav />

    <!-- 팝업 효과를 줄 요소 -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <h3 class="friend-card-title">친구 명함 정보</h3>
        <div class="preview-box">
          <h3>{{ friendCardData.company || '회사 정보 없음' }}</h3>
          <p>{{ friendCardData.address || '주소 없음' }}</p>
          <p>{{ friendCardData.name || '이름 없음' }}</p>
          <p>{{ friendCardData.position || '직책 없음' }}</p>
          <p>{{ friendCardData.part || '부서 없음' }}</p>
          <p>{{ friendCardData.phone_num || '전화번호 없음' }}</p>
          <p>{{ friendCardData.tel_num || '유선전화 없음' }}</p>
          <p>{{ friendCardData.email || '이메일 없음' }}</p>
        </div>
        <button @click="showPopup = false">닫기</button> <!-- 닫기 버튼 추가 -->
      </div>
    </div>
  </div>
</template>

<script>
import BusinessCardForm from '../../components/BusinessCardForm.vue';
import FooterNav from '../../components/FooterNav.vue';
import apiClient from '../../api/axios';

export default {
  components: {
    BusinessCardForm,
    FooterNav,
  },
  data() {
    return {
      friendCardData: null,
      loading: true,
      error: null,
      showPopup: false, // 팝업 상태 관리
      formData: {
        memo: '', // 메모 상태 추가
      },
    };
  },
  created() {
    const businessCardIdx = this.$route.params.businessCardIdx;
    if (businessCardIdx) {
      this.fetchFriendCardData(businessCardIdx);
    }
  },
  methods: {
    async fetchFriendCardData(businessCardIdx) {
      try {
        const response = await apiClient.get(`/businessCard/friends?businessCardIdx=${businessCardIdx}`);
        console.log('친구 명함 정보 가져오기 성공:', response.data);
        
        this.friendCardData = response.data.result.businessCardList[0];

        // friendCardData의 메모가 제대로 설정되었는지 확인
        console.log('friendCardData:', this.friendCardData);
        
        // 메모 초기화
        this.formData.memo = this.friendCardData.memo || ''; // 메모 설정
      } catch (error) {
        this.error = error.response ? error.response.data.message : '오류 발생';
        console.error('친구 명함 정보 가져오기 실패:', this.error);
      } finally {
        this.loading = false;
      }
    },
    async updateFriendCard() {
      const businessCardIdx = this.$route.params.businessCardIdx; // 수정할 카드의 인덱스

      try {
        const response = await apiClient.patch(`/businessCard/friends?businessCardIdx=${businessCardIdx}`, {
          memo: this.formData.memo, // 수정할 메모 내용
        });
        
        if (response.data.isSuccess) {
          alert('명함이 성공적으로 수정되었습니다.');
          // 수정된 데이터로 friendCardData 업데이트
          this.friendCardData.memo = this.formData.memo;

          // 변경된 친구 명함 정보를 다시 불러오기
          this.fetchFriendCardData(businessCardIdx); 
        } else {
          alert(`명함 수정에 실패했습니다: ${response.data.message}`);
        }
      } catch (error) {
        console.error('명함 수정 중 오류 발생:', error);
        alert('명함 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },

    editFriendCard() {
      this.updateFriendCard(); // 수정 메서드 호출
    },

    async deleteFriendCard() {
      try {
        const response = await apiClient.delete(`/businessCard/friends?businessCardIdx=${this.friendCardData.idx}`);
        
        if (response.data.isSuccess) {
          alert('명함이 성공적으로 삭제되었습니다.');
          this.$router.push('/businesscardlist'); // 명함 목록 페이지로 이동
        } else {
          alert(`명함 삭제에 실패했습니다: ${response.data.message}`);
        }
      } catch (error) {
        console.error('명함 삭제 중 오류 발생:', error);
        alert('명함 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },

    closePopup() {
      this.$router.push('/businesscardlist');
    }
  }
};
</script>




<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 정렬 */
}

.form-container {
  width: 100%; /* 전체 너비 사용 */
  max-width: 400px; /* 최대 너비 설정 */
  padding: 20px; /* 패딩 추가 */
}

h3 {
  font-size: 20px;
  font-weight: bold;
}

.required {
  color: red; /* 필수 항목 표시 색상 */
}

/* preview-box 스타일 */
.preview-box {
  text-align: center; /* 가운데 정렬 */
  padding: 8px 20px; /* 내부 패딩 */
  height: auto; /* 높이를 자동으로 설정 */
  width: 100%; /* 고정된 너비 */
  background-color: white;
  border: 1px solid black;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}

.preview-box h3 {
  font-size: 18px; /* 회사명 폰트 크기 */
  font-weight: bold; /* 굵게 */
  text-align: left;
  margin: 0px;
}

/* 명함 정보 텍스트 스타일 */
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
  font-size: 10px; /* 전화번호, 유선전화번호, 이메일 크기 */
  text-align: right;
}

.preview-box p:nth-child(4)::before {
  content: 'Position: '; /* 직책 앞에 텍스트 추가 */
}

.preview-box p:nth-child(5)::before {
  content: 'Dept: '; /* 부서 앞에 텍스트 추가 */
}

.preview-box p:nth-child(6)::before {
  content: 'H.P: '; /* 전화번호 앞에 텍스트 추가 */
}

.preview-box p:nth-child(7)::before {
  content: 'TEL: '; /* 유선전화번호 앞에 텍스트 추가 */
}

/* 버튼 스타일 */
.button {
  background-color: #6981d6;
  color: white;
  border: none;
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px; /* 버튼 사이 간격 */
}

.edit-button:hover {
  background-color: #5670c5;
}

.edit-button:active {
  background-color: #4a62b3;
}

.delete-button {
  background-color: #808080; /* 회색 */
}

.delete-button:hover {
  background-color: #707070;
}

.delete-button:active {
  background-color: #606060;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #ffffff00;
  margin: 20px 0;
}

.friend-card-title {
  font-size: 24px; /* 글씨 크기 증가 */
  font-weight: bold;
  margin-bottom: 30px; /* 아래 여백 증가 */
  text-align: center; /* 중앙 정렬 */
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소 위에 보이도록 설정 */
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

body {
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 오버레이 �� */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden; /* 스크롤 방지 */
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  height: 80%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  position: relative;
}

.close-popup-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

body {
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경으로 오버레이 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면의 높이에 맞추기 */
  overflow: hidden; /* 스크롤 방지 */
}

/* 팝업 컨텐츠 스타일 */
.main-container {
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  width: 370px; /* 너비 증가 */
  max-width: 90%; /* 최대 너비를 화면의 90%로 제한 */
  height: 62vh; /* 높이를 화면 높이의 80%로 설정 */
  max-height: 700px; /* 최대 높이 설정 */
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능하도록 */
  display: flex;
  flex-direction: column;
  margin-top: -20vh; /* 위로 올리기 위해 음수 마진 추가 */
}

.popup-overlay {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 상단 정렬로 변경 */
  min-height: 100vh;
  padding-top: calc(10vh - 189px); /* 기존 10vh에서 189px(5cm) 만큼 뺍니다 */
}

.form-container {
  flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능하도록 */
}

.edit-button, .delete-button, .open-popup {
  margin-top: 10px;
}

.button-container {
  margin-top: 30px; /* 버튼 컨테이너 위 여백 추가 */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.friend-card-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0; /* 기존 마진 제거 */
  text-align: left; /* 왼쪽 정렬 */
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px 10px;
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
  padding: 9px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%; /* 원하는 너비로 설정 가능, 필요에 따라 조절 */
  height: 40px; /* 원하는 높이로 설정 가능 */
  resize: none; /* 크기 조정 비활성화 */
}

.memo-container strong {
  font-weight: bold; /* 글꼴 두께 조절 */
  font-size: 10px; /* 글꼴 크기 조절 */
  color: #333; /* 텍스트 색상 조정 */
  margin-right: 10px; /* 텍스트와 textarea 사이의 간격 */
  display: flex; /* 수평 정렬을 위한 설정 */
  align-items: center; /* 수직 중앙 정렬 */
}




</style>
