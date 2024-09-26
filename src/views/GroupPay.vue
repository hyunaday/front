<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <button @click="goBack" class="back-button">
      <i class="fas fa-chevron-left"></i>
    </button>
    <h3>함께 결제하기</h3>

    <!-- 버튼 클릭 시 QR 코드 스캐너 모달 표시 -->
    <button class="custom-button" @click="showScanner = true">개인 결제</button>
    <button class="custom-button" @click="showScanner = true">대표 결제</button>
    <button class="custom-button" @click="showScanner = true">팀원 결제</button>

    <!-- QR 코드 스캐너 모달 -->
    <div v-if="showScanner" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">X</button>
        <qrcode-stream @decode="onDecode" @init="onInit" />
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="decodedData" class="decoded-data">
          스캔된 데이터: {{ decodedData }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  name: 'MyAssets',
  components: {
    QrcodeStream,
  },
  data() {
    return {
      decodedData: '',
      errorMessage: '',
      showScanner: false, // QR 코드 스캐너 모달 표시 여부
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 이전 페이지로 이동
    },
    onDecode(data) {
      this.decodedData = data; // 스캔된 데이터 저장
      this.errorMessage = ''; // 오류 메시지 초기화
    },
    onInit(success, error) {
      if (error) {
        this.errorMessage = '카메라에 접근할 수 없습니다. 권한을 확인하세요.';
      } else if (success) {
        this.errorMessage = ''; // 초기화 시 성공 메시지 초기화
      }
    },
    closeModal() {
      this.showScanner = false; // 모달 닫기
    },
  },
};
</script>

<style scoped>
/* 전체 템플릿 */
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  min-height: 100vh;
  background-color: #c0c0c0; /* 나머지 화면은 회색 */
}

.main-container {
  width: 360px; /* 고정된 너비 */
  height: 800px; /* 고정된 높이 */
  background-color: white; /* 흰색 배경 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 살짝 그림자 추가 */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  position: relative;
}

h3 {
  font-size: 20px;
  font-weight: 530;
  text-align: left; /* 왼쪽 정렬로 변경 */
  margin-left: -170px;
  margin-bottom: 50px; /* 제목과 버튼 사이의 여백 */
  display: flex; /* 플렉스 박스로 변경 */
  align-items: center; /* 수직 정렬 */
}

.back-button {
  background: none; /* 배경 제거 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 마우스 커서 변경 */
  font-size: 18px; /* 화살표 크기 조정 */
  font-weight: 400;
  color: #000; /* 화살표 색상 */
  text-align: left; /* 왼쪽 정렬로 변경 */
  margin-left: -270px;
  margin-bottom: 30px; /* 제목과 버튼 사이의 여백 */
}

.back-button:hover {
  color: #7189ff; /* 호버 시 색상 변경 */
}

/* 모달 오버레이 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7); /* 불투명한 검정색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 모달 콘텐츠 스타일 */
.modal-content {
  background: white; /* 모달 배경 색상 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

/* router-link의 기본 스타일 제거 */
.link {
  text-decoration: none; /* 링크의 밑줄 제거 */
}

.custom-button {
  width: 300px;
  height: 100px;
  background-color: #ffffff;
  border: 1px solid gray; /* 기본 테두리 제거 */
  border-radius: 9px;
  color: #000000; /* 텍스트 색상 */
  font-size: 20px;
  cursor: pointer; /* 마우스 커서 변경 */
  outline: none; /* 포커스 시 기본 테두리 제거 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px; /* 버튼 사이의 간격 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 박스 쉐도우 추가 */
  transition: background-color 0.3s, color 0.3s; /* 부드러운 전환 효과 추가 */
}

.custom-button:hover {
  background-color: #f3f8fe; /* 호버 시 배경색 변경 */
  color: #333; /* 호버 시 텍스트 색상 변경 */
}

.error-message {
  color: red; /* 오류 메시지 색상 */
  margin-top: 20px; /* 오류 메시지와 여백 */
}

.decoded-data {
  margin-top: 20px; /* 스캔된 데이터와 여백 */
}

/* 필요에 따라 추가 스타일을 작성하세요 */
</style>
