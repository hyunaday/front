<template>
  <div>
    <div class="main-container d-flex flex-column">
      <div class="header">
        <button @click="goBack" class="back-button">
          <i class="fas fa-chevron-left"></i>
        </button>
        <h2 class="title">결제확인</h2>
      </div>

      <div class="merchant-info">
        <p class="payment-question">
          결제 할 메뉴를 <br />
          <span style="color: #6981d9">선택</span>해주세요
        </p>
        <img
          src="../../assets/images/profile1.png"
          alt="프로필 아이콘"
          class="profile-icon"
        />
      </div>

      <hr class="divider" />

      <h4 class="payment-amount">
        <span class="total-label">총합</span>
        <span style="color: #6981d9">{{ paymentAmount.toLocaleString() }}</span
        >원
      </h4>

      <div class="payment-details">
        <div
          v-for="(item, index) in paymentItems"
          :key="index"
          class="payment-item"
        >
          <img :src="item.image" alt="메뉴 이미지" class="item-image" />
          <div class="item-info">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">{{ item.price.toLocaleString() }}원</span>
          </div>
        </div>
      </div>
      <hr class="divider" />
      <h4 class="payment-secamount">
        <span class="total-label">총</span>
        <span style="color: #6981d9">{{
          (paymentAmount / participantCount).toLocaleString()
        }}</span
        >원
      </h4>
      <button @click="splitByAmount" class="split-button">선택완료</button>

      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
import hamburgerImage from '../../assets/images/hamburger.png';
import sodaImage from '../../assets/images/soda.png';

export default {
  data() {
    return {
      paymentCardImage: '',
      merchantName: 'KFC 군자능동점',
      paymentAmount: 95600,
      participantCount: 5, // 참여자 수 추가
      paymentItems: [
        { name: '정크버거 세트', price: 12000, image: hamburgerImage },
        { name: '스파이시 치킨 버거', price: 9900, image: hamburgerImage },
        { name: '타워 버거 세트', price: 20000, image: hamburgerImage },
        { name: '정크버거', price: 8200, image: hamburgerImage },
        { name: '텟지버거 3개', price: 27000, image: hamburgerImage },
        { name: '제로 콜라 5개', price: 10000, image: sodaImage },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    splitByAmount() {
      this.$router.push('/requestpay'); // 결제 요청하기 클릭 시 RequestPay.vue로 이동
    },
    splitByMenu() {
      this.$router.push('/paymenu');
    },
  },
};
</script>

<style scoped>
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

.merchant-info {
  display: flex; /* 플렉스 박스를 사용하여 수평 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
  margin-top: 50px; /* 여백 추가 */
  margin-left: -10px;
  margin-bottom: -25px;
}

.profile-icon {
  width: 60px; /* 아이콘 크기 조정 */
  height: 60px; /* 아이콘 크기 조정 */
  margin-left: 80px; /* 아이콘을 오른쪽에 붙이기 위해 자동 여백 설정 */
  margin-right: 0px; /* 오른쪽 여백 제거 */
  margin-bottom: 20px;
}

.payment-question {
  font-size: 25px;
}

.divider {
  width: 100%;
  height: 2px;
  background-color: #ccc;
  margin: 10px 0;
}

.payment-details {
  width: 100%;
  padding: 0 10px; /* 좌우 여백 추가 */
  height: 300px; /* 고정 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 가능하도록 설정 */
  margin-bottom: 0px; /* 여백을 줄여서 split 버튼과의 거리 좁히기 */
}

.payment-item {
  display: flex;
  justify-content: space-between; /* 아이템 간격 조정 */
  align-items: center; /* 수직 정렬 */
  margin: 10px 0;
}

.item-image {
  width: 40px; /* 이미지 크기 조정 */
  height: 40px; /* 이미지 크기 조정 */
  margin-right: 10px; /* 이미지와 텍스트 간격 */
}

.item-info {
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  align-items: flex-end; /* 오른쪽 정렬 */
}

.item-name {
  font-size: 13px;
  color: #989898;
}

.item-price {
  font-size: 18px;
}

.split-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #c5c5c5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 20px;
}

.split-button:hover {
  background-color: #6981d9; /* 마우스 오버 시 색상 변경 */
  color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.spacer {
  flex-grow: 1; /* 스페이서 추가하여 공간 확보 */
}

.payment-amount {
  display: flex;
  justify-content: space-between; /* 양 끝에 붙이기 위해 변경 */
  width: 100%; /* 전체 너비 사용 */
  font-size: 18px;
}

.payment-secamount {
  display: flex;
  margin-left: auto; /* 오른쪽 벽에 붙이기 위해 추가 */
  font-size: 23px;
}

.total-label {
  margin-right: auto; /* 왼쪽 벽에 붙이기 위해 추가 */
}

.total-amount {
  margin-left: auto; /* 오른쪽 벽에 붙이기 위해 추가 */
}
</style>
