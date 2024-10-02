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
          결제 할 항목을 <br />
          <span style="color: #6981d9">확인</span>해주세요
        </p>
        <img
          src="../../assets/images/profile1.png"
          alt="프로필 아이콘"
          class="profile-icon"
        />
      </div>

      <hr class="divider" />

      <div class="payment-details">
        <div
          v-for="(item, index) in paymentItems"
          :key="index"
          class="payment-item"
          @click="toggleSelection(item)"
        >
          <div class="item-content">
            <img :src="item.image" alt="아이템 이미지" class="item-image" />
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price"
                >{{ item.price.toLocaleString() }} 원</span
              >
            </div>
            <input type="checkbox" class="checkbox" v-model="item.selected" />
          </div>
        </div>
      </div>
      <hr class="divider" />

      <h4 class="payment-secamount">
        <span class="total-label">총&nbsp;</span>
        <span style="color: #6981d9">
          {{ selectedPaymentAmount.toLocaleString() }}
        </span>
        원
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
      merchantName: 'KFC 군자능동점',
      paymentItems: [], // 로컬 스토리지에서 가져올 결제 항목
      selectedPaymentAmount: 0,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    splitByAmount() {
      this.$router.push('/solopay');
    },
    toggleSelection(item) {
      item.selected = !item.selected;
      this.updateSelectedAmount(); // 선택 상태 변경 후 금액 업데이트 호출
      this.saveSelectedItemsToLocalStorage(); // 로컬 스토리지에 저장
    },
    updateSelectedAmount() {
      // 선택된 항목의 금액을 업데이트합니다.
      this.selectedPaymentAmount = this.paymentItems
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.price, 0);
    },
    saveSelectedItemsToLocalStorage() {
      // 선택된 항목들을 로컬 스토리지에 저장합니다.
      const selectedItems = this.paymentItems.filter((item) => item.selected);
      localStorage.setItem(
        'selectedPaymentItems',
        JSON.stringify(selectedItems)
      );
    },
  },

  mounted() {
    // 로컬 스토리지에서 결제 항목을 불러옵니다.
    const storedItems = JSON.parse(
      localStorage.getItem('selectedPaymentItems')
    );
    if (storedItems && storedItems.length > 0) {
      this.paymentItems = storedItems; // 로컬 스토리지에서 가져온 항목으로 설정
    }

    // 초기 선택된 항목의 금액을 계산합니다.
    this.updateSelectedAmount();
  },
};
</script>

<style scoped>
/* 스타일은 변경 없이 유지 */
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  overflow: hidden;
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
  display: flex;
  align-items: center;
  text-align: left;
  margin-top: 50px;
  margin-left: -10px;
  margin-bottom: -25px;
}

.profile-icon {
  width: 60px;
  height: 60px;
  margin-left: 80px;
  margin-right: 0px;
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
  padding: 0 10px;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 0px;
}

.payment-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
  transition: background-color 0.3s;
  width: 100%;
}

.payment-item.selected {
  background-color: #f0f0f0;
}

.item-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.checkbox {
  display: none;
}

.item-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.item-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  white-space: normal;
  flex-grow: 1;
}

.item-name {
  font-size: 13px;
  color: #989898;
}

.item-price {
  font-size: 18px;
  color: #333;
  margin-top: 5px;
}

.payment-amount {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 10px;
}

.total-label {
  color: #777;
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
  background-color: #6981d9;
  color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.spacer {
  flex-grow: 1;
}

.payment-secamount {
  display: flex;
  margin-left: auto;
  font-size: 23px;
}
</style>
