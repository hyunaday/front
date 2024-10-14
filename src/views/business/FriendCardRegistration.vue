<template>
  <div class="main-container d-flex flex-column">
    <div class="form-container">
      <div v-if="loading">로딩 중…</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else-if="friendCardData">
        <h3>친구 명함 정보</h3>
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
        <div class="divider"></div>
        <button class="button edit-button" @click="editFriendCard">수정하기</button>
        <button class="button delete-button" @click="deleteFriendCard">삭제하기</button>
      </div>
      <div v-else>
        <BusinessCardForm title="친구 명함 등록하기" />
      </div>
    </div>
    <FooterNav />
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
      } catch (error) {
        this.error = error.response ? error.response.data.message : '오류 발생';
        console.error('친구 명함 정보 가져오기 실패:', this.error);
      } finally {
        this.loading = false;
      }
    },
    editFriendCard() {
      this.$router.push({
        name: 'EditFriendCard',
        params: { businessCardIdx: this.$route.params.businessCardIdx },
      });
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
  },
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
</style>
