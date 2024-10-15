<template>
  <div>
    <h3>{{ title }}</h3>
    <form @submit.prevent="submitForm">
      <div class="upload-box">
        <!-- 입력 내용 실시간 미리보기 -->
        <div class="preview-box">
          <h3>{{ formData.company || '회사 정보 없음' }}</h3>
          <p>{{ formData.address || '주소 없음' }}</p>
          <p>{{ formData.name || '이름 없음' }}</p>
          <p>{{ formData.position || '직책 없음' }}</p>
          <p>{{ formData.part || '부서 없음' }}</p>
          <p>{{ formData.phoneNumber || '전화번호 없음' }}</p>
          <p>{{ formData.tel_num || '유선전화 없음' }}</p>
          <p>{{ formData.email || '이메일 없음' }}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="form-group">
        <label for="name">이름&nbsp;<span class="required">*</span></label>
        <div class="input-container">
          <input type="text" id="name" v-model="formData.name" required />
        </div>
      </div>
      <div class="form-group">
        <label for="phoneNumber">연락처&nbsp;<span class="required">*</span></label>
        <div class="input-container">
          <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" required />
        </div>
      </div>
      <div class="form-group">
        <label for="email">이메일&nbsp;<span class="required">*</span></label>
        <div class="input-container">
          <input type="email" id="email" v-model="formData.email" required />
        </div>
      </div>
      <div class="form-group">
        <label for="position">직책</label>
        <div class="input-container">
          <input type="text" id="position" v-model="formData.position" />
        </div>
      </div>
      <div class="form-group">
        <label for="part">부서/파트</label>
        <div class="input-container">
          <input type="text" id="part" v-model="formData.part" />
        </div>
      </div>
      <div class="form-group">
        <label for="company">소속명</label>
        <div class="input-container">
          <input type="text" id="company" v-model="formData.company" />
        </div>
      </div>
      <div class="form-group">
        <label for="address">주소</label>
        <div class="input-container">
          <input type="text" id="address" v-model="formData.address" />
        </div>
      </div>
      <div class="form-group">
        <label for="tel_num">유선번호</label>
        <div class="input-container">
          <input
            type="tel"
            id="tel_num"
            v-model="formData.tel_num"
          />
        </div>
      </div>
      <button class="button" type="submit">등록</button>
    </form>
  </div>
</template>


<script>
import apiClient from '../api/axios.js'; // Axios 인스턴스 임포트
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        name: '',
        phoneNumber: '',
        email: '',
        position: '',
        part: '',
        company: '',
        address: '',
        tel_num: '',
      },
      qrCodeData: null, // QR 코드 데이터 초기화
    };
  },
  methods: {
    async submitForm() {
      // API 요청 데이터
      const payload = {
        name: this.formData.name,
        phoneNumber: this.formData.phoneNumber,
        email: this.formData.email,
        position: this.formData.position,
        company: this.formData.company,
        address: this.formData.address,
        part: this.formData.part,
        tel_num: this.formData.tel_num,
      };
      try {
        // 명함 생성 API 호출 (API 엔드포인트 수정)
        const response = await apiClient.post('/businessCard', payload);
        if (response.data.isSuccess) {
          alert('명함이 성공적으로 생성되었습니다.');
          // QR 코드 등 추가 처리 가능
          console.log('서버 응답 데이터:', response.data); // 응답 데이터 출력
          // QR 코드 데이터 처리
          this.qrCodeData = response.data.result.imgUrl; // imgUrl 가져오기
          this.$emit('qr-code-generated', this.qrCodeData); // 부모 컴포넌트로 QR 코드 데이터 전달

          this.$router.push('/businesscard');
        } else {
          console.log(response.data);
          console.log('Payload:', payload);
          alert('명함 생성에 실패했습니다.');
        }
      } catch (error) {
        console.error(
          '명함 생성 중 오류가 발생했습니다.',
          error.response ? error.response.data : error
        );
        alert('명함 생성 중 오류가 발생했습니다.');
      }
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
}

.required {
  color: red; /* 필수 항목 표시 색상 */
}

.form-group {
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 정렬 */
  margin-bottom: 20px; /* 폼 그룹 간격 */
}

label {
  font-size: 13px;
  font-weight: bold;
  margin-right: -20px; /* 라벨과 입력 필드 간격 */
  width: 100px; /* 라벨 너비 설정 (조정 가능) */
}

.input-container {
  flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
  display: flex; /* Flexbox 사용 */
}

input,
textarea {
  width: 225px; /* 박스의 너비를 고정 */
  height: 25px; /* 높이를 일관되게 설정 */
  border: 1px solid #ccc; /* 테두리 색상 */
  border-radius: 9px; /* 모서리 둥글게 */
  box-sizing: border-box; /* 패딩과 테두리가 포함된 너비 계산 */
  overflow: hidden; /* 스크롤바 숨기기 */
}

textarea {
  height: 80px; /* 텍스트 영역의 높이를 더 높게 설정 */
  resize: none; /* 크기 조절 불가능하게 설정 */
  overflow: hidden; /* 텍스트 영역에서 스크롤바 숨기기 */
}

.upload-box {
  font-size: 15px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 300px;
  border: 1px solid black;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}

/* 내 명함 */
.preview-box {
  text-align: center; /* 가운데 정렬 */
  padding: 8px 20px; /* 내부 패딩 */
  height: 150px;
  width: 300px; /* 고정된 너비 */
  background-color: white;
  border: 1px solid black;
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

button {
  width: 100%;
  margin: 10px 0;
  padding: 5px 15px; /* 여백 추가 */
  background-color: #7189ff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid #6981d9;
  border-radius: 10px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: white;
  color: #6981d9;
}

button:active {
  background-color: #e0e0e0; /* 클릭 시 더 어두운 색 */
}

button:disabled {
  background-color: #ccc; /* 비활성화 상태일 때 회색 배경 */
  cursor: not-allowed; /* 클릭할 수 없다는 커서 표시 */
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
}
</style>
