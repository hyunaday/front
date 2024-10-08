<template>
  <div class="main-container">
    <Header />

    <FooterNav :buttonType="'pay'" :buttonAction="goToGroupPayPage" />
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue';
import Header from '../../components/Header.vue';

export default {
  name: 'Transfer',
  components: {
    FooterNav,
    Header,
  },
}
</script>

<style scoped>
</style>