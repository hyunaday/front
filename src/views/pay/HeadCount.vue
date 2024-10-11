<template>
    <div class="main-container d-flex flex-column justify-content-center align-items-center">
      <button @click="goBack" class="back-button">
        <i class="fas fa-chevron-left"></i>
      </button>
  
      <h3>
        결제할 <span style="color: #6981d9">인원</span>을 <br />
        입력해주세요
      </h3>
  
      <div>
        <label>인원</label>
        <input v-model.number="memberCount" class="textbox" type="number" />
      </div>
  
      <button @click="nextStep">다음</button>
    </div>
  </template>
  
  <script>
  import { useOrderStore } from '../../stores/orderStore';
  
  export default {
    name: 'HeadCount',
    data() {
      return {
        memberCount: 1, // 인원 수를 저장할 데이터
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      nextStep() {
        const orderStore = useOrderStore();
        orderStore.setMaxMemberCnt(this.memberCount); // 인원 수를 Pinia에 저장
        this.$router.push('/payinfo'); // 다음 페이지로 이동
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 320px;
    min-height: 100vh;
    background-color: #c0c0c0;
  }
  .main-container {
    width: 360px;
    height: 800px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  h3 {
    font-size: 20px;
    font-weight: 530;
    text-align: left;
    margin-left: 70px;
    margin-bottom: 100px;
    display: block;
    width: 100%;
  }
  .back-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 400;
    color: #000;
    text-align: left;
    color: #000;
    margin-left: -270px;
    margin-top: -300px;
    margin-bottom: 30px;
  }
  .back-button:hover {
    color: #7189ff;
  }


  </style>
  