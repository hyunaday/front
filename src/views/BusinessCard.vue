<template>
  <div class="main-container">
    <!-- 선택된 명함 표시 -->
    <div class="selected-card">
      <!-- 네임택 -->
      <div class="name-tag">
        <span>나의 명함</span>
      </div>
      <div class="card">
        <!-- 명함 이미지 -->
        <img src="https://via.placeholder.com/300x150" alt="명함 이미지" />
        <div class="card-details">
          <p><strong>이름:</strong> {{ selectedCard.name }}</p>
          <p><strong>연락처:</strong> {{ selectedCard.phone }}</p>
          <p><strong>이메일:</strong> {{ selectedCard.email }}</p>
          <p><strong>주소:</strong> {{ selectedCard.address }}</p>
          <p><strong>메모:</strong> {{ selectedCard.memo }}</p>
        </div>
        <!-- QR 코드 이미지 -->
        <img src="https://via.placeholder.com/70" alt="QR 코드" />
      </div>
    </div>

    <!-- 네임택 -->
    <div class="name-tag-sec">
      <span>명함목록</span>
    </div>
    <!-- 명함 목록 -->
    <div class="card-list">
      <div
        v-for="card in cardList"
        :key="card.id"
        class="card-item"
        @click="selectCard(card)"
      >
        <p>{{ card.name }}</p>
        <p>{{ card.position }}</p>
        <p>{{ card.company }}</p>
      </div>
    </div>

    <div class="divider"></div>

    <!-- 네비게이션 바 -->
    <div class="navbar">
      <router-link to="/" class="nav-item" exact-active-class="active">
        <i class="fas fa-home"></i>
        <span>홈</span>
      </router-link>

      <router-link to="/myassets" class="nav-item" exact-active-class="active">
        <i class="fas fa-wallet"></i>
        <span>내 자산</span>
      </router-link>

      <!-- 수기 작성 페이지로 이동 -->
      <router-link
        to="/businesscardlist"
        class="pay-btn"
        exact-active-class="active"
      >
        <i class="fa-solid fa-plus"></i>
        <span></span>
      </router-link>

      <router-link
        to="/accountbook"
        class="nav-item"
        exact-active-class="active"
      >
        <i class="fas fa-book"></i>
        <span>가계부</span>
      </router-link>

      <router-link
        to="/businesscard"
        class="nav-item"
        exact-active-class="active"
      >
        <i class="fas fa-id-card"></i>
        <span>전자 명함</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessCard',
  data() {
    return {
      selectedCard: {
        name: 'John Smith',
        phone: '010-2315-6941',
        email: 'email@gmail.com',
        address: '서울 광진구 능동로 195-16 6층',
        memo: '',
      },
      cardList: [
        {
          id: 1,
          name: 'Alice Johnson',
          position: 'Developer',
          company: 'Tech Corp',
        },
        {
          id: 2,
          name: 'Bob Lee',
          position: 'Designer',
          company: 'Creative Agency',
        },
        {
          id: 3,
          name: 'Charlie Kim',
          position: 'Project Manager',
          company: 'Business Solutions',
        },
        {
          id: 4,
          name: 'David Park',
          position: 'Marketing Specialist',
          company: 'Marketing Group',
        },
      ],
    };
  },
  methods: {
    selectCard(card) {
      this.selectedCard = card;
    },
    addNewCard() {
      // 새로운 명함 추가하는 페이지로 이동
      this.$router.push('/add-card');
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

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
  top: 455px; /* 서류에서 튀어나온 듯한 느낌 */
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

.card-details {
  flex: 1;
  margin-top: 10px;
  margin-left: -70px;
  font-size: 13px;
  line-height: 0.6; /* 줄 간격을 줄여줌 */
}

/* 명함 목록 스타일 */
.card-list {
  background-color: #efeded; /* 기존 배경색을 사용 */
  padding: 20px;
  border-radius: 10px;
  width: 350px; /* 명함 목록의 너비 조정 */
  height: 350px;
  margin-top: 28px;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
}

.card-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.card-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

/* 네비게이션 바 스타일 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: white;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  max-width: 360px;
  width: 100%;
}

/* 네비게이션 아이템 스타일 */
.navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #555;
  flex: 1;
}

/* 네비게이션 아이템 아이콘 스타일 */
.navbar .nav-item i {
  font-size: 24px;
  margin-bottom: 5px;
}

/* 결제 버튼 스타일 */
.pay-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 65px;
  height: 65px;
  background-color: #7189ff;
  border-radius: 50%;
  color: white;
  font-size: 50px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 활성화된 네비게이션 아이템 스타일 */
.navbar .nav-item.active {
  color: #7189ff;
  font-weight: bold;
}

.navbar .nav-item.active i {
  color: #7189ff; /* 아이콘 색상 변경 */
}

/* 내 자산과 가계부 사이의 간격 조정을 위해 flex-grow 사용 */
.nav-item:nth-child(4) {
  flex-grow: 1.7;
}

.nav-item:nth-child(2) {
  flex-grow: 1.7;
}
</style>
