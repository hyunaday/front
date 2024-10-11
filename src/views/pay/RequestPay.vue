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
          <span class="amount">{{ priceStore.totalPrice.toLocaleString() }}</span>원
        </h4>
        <p class="payment-question">결제 하시겠습니까?</p>
      </div>

      <hr class="divider" />

      <div class="payment-details">
        <div
          class="payer-info"
          v-for="(member, index) in priceStore.memberList"
          :key="member.memberIdx"
        >
          <div class="profile-section">
            <div class="profile-icon">
              <img :src="getProfileIcon(index)" alt="Profile Icon" />
            </div>
            <div class="payer-name">{{ maskedPayerName(member.memberName) }}</div>
          </div>

          <div class="requested-amount">
            <input
              type="number"
              v-model.number="priceStore.memberList[index].price"
              @input="validateAmount"
              placeholder="수정할 금액을 입력하세요"
              class="amount-input"
            />
            <span>원</span>
          </div>
        </div>
      </div>

      <button
        @click="handleSplitByAmount"
        class="split-button"
        :disabled="!isAmountValid"
      >
        결제 요청하기
      </button>

      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { usePriceStore } from '../../stores/orderStore.js';
import { useSocketStore } from '../../stores/socketStore.js'; // 소켓 스토어 가져오기
import { useRouter } from 'vue-router'; // router 가져오기
import { useMemberStore } from '../../stores/memberStore.js';
import { usePayPriceInfoStore } from '../../stores/orderStore.js';
import profileIcon1 from '../../assets/images/profile1.png';
import profileIcon2 from '../../assets/images/profile2.png';
import profileIcon3 from '../../assets/images/profile3.png';
import profileIcon4 from '../../assets/images/profile4.png';
import profileIcon5 from '../../assets/images/profile5.png';

export default {
  setup() {
    const priceStore = usePriceStore(); // store 인스턴스 가져오기
    const socketStore = useSocketStore(); // 소켓 스토어 가져오기
    const router = useRouter(); // router 가져오기
    const isAmountValid = ref(true);
    const memberStore = useMemberStore();
    const payPriceInfoStore = usePayPriceInfoStore();

    const getProfileIcon = (index) => {
      const profileIcons = [
        profileIcon1,
        profileIcon2,
        profileIcon3,
        profileIcon4,
        profileIcon5,
      ];
      return profileIcons[index];
    };

    const validateAmount = () => {
      const totalRequestedAmount = priceStore.getTotalPrice();
      isAmountValid.value = totalRequestedAmount === priceStore.totalPrice;
    };

    const handleSplitByAmount = () => {
      if (!isAmountValid.value) {
        showErrorMessage('결제 금액이 맞지 않습니다. 다시 확인해주세요');
        return;
      }

      // 요청 보내기 로직
      const payload = {
        orderIdx: priceStore.orderIdx,
        memberId: memberStore.memberId,
        totalPrice: priceStore.totalPrice,
        memberCnt: priceStore.memberList.length,
        memberPriceInfoList: priceStore.memberList.map((member) => ({
          memberIdx: member.memberIdx,
          price: member.price,
        })),
      };

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'content-type': 'application/json',
        'MemberId': memberStore.memberId,
      };

      // WebSocket을 통해 전송
      try {
        socketStore.stompClient.send(
          '/pub/order/room/price',  // 목적지
          headers,                  // 헤더
          JSON.stringify(payload)   // 페이로드
        );
        console.log('결제 요청 보내기:', payload);
      } catch (error) {
        console.error('결제 요청 전송 실패:', error);
      }
    };

    const maskedPayerName = (name) => {
      if (name.length > 1) {
        return name.charAt(0) + '*' + name.charAt(name.length - 1);
      }
      return name;
    };

    const goBack = () => {
      this.$router.go(-1);
    };

    // 소켓 메시지 감시
    watch(
      () => socketStore.messages,
      (newMessages) => {
        const lastMessage = newMessages[newMessages.length - 1];
        if (!lastMessage) return; // 메시지가 없으면 처리하지 않음

        try {
          const parsedMessage = JSON.parse(lastMessage);
          
          // 응답이 "PRICE_SELECT" 타입일 때 라우터 푸시
          if (parsedMessage.type === 'PRICE_SELECT') {
            console.log('PRICE_SELECT 메시지 도착:', parsedMessage);

            // 필요한 데이터 priceStore에 업데이트
            payPriceInfoStore.setPayPriceInfo(parsedMessage, memberStore.idx);

            // 페이지 이동
            router.push('/solopay');
          }
        } catch (error) {
          console.error('메시지 파싱 실패:', error);
        }
      },
      { deep: true }
    );

    return {
      priceStore,
      getProfileIcon,
      validateAmount,
      handleSplitByAmount,
      maskedPayerName,
      goBack,
      isAmountValid,
    };
  },
};
</script>

<style scoped>
.amount-input {
  width: 100px;
  padding: 5px;
  margin-right: 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  outline: none;
}
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
  text-align: right;
  margin-top: 80px;
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
  margin: 10px 0;
}
.payment-details {
  width: 100%;
  padding: 0 10px;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 5px;
}
.payer-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.profile-icon {
  width: 35px;
  height: 35px;
  margin-bottom: 5px;
}

.profile-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.payer-name {
  font-size: 15px;
  font-weight: bold;
  color: #555;
  text-align: center;
}

.requested-amount {
  display: flex;
  align-items: center;
}

.split-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: white;
  color: black;
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
.amount {
  color: #6981d9;
}
</style>
