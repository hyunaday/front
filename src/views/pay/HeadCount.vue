<template>
    <div class="main-container d-flex flex-column justify-content-center align-items-center">
      <div class="content">
        <button @click="goBack" class="back-button">
          <i class="fas fa-chevron-left"></i>
        </button>
  
        <h3>
          결제할 <span style="color: #6981d9">인원</span>을 <br />
          입력해주세요
        </h3>
  
        <div class="counter d-flex align-items-center">
          <label class="text">인원</label>
          <button @click="decrement" class="btn btn-outline-secondary">-</button>
          <span class="count-display mx-3">{{ memberCount }}</span>
          <button @click="increment" class="btn btn-outline-secondary">+</button>
        </div>
      </div>
  
      <button @click="nextStep" class="next-button">다음</button>
    </div>
  </template>
  
  <script>
  import { useOrderStore } from "../../stores/orderStore";
  
  export default {
    name: "HeadCount",
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
        this.$router.push("/payinfo"); // 다음 페이지로 이동
      },
      increment() {
        this.memberCount++;
      },
      decrement() {
        if (this.memberCount > 1) {
          this.memberCount--;
        }
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
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -188px;
  }
  h3 {
    font-size: 20px;
    font-weight: 530;
    text-align: left;
    margin-left: -85px;
    margin-bottom: 30px;
    margin-top: 20px;
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
    margin-left: -270px;
    margin-bottom: 10px;
  }
  .back-button:hover {
    color: #7189ff;
  }
  label {
    font-size: 20px;
  }
  .counter {
    font-size: 24px;
    margin-top: 20px;
  }
  .count-display {
    font-size: 20px;
    font-weight: bold;
    min-width: 40px;
    text-align: center;
  }
  .text {
    margin-right: 30px;
  }
  .next-button {
    margin-top: 300px;
    padding: 10px 20px;
    background-color: white; /* 버튼 색상 */
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 300px; /* 버튼 너비 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  }
  
  .next-button:hover {
    background-color: #6981d9; /* 마우스 오버 시 색상 변경 */
    color: white;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  .next-button:active {
    background-color: #4a5fb5; /* 클릭 시 배경색 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .next-button:disabled {
    background-color: #cccccc; /* 비활성화 상태 배경색 */
    cursor: not-allowed; /* 비활성화 상태 커서 */
  }
  </style>
  