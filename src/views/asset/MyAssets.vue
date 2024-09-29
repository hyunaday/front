<template>
  <div
    class="main-container d-flex flex-column justify-content-center align-items-center"
  >
    <!-- FooterNav 컴포넌트 사용 -->
    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
</div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';

export default {
  name: 'MyAssets',
  components: {
    FooterNav,
  },
  methods: {
    goToGroupPayPage() {
      this.$router.push('/grouppay'); // 그룹 결제 페이지로 이동
    },
  },
};
</script>

<style scoped>

</style>
