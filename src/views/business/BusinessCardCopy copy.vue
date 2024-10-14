<template>
  <div class="main-container">
  <!-- <Header /> -->
   
<div class="boarding-pass-container">
  <div class="boarding-pass">
    <div class="boarding-pass-header">
      <!-- <img src="klm_logo.png" alt="KLM Logo" class="airline-logo" /> -->
      <p class="passenger-name">{{ formData.name || '이름 없음' }}</p>
    </div>
    <div class="boarding-pass-body">
      <div class="route-info">
        <p class="airport-code">{{ formData.company || 'FRA' }}</p>
        <i class="fa fa-plane"></i>
        <p class="airport-code">{{ formData.address || 'JFK' }}</p>
      </div>
      <div class="flight-details">
        <p><strong>Flight:</strong> {{ formData.position || 'Y4-858' }}</p>
        <p><strong>Seat:</strong> {{ formData.phone || '8D' }}</p>
        <p><strong>Class:</strong> Economy</p>
        <p><strong>SEQ#:</strong> 61</p>
      </div>
      <div class="flight-datetime">
        <p><strong>Date:</strong> {{ formData.department || 'April 4, 2017' }}</p>
        <p><strong>Time:</strong> {{ formData.phoneLandline || '18:25 PM' }}</p>
      </div>
      <div class="qr-code-container">
        <img :src="qrCodeData || 'qr_placeholder.png'" alt="QR Code" class="qr-code-image" />
      </div>
    </div>
    <button class="add-to-wallet-button">ADD TO WALLET</button>
  </div>
</div>
  <FooterNav :buttonType="'plus'" :buttonAction="goToaddBusinessCard" />
</div>
</template>

<script>
import apiClient from '../../api/axios.js';
import FooterNav from '../../components/FooterNav.vue';
import Header from '../../components/Header.vue';

export default {
name: 'BusinessCard',
components: {
  FooterNav,
  Header,
},
data() {
  return {
    formData: {
      name: '',
      phone: '',
      email: '',
      position: '',
      department: '',
      company: '',
      address: '',
      phoneLandline: '',
    },
    qrCodeData: '', // QR code image data
  };
},
created() {
  this.fetchBusinessCardData();
},
methods: {
  async fetchBusinessCardData() {
    try {
      const response = await apiClient.get('/businessCard/myBusinessCard');
      if (response.data.isSuccess) {
        const cardData = response.data.result.businessCardList[0];
        this.formData = {
          name: cardData.name,
          phone: cardData.phoneNumber,
          email: cardData.email,
          position: cardData.position,
          department: cardData.part,
          company: cardData.company,
          address: cardData.address,
          phoneLandline: cardData.tel_num,
        };
        this.qrCodeData = cardData.imgurl || 'qr_placeholder.png';
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('명함 정보를 가져오는 중 오류 발생');
    }
  },
  goToaddBusinessCard() {
    this.$router.push('/addbusinesscard');
  },
},
};
</script>

<style scoped>
.boarding-pass-container {
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
background-color: #f9f1f1;
}

.boarding-pass {
background-color: #ffffff;
width: 360px;
padding: 20px;
border-radius: 15px;
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
text-align: center;
}

.boarding-pass-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
}

.airline-logo {
width: 50px;
height: auto;
}

.passenger-name {
font-weight: bold;
font-size: 20px;
color: #333;
}

.route-info {
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 15px;
}

.airport-code {
font-size: 32px;
font-weight: bold;
color: #333;
margin: 0 10px;
}

.flight-details, .flight-datetime {
font-size: 14px;
color: #666;
margin-bottom: 15px;
}

.qr-code-container {
margin-top: 20px;
}

.qr-code-image {
width: 150px;
height: 150px;
}

.add-to-wallet-button {
background-color: #7ec993;
color: #ffffff;
font-weight: bold;
padding: 10px 20px;
border: none;
border-radius: 5px;
cursor: pointer;
width: 100%;
margin-top: 20px;
}

.add-to-wallet-button:hover {
background-color: #6ab384;
}
</style>