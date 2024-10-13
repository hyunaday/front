<template>
  <div class="main-container">
    
    <h3>추가할 명함을 선택해주세요.</h3>

    <div class="button-container">
      <!-- '나의 명함' 버튼, 나의 명함 등록 페이지로 이동 -->
      <router-link to="/my-card-registration">
        <button class="button1">
          <img src="../../assets/images/me.png" alt="나의 명함" class="button-icon" />
          <span1>나의 명함 <br/>등록하기</span1>
        </button>
      </router-link>

      <!-- '친구 명함' 버튼, 모달을 열어 QR 스캐너를 보여줌 -->
      <button class="button2" @click="showModal = true">
        <img src="../../assets/images/you.png" alt="친구 명함" class="button-icon" />
        <span2>친구 명함 <br/>등록하기</span2>
      </button>
    </div>

    <div class="divider"></div>

    <!-- 모달 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <!-- BqrScanner 컴포넌트에서 스캔된 데이터 받기 -->
        <BqrScanner @close="closeModal" @scanned="handleScannedData" />
      </div>
    </div>

    <!-- 모달이 열리지 않았을 때만 FooterNav 표시 -->
    <FooterNav
      v-if="!showModal"
      :buttonType="'plus'"
      :buttonAction="goToAddList"
    />

    <!-- QR 코드 스캔 결과 출력 -->
    <div v-if="scannedData">
      <h4>스캔된 정보:</h4>
      <p>{{ scannedData }}</p>
    </div>
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';
import BqrScanner from '../../components/BqrScanner.vue'; 
import apiClient from '../../api/axios'; 

export default {
  name: 'AddBusinessCard',
  components: {
    FooterNav,
    BqrScanner,
  },
  data() {
    return {
      showModal: false,
      scannedData: null,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    async handleScannedData(data) {
      this.scannedData = data;

      const businessCardIdx = this.extractBusinessCardIdx(data);
      if (businessCardIdx) {
        try {
          const response = await apiClient.post(`/businessCard/scanFriendQrCode?businessCardIdx=${businessCardIdx}`);
          console.log('QR 코드 스캔 성공:', response.data);
          const redirectUrl = `/friend-card-registration/${businessCardIdx}`;
          window.location.href = redirectUrl;
        } catch (error) {
          console.error('QR 코드 스캔 실패:', error.response ? error.response.data : error);
        }
      } else {
        console.error('QR 코드에서 businessCardIdx를 찾을 수 없습니다.');
      }

      this.showModal = false;
    },
    extractBusinessCardIdx(data) {
      try {
        const url = new URL(data.url);
        const params = new URLSearchParams(url.search);
        return params.get('idx');
      } catch (error) {
        console.error('QR 코드 데이터에서 URL 파싱 실패:', error);
        return null;
      }
    },
  },
};
</script>

<style scoped>
span1 {
  color:#7189ff;
  font-weight: bold;
  font-size: large;
  text-decoration: none;
}

span2 {
  color:#f6f6f6;
  font-weight: bold;
  font-size: large;
}

h3 {
  margin-top: 130px;
  margin-bottom: 60px;
  margin-right: 50px;
  font-weight: bold;
  text-align: left;
  font-size: 20px;
}

.button-container {
  display: flex; /* Flexbox를 사용하여 가로 정렬 */
  justify-content: center; /* 중앙 정렬 */
  gap: 20px; /* 버튼 간의 간격 */
}

.button1 {
  padding: 15px;
  height: 200px;
  background-color: #f6f6f6;
  color: white;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 가운데 정렬 */
  /* transition: background-color 0.3s, color 0.3s; */
}
.button2 {
  padding: 15px;
  height: 200px;
  background-color: #7189ff;
  color: white;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 가운데 정렬 */
  /* transition: background-color 0.3s, color 0.3s; */
}

.button-icon {
  width: 100px; /* 이미지 너비 */
  height: 100px; /* 이미지 높이 */
  margin-bottom: 20px; /* 이미지와 텍스트 간격 */
}

/* .divider {
  width: 200px;
  height: 1px;
  background-color: #ccc;
  margin: 15px 0;
} */

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

.modal-content {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 95%;
  max-width: 400px;
}
</style>
