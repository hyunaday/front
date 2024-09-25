<template>
  <div class="main-container">
    <!-- 선택된 명함 표시 -->
    <div class="selected-card">
      <div class="name-tag">
        <span>나의 명함</span>
      </div>
      <div class="card">
        <img src="https://via.placeholder.com/300x150" alt="명함 이미지" />
        <div class="card-details-container">
          <div class="card-details">
            <p><strong>이름:</strong> {{ selectedCard.name }}</p>
            <p><strong>연락처:</strong> {{ selectedCard.phone }}</p>
            <p><strong>이메일:</strong> {{ selectedCard.email }}</p>
            <p><strong>주소:</strong> {{ selectedCard.address }}</p>
            <div class="memo-container">
              <strong>메모:</strong>
              <textarea v-model="selectedCard.memo" class="memo-textarea"></textarea>
            </div>
          </div>
          <qrcode-vue :value="qrValue" :size="60" class="qr-code" />
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
    <FooterNav :buttonType="'plus'" :buttonAction="goToBusinessCardList" />
  </div>
</template>

<script>
import FooterNav from '../components/FooterNav.vue'; // 경로를 올바르게 수정
import QrcodeVue from 'qrcode.vue'; // QR 코드 라이브러리 임포트

export default {
  name: 'BusinessCard',
  components: {
    FooterNav, // FooterNav 컴포넌트 등록
    QrcodeVue, // QR 코드 컴포넌트 등록
  },
  data() {
    return {
      selectedCard: {
        name: 'John Smith',
        phone: '010-2315-6941',
        email: 'email@gmail.com',
        address: '서울 광진구 능동로 195-16 6층 ',
        memo: '',
      },
      cardList: [
        {
          id: 1,
          name: 'Alice Johnson',
          position: 'Developer',
          department: 'Engineering',
          company: 'Tech Corp',
          imageUrl: 'https://via.placeholder.com/100x50', // 이미지 URL
        },
        {
          id: 2,
          name: 'Bob Lee',
          position: 'Designer',
          department: 'Creative',
          company: 'Creative Agency',
          imageUrl: 'https://via.placeholder.com/100x50', // 이미지 URL
        },
        {
          id: 3,
          name: 'Charlie Kim',
          position: 'Project Manager',
          department: 'Operations',
          company: 'Business Solutions',
          imageUrl: 'https://via.placeholder.com/100x50', // 이미지 URL
        },
        {
          id: 4,
          name: 'David Park',
          position: 'Marketing Specialist',
          department: 'Marketing',
          company: 'Marketing Group',
          imageUrl: 'https://via.placeholder.com/100x50', // 이미지 URL
        },
      ],
    };
  },
  computed: {
    qrValue() {
      // QR 코드에 사용할 문자열을 생성
      return `
        이름: ${this.selectedCard.name}
        연락처: ${this.selectedCard.phone}
        이메일: ${this.selectedCard.email}
        주소: ${this.selectedCard.address}
        메모: ${this.selectedCard.memo}
      `.trim();
    },
  },
  methods: {
    selectCard(card) {
      this.selectedCard = card;
    },
    goToBusinessCardList() {
      // 명함 목록 페이지로 이동
      this.$router.push('/businesscardlist');
    },
  },
};
</script>

<style scoped>
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
  display: flex;
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
  padding-right: 70px; /* QR 코드 공간 확보 */
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
  bottom: 85px; /* 아래에서 10px 떨어짐 */
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
