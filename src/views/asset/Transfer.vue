<template>
    <div class="main-container d-flex flex-column justify-content-center align-items-center">
      <Header />
      <div class="transfer-page">
        <div class="transfer-form">
          <label for="recipient"><span class="point">누구</span>에게<br> 보내겠습니까?</label>
          <input
            type="text"
            id="recipient"
            v-model="recipient"
            placeholder="계좌번호 입력"
            @input="validateInput"
            class="number-only"
          />
        </div>
        
        <div class="recent-transactions">
          <h2>최근 거래</h2>
          <ul>
            <li v-for="transaction in recentTransactions" :key="transaction.id">
              {{ transaction.date }} - {{ transaction.amount }} - {{ transaction.recipient }}
            </li>
          </ul>
        </div>
      </div>
      <!-- FooterNav 컴포넌트 사용 -->
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
    data() {
      return {
        recipient: '',
        recentTransactions: [
          { id: 1, date: '2024-09-01', amount: '100,000 원', recipient: '123-456-7890' },
          { id: 2, date: '2024-09-05', amount: '50,000 원', recipient: '987-654-3210' },
          { id: 3, date: '2024-09-10', amount: '75,000 원', recipient: '456-123-7890' },
        ],
      };
    },
    methods: {
      validateInput() {
        this.recipient = this.recipient.replace(/[^0-9]/g, '').slice(0, 13);
      },
    },
  };
  </script>
  
  <style scoped>
  .main-container {
    height: 100vh;
    padding: 20px;
  }
  
  .transfer-page {
    max-width: 400px;
    border-radius: 10px;
    padding: 30px;
    text-align: left;
  }
  
  .point {
    color: #6981D9;
  }
  
  .transfer-form {
    margin-bottom: 20px;
  }
  
  label {
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    color: transparent; /* 텍스트 색상을 투명하게 */
    text-shadow: 0 0 0 #000; /* 숫자만 보이도록 */
  }
  
  .number-only {
    caret-color: #000; /* 커서 색상 */
  }
  </style>
  