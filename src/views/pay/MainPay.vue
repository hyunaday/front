<template>
  <div>
    <h2>대표 결제</h2>
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <button @click="selectMembers">팀원 선택하기</button>
    <button @click="selectGame">게임 선택하기</button>
    <button @click="confirmPayment">결제하기</button>
    <p v-if="paymentResult">{{ paymentResult }}</p>
  </div>
</template>

<script>
export default {
  name: 'MainPay',
  data() {
    return {
      decodedData: '',
      errorMessage: '',
      paymentResult: '',
    };
  },
  methods: {
    onDecode(data) {
      this.decodedData = data;
      this.errorMessage = '';
    },
    onInit(success, error) {
      if (error) {
        this.errorMessage = '카메라 접근 실패';
      }
    },
    selectMembers() {
      // 팀원 선택 로직 구현
    },
    selectGame() {
      // 게임 선택 로직 구현
    },
    async confirmPayment() {
      // 결제 로직 구현
      this.paymentResult = '결제가 성공했습니다!';
    },
  },
};
</script>
