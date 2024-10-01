<template>
  <div class="main-container d-flex flex-column">
    <div class="form-container">
      <BusinessCardForm title="나의 명함 등록하기" />
    </div>
    <!-- FooterNav 컴포넌트 추가 -->
    <FooterNav />
  </div>
</template>

<script>
import BusinessCardForm from "../../components/BusinessCardForm.vue";
import FooterNav from "../../components/FooterNav.vue"; // FooterNav 컴포넌트 import

export default {
  components: {
    BusinessCardForm,
    FooterNav, // FooterNav 컴포넌트 등록
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: white;
  margin-bottom: 60px;
}

.form-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 40px;
  padding: 0 10px; /* 좌우 여백 줄임 */
  /* overflow-y: auto; */
  max-height: calc(100vh - 80px);
}

input,
textarea {
  width: 100%; /* 필드가 최대 폭을 차지하도록 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-bottom: 10px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: white;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  max-width: 360px;
  width: 100%;
}

.navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #555;
  flex: 1;
}

.navbar .nav-item i {
  font-size: 24px;
  margin-bottom: 5px;
}
</style>
