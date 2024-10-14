<template>
  <div class="main-container">
    <Header />
  </div>
</template>

<script>
import apiClient from '../../api/axios.js';
import FooterNav from '../../components/FooterNav.vue';
import Header from '../../components/Header.vue';
import QrcodeVue from 'qrcode.vue';
export default {
  name: 'BusinessCard',
  components: {
    FooterNav,
    Header,
    QrcodeVue,
  }
}
</script>

<style>
</style>