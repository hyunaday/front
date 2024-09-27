<template>
  <div>
    <h2>팀원 결제</h2>
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <button @click="confirmPayment">결제하기</button>
    <p v-if="paymentResult">{{ paymentResult }}</p>
  </div>
</template>

<script>
export default {
  name: 'MemberPay',
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
    async confirmPayment() {
      // 결제 로직 구현
      this.paymentResult = '결제가 성공했습니다!';
    },
  },
};
</script>
