<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <h3>추가할 명함을 선택해주세요.</h3>

    <!— '나의 명함' 버튼, 나의 명함 등록 페이지로 이동 —>
    <router-link to="/my-card-registration">
      <button class="button">나의 명함 등록하기</button>
    </router-link>

    <div class="divider"></div>

    <!— '친구 명함' 버튼, 모달을 열어 QR 스캐너를 보여줌 —>
    <button class="button" @click="showModal = true">친구 명함 등록하기</button>

    <!— 모달 —>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <!— BqrScanner 컴포넌트에서 스캔된 데이터 받기 —>
        <BqrScanner @close="closeModal" @scanned="handleScannedData" />
      </div>
    </div>

    <!— 모달이 열리지 않았을 때만 FooterNav 표시 —>
    <FooterNav
      v-if="!showModal"
      :buttonType="'plus'"
      :buttonAction="goToAddList"
    />
  
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';
import BqrScanner from '../../components/BqrScanner.vue'; // BqrScanner로 변경
import apiClient from '../../api/axios';

export default {
  name: 'AddBusinessCard',
  components: {
    FooterNav,
    BqrScanner, // BqrScanner로 변경
  },
  data() {
    return {
      showModal: false, // 모달 상태 관리
      scannedData: null, // 스캔된 QR 코드 데이터
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    async handleScannedData(data) {
      this.scannedData = data;

      // QR 코드 데이터에서 businessCardIdx 추출
      const businessCardIdx = this.extractBusinessCardIdx(data);

      if (businessCardIdx) {
        try {
          // apiClient를 사용해 POST 요청
          const response = await apiClient.post(
            `/businessCard/scanFriendQrCode?businessCardIdx=${businessCardIdx}`
          );
          console.log('QR 코드 스캔 성공:', response.data);

          // 성공 시 해당 URL로 리다이렉트
          const redirectUrl = `/friend-card-registration/${businessCardIdx}`; // 리다이렉트할 URL 경로 설정
          window.location.href = redirectUrl; // 해당 URL로 이동
        } catch (error) {
          console.error(
            'QR 코드 스캔 실패:',
            error.response ? error.response.data : error
          );
        }
      } else {
        console.error('QR 코드에서 businessCardIdx를 찾을 수 없습니다.');
      }

      this.showModal = false; // 모달 닫기
    },
    // QR 코드 데이터에서 businessCardIdx 추출하는 메서드
    extractBusinessCardIdx(data) {
      try {
        const url = new URL(data.url);
        const params = new URLSearchParams(url.search);
        return params.get('idx'); // idx 값을 반환
      } catch (error) {
        console.error('QR 코드 데이터에서 URL 파싱 실패:', error);
        return null;
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background-color: white;
  overflow-y: auto;
}

/* 제목 스타일 */
h3 {
  margin-top: -150px;
  margin-bottom: 60px;
  font-weight: bold;
  font-size: 20px;
}

/* 버튼 스타일 */
.button {
  width: 200px;
  padding: 15px;
  margin: 10px 0;
  background-color: #7189ff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

/* 구분선 스타일 */
.divider {
  width: 200px;
  height: 1px;
  background-color: #ccc;
  margin: 15px 0;
}

/* 모달 오버레이 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 모달 컨텐츠 스타일 */
.modal-content {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 95%;
  max-width: 400px;
}
</style>
