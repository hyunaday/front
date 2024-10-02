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
        <span style="color: #6981d9; margin-left: auto">{{
          paymentAmount.toLocaleString()
        }}</span
        >원
      </h4>

      <div class="payment-details">
        <div
          v-for="(item, index) in paymentItems"
          :key="index"
          :class="['payment-item', { selected: item.selected }]"
        >
          <label class="item-label">
            <input
              type="checkbox"
              v-model="item.selected"
              @change="updateSelectedAmount(item)"
              class="checkbox"
            />
            <div class="item-content">
              <img :src="item.image" alt="메뉴 이미지" class="item-image" />
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-price"
                  >{{ item.price.toLocaleString() }}원</span
                >
              </div>
            </div>
          </label>
        </div>
      </div>

      <hr class="divider" />
      <h4 class="payment-secamount">
        <span class="total-label">총&nbsp;</span>
        <span style="color: #6981d9">{{
          selectedPaymentAmount.toLocaleString()
        }}</span
        >원
      </h4>
      <button @click="saveSelections" class="split-button">선택완료</button>

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
      participantCount: 5,
      paymentItems: [
        {
          name: '정크버거 세트',
          price: 12000,
          image: hamburgerImage,
          selected: false,
        },
        {
          name: '스파이시 치킨 버거',
          price: 9900,
          image: hamburgerImage,
          selected: false,
        },
        {
          name: '타워 버거 세트',
          price: 20000,
          image: hamburgerImage,
          selected: false,
        },
        {
          name: '정크버거',
          price: 8200,
          image: hamburgerImage,
          selected: false,
        },
        {
          name: '텟지버거 3개',
          price: 27000,
          image: hamburgerImage,
          selected: false,
        },
        {
          name: '제로 콜라 5개',
          price: 10000,
          image: sodaImage,
          selected: false,
        },
      ],
      selectedPaymentAmount: 0,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    saveSelections() {
      // 선택된 메뉴 항목을 로컬 스토리지에 저장
      const selectedItems = this.paymentItems.filter((item) => item.selected);
      localStorage.setItem(
        'selectedPaymentItems',
        JSON.stringify(selectedItems)
      );
      this.$router.push('/menucheck'); // MenuCheck.vue로 이동
    },
    updateSelectedAmount(item) {
      // 가격을 업데이트하는 메서드
      if (item.selected) {
        this.selectedPaymentAmount += item.price;
      } else {
        this.selectedPaymentAmount -= item.price;
      }
    },
  },
};
</script>

<style scoped>
/* 스타일은 그대로 유지 */
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

.payment-amount {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;
}

.payment-secamount {
  display: flex;
  margin-left: auto;
  font-size: 23px;
}
</style>
