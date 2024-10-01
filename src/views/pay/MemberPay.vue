<template>
  <div>
    <div class="main-container d-flex flex-column">
      <div class="header">
        <button @click="goBack" class="back-button">
          <i class="fas fa-chevron-left"></i>
        </button>
        <h2 class="title">결제 QR코드</h2>
      </div>

      <div class="payment-success-page">
        <div class="qr-code-icon">
          <div class="square-box">
            <!-- 여기에 QR 코드 이미지가 들어갈 자리입니다 -->
          </div>
        </div>
        <h2 class="qr-title">함께 결제를 위한 QR코드</h2>
        <h3 class="qr-instruction">
          함께 결제할 팀원들에게 해당 QR코드를 <br />
          공유하거나 링크를 보내주세요!
        </h3>

        <button @click="shareLink" class="share-link-button">
          링크 공유하기
        </button>
        <button @click="goToNextPage" class="confirm-button">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1); // 뒤로 가기
    },
    shareLink() {
      const qrCodeContent = 'https://example.com/your-qr-link'; // QR 코드 내용
      navigator.clipboard
        .writeText(qrCodeContent)
        .then(() => {
          alert('QR 코드 내용이 클립보드에 복사되었습니다!');
        })
        .catch((error) => {
          console.error('링크 복사 중 오류 발생:', error);
        });
    },
    goToNextPage() {
      this.$router.push('/'); // 이동할 페이지 경로를 입력하세요.
    },
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  width: 100%;
}

.back-button {
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #000;
}

.title {
  font-size: 18px;
  margin: 0;
  text-align: center;
}

.qr-title {
  font-size: 24px;
  color: #333;
  margin: 15px 0;
}

.qr-instruction {
  font-size: 16px;
  color: #666;
  margin: 10px 0;
}

.payment-success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.qr-code-icon {
  margin-bottom: 20px; /* QR 코드와 텍스트 간 간격 조정 */
}

.square-box {
  width: 160px; /* 네모 상자의 너비 */
  height: 160px; /* 네모 상자의 높이 */
  background-color: #ccc; /* 네모 상자의 배경 색상 */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #666; /* 네모 상자 테두리 스타일 */
}

/* 버튼 스타일은 기존과 동일하게 유지 */
.share-link-button {
  margin-top: 20px; /* 버튼과 QR 코드 간 간격 조정 */
  padding: 10px 20px; /* 버튼 내부 여백 */
  background-color: #fcfcfc; /* 버튼 색상 */
  color: black; /* 버튼 텍스트 색상 */
  border: 1px solid rgb(168, 168, 168); /* 테두리 제거 */
  border-radius: 5px; /* 둥글게 */
  cursor: pointer; /* 마우스 포인터 변경 */
  font-size: 18px; /* 버튼 텍스트 크기 */
  width: 300px;
}

.confirm-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #6981d9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  width: 300px;
}

.confirm-button:hover {
  background-color: #45a049;
}
</style>
