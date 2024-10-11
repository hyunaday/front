<template>
  <div>
    <h1>{{ title }}</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">이름:</label>
        <input type="text" v-model="formData.name" id="name" required />
      </div>
      <div>
        <label for="phone">휴대폰 번호:</label>
        <input type="text" v-model="formData.phone" id="phone" required />
      </div>
      <div>
        <label for="phoneLandline">전화 번호(집 또는 사무실):</label>
        <input
          type="text"
          v-model="formData.phoneLandline"
          id="phoneLandline"
        />
      </div>
      <div>
        <label for="email">이메일:</label>
        <input type="email" v-model="formData.email" id="email" required />
      </div>
      <div>
        <label for="position">직책:</label>
        <input type="text" v-model="formData.position" id="position" />
      </div>
      <div>
        <label for="department">부서:</label>
        <input type="text" v-model="formData.department" id="department" />
      </div>
      <div>
        <label for="company">회사명:</label>
        <input type="text" v-model="formData.company" id="company" required />
      </div>
      <div>
        <label for="address">주소:</label>
        <input type="text" v-model="formData.address" id="address" />
      </div>
      <button type="submit">제출</button>
    </form>

    <!-- QR 코드 이미지 표시 -->
    <div v-if="qrCodeData">
      <h2>QR 코드</h2>
      <img :src="qrCodeData" alt="QR 코드" />
    </div>
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
        phone: '',
        email: '',
        position: '',
        department: '',
        company: '',
        address: '',
        phoneLandline: '',
      },
      qrCodeData: null, // QR 코드 데이터 추가
    };
  },
  methods: {
    async submitForm() {
      // API 요청 데이터
      const payload = {
        name: this.formData.name,
        phone_Num: this.formData.phone,
        tel_num: this.formData.phoneLandline,
        email: this.formData.email,
        position: this.formData.position,
        part: this.formData.department,
        company: this.formData.company,
        address: this.formData.address,
      };

      try {
        // 명함 생성 API 호출
        const response = await apiClient.post('/businessCard/qr-code', payload);

        if (response.data.isSuccess) {
          alert('명함이 성공적으로 생성되었습니다.');
          // QR 코드 등 추가 처리 가능
          console.log('QR 코드 데이터:', response.data.result);
          // Base64 데이터를 이미지 URL로 변환
          this.qrCodeData = `data:image/png;base64,${response.data.result}`;
          this.$emit('qr-code-generated', this.qrCodeData); // 부모 컴포넌트로 QR 코드 데이터 전달
        } else {
          console.log(response.data);
          console.log('Payload:', payload);
          alert('명함 생성에 실패했습니다.');
        }
      } catch (error) {
        console.error('명함 생성 중 오류가 발생했습니다.', error);
        alert('명함 생성 중 오류가 발생했습니다.');
      }
      // 페이지 이동
      // this.$router.push('/businesscard'); // form을 제출한 후 페이지 이동
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 20px;
  font-weight: bold;
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

.preview-box p:nth-child(8)::before {
}

button {
  background-color: #6981d6; /* 녹색 배경 */
  color: white; /* 글자색을 흰색으로 설정 */
  border: none; /* 테두리 없음 */
  width: 100%;
  padding: 5px 15px; /* 여백 추가 */
  font-size: 16px; /* 글자 크기 설정 */
  font-weight: bold; /* 글자 굵게 */
  border-radius: 5px; /* 모서리를 둥글게 */
  cursor: pointer; /* 마우스를 올렸을 때 포인터 커서 표시 */
  transition: background-color 0.3s ease; /* 부드러운 배경색 전환 */
}

button:hover {
  background-color: #ccc; /* 호버 시 더 어두운 녹색으로 변경 */
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
