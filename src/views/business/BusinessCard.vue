<template>
  <div class="main-container">
    <!-- 선택된 명함 표시 -->
    <div class="selected-card">
      <div class="name-tag">
        <span>나의 명함</span>
      </div>
      <div class="card">
        <!-- preview-box 안에 실시간으로 formData 내용을 반영 -->
        <div class="preview-box">
          <h3>{{ formData.company }}</h3>
          <p>{{ formData.address }}</p>
          <p>{{ formData.name }}</p>
          <p>{{ formData.position }}</p>
          <p>{{ formData.department }}</p>
          <p>{{ formData.phone }}</p>
          <p>{{ formData.phoneLandline }}</p>
          <p>{{ formData.email }}</p>
        </div>

        <div class="card-details-container">
          <div class="card-details">
            <p><strong>이름:</strong> {{ formData.name }}</p>
            <p><strong>연락처:</strong> {{ formData.phone }}</p>
            <p><strong>이메일:</strong> {{ formData.email }}</p>
            <p><strong>주소:</strong> {{ formData.address }}</p>
          </div>
          <qrcode-vue
            :value="qrValue"
            :size="60"
            class="qr-code"
            @click="showModal = true"
          />
        </div>
      </div>
    </div>

    <div class="name-tag-sec">
      <span>명함목록</span>
    </div>
    <div class="card-list">
      <div
        v-for="card in cardList"
        :key="card.id"
        class="card-item"
        @click="selectCard(card)"
      >
        <div class="card-content">
          <div class="card-text">
            <p>
              <strong>{{ card.name }}</strong>
            </p>
            <p>{{ card.position }} / {{ card.department }}</p>
            <p>{{ card.company }}</p>
          </div>
          <div class="card-image">
            <img :src="card.imageUrl" alt="명함 이미지" />
          </div>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <!-- FooterNav 컴포넌트 사용 -->
    <FooterNav :buttonType="'plus'" :buttonAction="goToaddBusinessCard" />
    <!-- QR 코드 모달 -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <!-- 추가된 텍스트 -->
        <!-- QR 코드 감싸는 추가 div -->
        <div class="qr-code-container">
          <qrcode-vue :value="qrValue" :size="200" />
        </div>
        <!-- 확대된 QR 코드 -->
      </div>
      <p class="additional-text">QR코드를 스캔하세요</p>
    </div>
  </div>
</template>

<script>
import FooterNav from "../../components/FooterNav.vue"; // 경로를 올바르게 수정
import QrcodeVue from "qrcode.vue"; // QR 코드 라이브러리 임포트

export default {
  name: "BusinessCard",
  components: {
    FooterNav, // FooterNav 컴포넌트 등록
    QrcodeVue, // QR 코드 컴포넌트 등록
  },
  data() {
    return {
      formData: {
        name: "John Smith",
        phone: "010-2315-6941",
        email: "email@gmail.com",
        position: "Developer",
        department: "Engineering",
        company: "Tech Corp",
        address: "서울 광진구 능동로 195-16 6층",
        phoneLandline: "02-1234-5678",
        memo: "",
      },
      cardList: [
        {
          id: 1,
          name: "Alice Johnson",
          position: "Developer",
          department: "Engineering",
          company: "Tech Corp",
          imageUrl: "https://via.placeholder.com/100x50", // 이미지 URL
        },
        {
          id: 2,
          name: "Bob Lee",
          position: "Designer",
          department: "Creative",
          company: "Creative Agency",
          imageUrl: "https://via.placeholder.com/100x50", // 이미지 URL
        },
        {
          id: 3,
          name: "Charlie Kim",
          position: "Project Manager",
          department: "Operations",
          company: "Business Solutions",
          imageUrl: "https://via.placeholder.com/100x50", // 이미지 URL
        },
        {
          id: 4,
          name: "David Park",
          position: "Marketing Specialist",
          department: "Marketing",
          company: "Marketing Group",
          imageUrl: "https://via.placeholder.com/100x50", // 이미지 URL
        },
      ],
      showModal: false, // 모달 표시 상태
    };
  },
  computed: {
    qrValue() {
      // QR 코드에 사용할 문자열을 생성
      return `
      이름: ${this.formData?.name || "이름 없음"}
      연락처: ${this.formData?.phone || "연락처 없음"}
      이메일: ${this.formData?.email || "이메일 없음"}
      주소: ${this.formData?.address || "주소 없음"}
      메모: ${this.formData?.memo || ""}
    `.trim();
    },
  },
  methods: {
    selectCard(card) {
      this.formData = { ...card }; // 선택한 카드를 formData에 복사
    },
    goToaddBusinessCard() {
      // '/addbusinesscard' 페이지로 라우팅
      this.$router.push("/addbusinesscard");
    },
    closeModal() {
      this.showModal = false; // 모달 닫기
    },
  },
};
</script>

<style scoped>
/* 내 명함 */
.preview-box {
  text-align: center; /* 가운데 정렬 */
  padding: 8px 20px; /* 내부 패딩 */
  height: 150px;
  width: 300px; /* 고정된 너비 */
  background-color: white;
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
  content: "Position: "; /* 직책 앞에 텍스트 추가 */
}

.preview-box p:nth-child(5)::before {
  content: "Dept: "; /* 부서 앞에 텍스트 추가 */
}

.preview-box p:nth-child(6)::before {
  content: "H.P: "; /* 전화번호 앞에 텍스트 추가 */
}

.preview-box p:nth-child(7)::before {
  content: "TEL: "; /* 유선전화번호 앞에 텍스트 추가 */
}

.preview-box p:nth-child(8)::before {
}

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
  width: 242px;
  max-height: 90%;
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

.card-image {
  min-width: 80px; /* 이미지가 고정된 너비를 가지도록 설정 */
  margin-left: 10px; /* 이미지와 텍스트 간격 확보 */
}

.card-image img {
  width: 80px;
  height: 40px;
  object-fit: cover; /* 이미지 비율 유지 */
  border-radius: 5px;
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
  background-color: #efeded;
  padding: 20px;
  margin-top: 38px;
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 서류 모양의 그림자 */
  position: relative;
  border: 1px solid #ffffff; /* 서류 경계선 */
  width: 350px; /* 카드 너비 */
}

/* 네임택 스타일 */
.name-tag {
  position: absolute;
  top: -20px; /* 서류에서 튀어나온 듯한 느낌 */
  left: 1px;
  background-color: #efeded; /* 네임택 색상 */
  padding: 5px 15px;
  border-radius: 5px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 14px;
}
/* 명함목록 네임택 */
.name-tag-sec {
  position: absolute;
  top: 410px; /* 서류에서 튀어나온 듯한 느낌 */
  left: 5px;
  background-color: #efeded; /* 네임택 색상 */
  padding: 5px 15px;
  border-radius: 5px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 14px;
  z-index: 0;
}

/* 명함 내용 스타일 */
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #efeded;
  z-index: 2;
}

card-details-container {
  display: flex;
  align-items: flex-start;
  max-width: 100%;
  overflow: hidden;
  position: relative; /* 상대적 위치 설정 */
  min-height: 150px; /* 컨테이너의 최소 높이 설정 */
}

.card-details {
  flex: 1;
  margin-top: 10px;
  margin-left: 0;
  font-size: 13px;
  line-height: 1.2;
  overflow-y: overlay; /* auto에서 overlay로 변경 */
  max-height: 150px;
  padding-right: 150px; /* QR 코드 공간 확보 */
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

/* QR 코드 스타일 수정 */
.qr-code {
  position: absolute; /* 절대 위치 설정 */
  right: 15px; /* 오른쪽에서 10px 떨어짐 */
  bottom: 70px; /* 아래에서 10px 떨어짐 */
  width: 60px; /* QR 코드의 너비 설정 */
  height: 60px; /* QR 코드의 높이 설정 */
}

/* 명함 목록 스타일 */
.card-list {
  background-color: #efeded; /* 기존 배경색을 사용 */
  padding: 20px;
  border-radius: 10px;
  width: 350px; /* 명함 목록의 너비 조정 */
  height: 350px;
  margin-top: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
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
  background-color: #efeded; /* 배경색 설정 */
  border: none; /* 테두리 제거 */
  padding: 5px; /* 내부 여백 추가 */
  width: 170px; /* textarea가 남은 공간을 모두 차지하도록 설정 */
  resize: none; /* 크기 조절 불가 */
  height: 60px; /* 기본 높이 설정 */
  font-size: 13px; /* 글꼴 크기 설정 */
  font-family: inherit; /* 부모 요소의 폰트 상속 */
}
</style>
