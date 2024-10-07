<template>
  <div>
    <div class="main-container d-flex flex-column">
      <div class="share-link-container">
        <div class="header">
          <button @click="goBack" class="back-button">
            <i class="fas fa-chevron-left"></i>
          </button>
          <h2 class="title">결제 초대하기</h2>
        </div>
        <!-- QR 코드 추가 -->
        <QRCode :value="shareableLink" :size="200" />
        <br />

        <h3>함께 결제를 위한 QR코드</h3>
        <br />
        <p style="text-align: center">
          함께 결제할 팀원들에게 해당 QR코드를<br />
          공유하거나 링크를 보내주세요!
        </p>
        <button @click="shareLink" class="share-button">링크 전송</button>

        <button @click="goToTargetPage" class="next-button">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode.vue'; // QR 코드 컴포넌트 import

export default {
  components: {
    QRCode, // QR 코드 컴포넌트 등록
  },
  data() {
    return {
      shareableLink: 'https://www.naver.com', // 실제 링크로 교체
    };
  },
  computed: {
    targetPage() {
      return this.$route.params.targetPage; // URL 파라미터에서 targetPage를 가져옴
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 이전 페이지로 돌아감
    },
    goToTargetPage() {
      // targetPage에 따라 이동할 페이지 결정
      if (this.targetPage === 'PaySplit') {
        this.$router.push({ name: 'PaySplit' }); // 'PaySplit' 페이지로 이동
      } else if (this.targetPage === 'PayMenu') {
        this.$router.push({ name: 'PayMenu' }); // 'PayMenu' 페이지로 이동
      } else {
        console.error('잘못된 targetPage:', this.targetPage); // 잘못된 targetPage에 대한 로그
      }
    },
    shareLink() {
      // 링크 공유 기능 구현
      navigator.clipboard
        .writeText(this.shareableLink)
        .then(() => {
          alert('링크가 클립보드에 복사되었습니다!');
        })
        .catch((err) => {
          console.error('링크 복사 실패:', err);
        });
    },
  },
};
</script>

<style scoped>
  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }
  
  * {
    font-family: "Pretendard", sans-serif;
  }
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  overflow: hidden; /* 전체 스크롤 숨김 */
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

.share-link-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50%;
}

.next-button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: white; /* 버튼 색상 */
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px; /* 버튼 너비 */
  font-size: 19px;
  /* 그림자 효과 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.next-button:hover {
  background-color: #6981d9; /* 마우스 오버 시 색상 변경 */
  color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 호버 시 더 강조된 그림자 */
}

.share-button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: white; /* 버튼 색상 */
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px; /* 버튼 너비 */
  font-size: 19px;
  /* 그림자 효과 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.share-button:hover {
  background-color: #6981d9; /* 마우스 오버 시 색상 변경 */
  color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 호버 시 더 강조된 그림자 */
}
</style>
