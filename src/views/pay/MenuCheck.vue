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
          v-for="(item, index) in orderInfoStore.orderMenuList"
          :key="index"
          class="payment-item"
          :class="{ selected: item.selectedByUser }"
          @click="toggleSelection(item)"
        >
          <div class="item-content">
            <img :src="item.image || defaultImage" alt="아이템 이미지" class="item-image" />
            <div class="item-info">
              <span class="item-name">
                {{ item.menuName }} ({{ item.selectedCount || 0 }}명)
              </span>
              <span class="item-price">{{ (item.price * item.amount).toLocaleString() }} 원</span>
            </div>
          </div>
        </div>
      </div>
      <hr class="divider" />

      <h4 class="payment-secamount">
        <span class="total-label">총&nbsp;</span>
        <span style="color: #6981d9">{{ selectedPaymentAmount.toLocaleString() }}</span> 원
      </h4>
      <!-- 선택 완료 버튼 -->
      <button 
        @click="splitByAmount" 
        :class="['split-button', { 'ready': isReadySent, 'not-ready': !isReadySent }]">
        {{ isReadySent ? '선택 완료 취소' : '선택 완료' }}
      </button>

      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
import { useOrderInfoStore } from '../../stores/orderStore.js'; // Pinia store 사용
import { useSocketStore } from '../../stores/socketStore.js'; // Socket store 사용
import { useMemberStore } from '../../stores/MemberStore.js';
import { onMounted, ref, watch } from 'vue';
import hamburgerImage from '../../assets/images/hamburger.png'; // 이미지 샘플
import { useRouter } from 'vue-router'; // router 사용


export default {
  setup() {
    const orderInfoStore = useOrderInfoStore(); // Pinia store 인스턴스
    const socketStore = useSocketStore(); // Socket store 인스턴스
    const memberStore = useMemberStore();
    const selectedPaymentAmount = ref(0);
    const defaultImage = hamburgerImage; // 기본 이미지 (없을 경우)
    const router = useRouter(); // router 사용 선언
    const isReadySent = ref(false); // 선택 완료 상태를 추적하는 변수

    const initializeSelectedCount = () => {
      // 메뉴 리스트에 selectedCount와 selectedByUser를 초기화
      orderInfoStore.orderMenuList.forEach((item) => {
        if (!item.selectedCount) {
          item.selectedCount = 0;
        }
        // 내가 선택한 항목을 표시하는 필드 추가
        if (item.selectedByUser === undefined) {
          item.selectedByUser = false;
        }
      });
    };

    const toggleSelection = (item) => {
      if (!socketStore.stompClient || !socketStore.stompClient.connected) {
        console.error("STOMP 연결이 되어 있지 않습니다.");
        alert("소켓 연결 상태를 확인하세요.");
        return;
      }

      // 현재 선택 상태를 기억해둠 (rollback 용도)
      const wasSelected = item.selectedByUser;

      // 선택 상태를 즉시 토글하여 반영
      item.selectedByUser = !item.selectedByUser;

      const message = {
        orderIdx: orderInfoStore.orderIdx,
        menuIdx: item.menuIdx,
        memberId: memberStore.memberId,
        menuName: item.menuName,
        menuPrice: item.price,
        amount: item.amount,
      };

      const destination = item.selectedByUser
        ? '/pub/order/room/select' // 선택 시 전송
        : '/pub/order/room/cancel'; // 선택 해제 시 전송

      // 소켓을 통해 선택 또는 해제된 메뉴 정보를 서버로 전송
      try {
        socketStore.stompClient.send(
          destination,
          {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'MemberId': memberStore.memberId,
            'content-type': 'application/json',
          },
          JSON.stringify(message)
        );
      } catch (error) {
        console.error('메시지 전송 실패:', error);
        alert('메시지 전송 중 오류가 발생했습니다.');
      }


    };

    const updateSelectedAmount = (amount) => {
      // 선택된 항목 중에서 내가 선택한 항목의 금액을 업데이트
      selectedPaymentAmount.value += amount 
    };

    // 소켓 메시지에 따라 선택 인원 수를 업데이트하는 함수
    watch(
      () => socketStore.messages,
      (newMessages) => {
        const lastMessage = newMessages[newMessages.length - 1];
        if (!lastMessage) return; // 메시지가 없으면 처리하지 않음

        try {
          const parsedMessage = JSON.parse(lastMessage);

          // 메뉴 선택 처리
          if (parsedMessage.type === 'MENU_SELECT' || parsedMessage.type === 'MENU_CANCEL') {
            const menu = orderInfoStore.orderMenuList.find(item => item.menuIdx === parsedMessage.menuIdx);
            if (menu) {
              // 선택 인원 수 업데이트
              if (parsedMessage.type === 'MENU_SELECT') {
                menu.selectedCount = (menu.selectedCount || 0) + 1;
              } else if (parsedMessage.type === 'MENU_CANCEL') {
                if (menu.selectedCount > 0) {
                  menu.selectedCount -= 1;
                }
              }

              // 자신의 선택 상태 업데이트
              if (parsedMessage.memberIdx === memberStore.idx) {
                menu.selectedByUser = (parsedMessage.type === 'MENU_SELECT');
                console.log("dfd", menu.price);
                if (parsedMessage.type === 'MENU_SELECT') {
                  updateSelectedAmount(menu.price);
                } else {
                  updateSelectedAmount(menu.price * -1);
                }
              }
            }
          }

          // ERROR 메시지 처리: 선택 상태 롤백
          if (parsedMessage.type === 'ERROR') {
            console.log("ERROR:", parsedMessage);
            // ERROR가 발생했으므로, 롤백 처리 (선택 상태 복원)
            orderInfoStore.orderMenuList.forEach(item => {
              if (parsedMessage.memberIdx === memberStore.idx) {
                item.selectedByUser = false;
              }
            });
            if (parsedMessage.code === 'ORDER4014') {
              alert('더 이상 선택할 수 없는 메뉴입니다');
            }
              

          }

          // START_PAY 메시지가 도착하면 소켓 연결 해제 및 페이지 이동
          if (parsedMessage.type === 'START_PAY') {
            console.log('START_PAY 메시지 도착:', parsedMessage);
            socketStore.disconnect(); // 소켓 연결 해제
            router.push('/solopay'); // 결제 페이지로 이동
          }
        } catch (error) {
          console.error('메시지 파싱 실패:', error);
        }
      },
      { deep: true }
    );

    const splitByAmount = () => {
      const destination = isReadySent.value
        ? '/pub/order/room/ready/cancel'
        : '/pub/order/room/ready';

      const message = {
        memberId: memberStore.memberId,
        orderIdx: orderInfoStore.orderIdx,
      };

      try {
        socketStore.stompClient.send(
          destination,
          {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'MemberId': memberStore.memberId,
            'content-type': 'application/json',
          },
          JSON.stringify(message)
        );
        isReadySent.value = !isReadySent.value; // 상태 토글
        console.log(`isReadySent 상태:`, isReadySent.value); // 상태 확인
        console.log(`선택 완료 ${isReadySent.value ? '요청' : '취소'} 전송`);
      } catch (error) {
        console.error('READY 메시지 전송 실패:', error);
        alert('READY 요청을 전송하는 중 오류가 발생했습니다.');
      }
      watch(isReadySent, (newValue) => {
        console.log('isReadySent 상태 변경:', newValue);
      });
    };

    const goBack = () => {
      router.go(-1);
    };

    onMounted(() => {
      // API 호출로 주문 정보 가져오기
      orderInfoStore.getOrderInfo(1, 1); // orderIdx, marketIdx는 예시로 넣었으며 실제 값을 사용

      // selectedCount 및 selectedByUser 필드 초기화
      initializeSelectedCount();

      // 소켓 연결
      socketStore.connect();
    });

    return {
      orderInfoStore, // Pinia store 상태 사용
      selectedPaymentAmount,
      toggleSelection,
      splitByAmount,
      goBack,
      defaultImage,
      isReadySent
    };
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
  background-color: #f0f0f0; /* 선택된 항목에 대한 회색 배경 */
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
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px;
  font-size: 20px;
}

.split-button.ready {
  background-color: #6981d9;
  color: white;
}

.split-button.not-ready {
  background-color: #5670d9;
  color: white;
}

.split-button:hover {
  background-color: #c5c5c5;
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