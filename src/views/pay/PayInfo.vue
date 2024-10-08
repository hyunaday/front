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
        <h3 class="merchant-name">{{ merchantName }} 에서</h3>
        <h4 class="payment-amount">
          총
          <span style="color: #6981d9">{{
            paymentAmount.toLocaleString()
          }}</span>
          원
        </h4>
        <p class="payment-question">
          <span style="color: #6981d9">어떻게</span> 결제할까요?
        </p>
      </div>

      <hr class="divider" />

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

      <button @click="goToShareLink('amount')" class="split-button">
        금액으로 나누기
      </button>
      <button @click="goToShareLink('menu')" class="split-button">
        메뉴별로 나누기
      </button>

      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
import { useNavigationStore } from '../../stores/navigation';
import hamburgerImage from '../../assets/images/hamburger.png';
import sodaImage from '../../assets/images/soda.png';

export default {
  data() {
    return {
      merchantName: 'KFC 군자능동점',
      paymentAmount: 95600,
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
    goToShareLink(type) {
      const navigationStore = useNavigationStore();
      // ShareLink 페이지로 이동하며 경로 저장
      if (type === 'amount') {
        navigationStore.setSelectedPage('PaySplit');
        navigationStore.setNavigationPath([
          '/sharelink',
          '/gamelist',
          '/paysplit',
        ]);
      } else if (type === 'menu') {
        navigationStore.setSelectedPage('PayMenu');
        navigationStore.setNavigationPath([
          '/sharelink',
          '/gamelist',
          '/paymenu',
        ]);
      }
      this.$router.push('/sharelink');
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
  text-align: right; /* 오른쪽 정렬 */
  margin-top: 80px; /* 여백 추가 */
  margin-right: -90px;
  margin-bottom: -25px;
}

.merchant-name {
  font-size: 25px;
}

.payment-amount {
  font-size: 25px;
  margin: 5px 0;
}

.payment-question {
  font-size: 25px;
}

.divider {
  width: 100%;
  height: 2px;
  background-color: #ccc;
  margin: 20px 0;
}

.payment-details {
  width: 100%;
  padding: 0 10px; /* 좌우 여백 추가 */
  height: 300px; /* 고정 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 가능하도록 설정 */
  margin-bottom: 5px; /* 여백을 줄여서 split 버튼과의 거리 좁히기 */
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
  margin-top: 15px;
  padding: 10px 20px;
  background-color: white; /* 버튼 색상 */
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px; /* 버튼 너비 */

  /* 그림자 효과 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* X축, Y축, 흐림 정도, 색상 */
}

.split-button:hover {
  background-color: #6981d9; /* 마우스 오버 시 색상 변경 */
  color: white;
  /* 호버 시 그림자 효과 증가 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 호버 시 더 강조된 그림자 */
}

.spacer {
  flex-grow: 1; /* 스페이서 추가하여 공간 확보 */
}
</style>
