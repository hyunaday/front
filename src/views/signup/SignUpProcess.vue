<template>
    <div>
      <NameStep v-if="step === 1" @next="handleNextName" />
      <PhoneStep v-if="step === 2" @next="handleNextPhone" />
      <VerificationStep v-if="step === 3" :phone="signUpData.phone" @next="handleNextVerification" />
      <EmailStep v-if="step === 4" @next="handleNextEmail" />
      <PasswordStep v-if="step === 5" @submit="handleSubmit" />
    </div>
  </template>
  
  <script>
  import NameStep from '../signup/Name.vue';
  import PhoneStep from '../signup/Phone.vue';
  import VerificationStep from '../signup/Verification.vue';
  import EmailStep from '../signup/Email.vue';
  import PasswordStep from '../signup/Password.vue';
  import apiClient from '../../api/axios.js';  // Axios 설정
  
  export default {
    components: {
      NameStep,
      PhoneStep,
      VerificationStep,
      EmailStep,
      PasswordStep,
    },
    data() {
      return {
        step: 1, // 현재 단계 (1: 이름 입력, 2: 전화번호 입력 등)
        signUpData: {
          name: '',
          phone: '',
          verificationCode: '',
          email: '',
          password: ''
        }
      };
    },
    methods: {
      handleNextName(name) {
        this.signUpData.name = name;
        this.step = 2;  // Phone.vue로 이동
      },
      handleNextPhone(phone) {
        this.signUpData.phone = phone;
        this.step = 3;  // Verification.vue로 이동
      },
      handleNextVerification(verificationCode) {
        this.signUpData.verificationCode = verificationCode;
        this.step = 4;  // Email.vue로 이동
      },
      handleNextEmail(email) {
        this.signUpData.email = email;
        this.step = 5;  // Password.vue로 이동
      },
      handleSubmit(password) {
        this.signUpData.password = password;
        
        // 회원가입 데이터를 API로 전송
        apiClient.post('/member/signup', this.signUpData)
          .then(response => {
            alert('회원가입 성공!');
            this.$router.push('/login'); // 회원가입 후 로그인 페이지로 이동
          })
          .catch(error => {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
          });
      }
    }
  };
  </script>
  