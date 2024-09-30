<template>
  <div class="main-container">
    <div class="form-container">
      <label for="nameInput" class="form-label">
        이름을 입력해주세요.
      </label>
      <label class="name-label">
        이름
      </label>
      <input
        type="text"
        id="nameInput"
        class="custom-input"
        v-model="name"
        @input="validateName"
      />
      <div class="button-wrapper">
        <button class="custom-button" @click="handleNext">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../../api/axios.js';

export default {
  data() {
    return {
      name: ''
    };
  },
  methods: {
    validateName() {
      this.name = this.name.replace(/[^a-zA-Z가-힣\s]/g, '');
    },
    handleNext() {
      if (this.name.trim()) {
        // 이름을 서버에 전송
        apiClient.post('/member/set-name', { name: this.name.trim() })
          .then(() => {
            this.$router.push({ name: 'Phone' }); // 전화번호 입력 페이지로 이동
          })
          .catch(error => {
            console.error('이름 저장 오류:', error);
            alert('이름 저장에 실패했습니다. 다시 시도해주세요.');
          });
      } else {
        alert('이름을 입력해주세요.');
      }
    }
  }
};
</script>

<style scoped>
.main-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.form-container {
  width: 100%;
  max-width: 360px;
  text-align: center;
  position: relative;
}

.form-label {
  position: absolute;
  top: -160px;
  left: 35px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.name-label {
  position: absolute;
  top: -100px;
  left: 35px;
  font-size: 14px;
  color: #6981D9;
}

.custom-input {
  width: 80%;
  height: 35px;
  border: none;
  border-bottom: 1px solid #9f9f9f;
  text-align: left;
  margin-bottom: 40px;
  font-size: 14px;
  outline: none; /* 포커스 시 외곽선 제거 */
  -webkit-tap-highlight-color: transparent; /* 모바일에서 탭 시 하이라이트 제거 */
}

.custom-input:focus {
  border-color: #6981D9; /* 포커스 시 테두리 색상 변경 (선택사항) */
}

/* 버튼을 따로 감싸는 div를 추가하고, 아래로 배치 */
.button-wrapper {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 230px;
  width: 100%;
  padding-bottom: 20px;
}

.custom-button {
  width: 80%;
  height: 50px;
  background-color: #6981D9;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
}
</style>
