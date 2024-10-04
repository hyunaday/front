<template>
  <div>
    <!-- 결제 UI -->
    <div id="payment-method"></div>
    <!-- 이용약관 UI -->
    <div id="agreement"></div>
    <!-- 결제하기 버튼 -->
    <button class="button" id="payment-button" @click="requestPayment" style="margin-top: 30px">결제하기</button>
  </div>
</template>

<script>
export default {
  name: "PaymentComponent",
  mounted() {
    this.initTossPayments();
  },
  methods: {
    async initTossPayments() {
      // ------ SDK 초기화 ------
      const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
      const tossPayments = TossPayments(clientKey);
      const customerKey = "fvOzPw9-mP98QqXkT0s9N"; // 주의: 이 값을 안전하게 관리하세요.
      const widgets = tossPayments.widgets({
        customerKey,
        brandpay: {
          redirectUrl: `${window.location.origin}/auth`,
        },
      });

      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount({
        currency: "KRW",
        value: 50000,
      });

      await Promise.all([
        // ------ 결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        // ------ 이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);
    },
    async requestPayment() {
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      const tossPayments = TossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"); // 동일한 clientKey 사용
      const customerKey = "fvOzPw9-mP98QqXkT0s9N"; // 주의: 이 값을 안전하게 관리하세요.
      const widgets = tossPayments.widgets({ customerKey });

      await widgets.requestPayment({
        orderId: "iiHdKIUTXWyoIImmVXcxh", // 고유 주문번호
        orderName: "토스 티셔츠 외 2건",
        successUrl: `${window.location.origin}/success`, // 결제 요청이 성공하면 리다이렉트되는 URL
        failUrl: `${window.location.origin}/fail`, // 결제 요청이 실패하면 리다이렉트되는 URL
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
      });
    },
  },
};
</script>

<style scoped>
.button {
  margin-top: 30px;
}
</style>
