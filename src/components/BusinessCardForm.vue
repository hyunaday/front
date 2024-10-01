<template>
  <div>
    <h3>{{ title }}</h3>
    <form @submit.prevent="submitForm">
      <label for="card-image" class="upload-label">
        <div class="upload-box">
          <!-- <span>이미지를 추가해주세요.</span>
          <div class="upload-icon">
            <i class="fas fa-plus"></i>
          </div> -->
        </div>
        <input
          type="file"
          id="card-image"
          accept="image/*"
          @change="handleImageUpload"
          class="image-input"
        />
      </label>
      <div class="divider"></div>
      <div class="form-group">
        <label for="name">이름&nbsp;<span class="required">*</span></label>
        <div class="input-container">
          <input type="text" id="name" v-model="formData.name" required />
        </div>
      </div>
      <div class="form-group">
        <label for="phone">연락처&nbsp;<span class="required">*</span></label>
        <div class="input-container">
          <input type="tel" id="phone" v-model="formData.phone" required />
        </div>
      </div>
      <div class="form-group">
        <label for="email">이메일&nbsp;<span class="required">*</span></label>
        <div class="input-container">
          <input type="email" id="email" v-model="formData.email" required />
        </div>
      </div>
      <div class="form-group">
        <label for="position">직책</label>
        <div class="input-container">
          <input type="text" id="position" v-model="formData.position" />
        </div>
      </div>
      <div class="form-group">
        <label for="department">부서/파트</label>
        <div class="input-container">
          <input type="text" id="department" v-model="formData.department" />
        </div>
      </div>
      <div class="form-group">
        <label for="company">소속명</label>
        <div class="input-container">
          <input type="text" id="company" v-model="formData.company" />
        </div>
      </div>
      <div class="form-group">
        <label for="address">주소</label>
        <div class="input-container">
          <input type="text" id="address" v-model="formData.address" />
        </div>
      </div>
      <div class="form-group">
        <label for="phone-landline">유선번호</label>
        <div class="input-container">
          <input
            type="tel"
            id="phone-landline"
            v-model="formData.phoneLandline"
          />
        </div>
      </div>
      <!-- 메모 -->
      <!-- <div class="form-group">
        <label for="memo">메모:</label>
        <div class="input-container">
          <textarea id="memo" v-model="formData.memo"></textarea>
        </div>
      </div> -->
      <button type="submit">등록</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        email: "",
        position: "",
        department: "",
        company: "",
        address: "",
        phoneLandline: "",
        memo: "",
      },
      imageFile: null,
    };
  },
  methods: {
    // handleImageUpload(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     this.imageFile = file;
    //     console.log("이미지 파일이 업로드되었습니다:", file.name);
    //   }
    // },
    submitForm() {
      const formData = new FormData();
      formData.append("image", this.imageFile);
      formData.append("name", this.formData.name);
      formData.append("phone", this.formData.phone);
      formData.append("email", this.formData.email);
      formData.append("position", this.formData.position);
      formData.append("department", this.formData.department);
      formData.append("company", this.formData.company);
      formData.append("address", this.formData.address);
      formData.append("phoneLandline", this.formData.phoneLandline);
      formData.append("memo", this.formData.memo);

      console.log("폼이 제출되었습니다.", formData);
      // API 요청을 실제로 보내는 코드는 여기에 추가
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 20px;
  font-weight: bold;
}
.required {
  color: red; /* 필수 항목 표시 색상 */
}

.form-group {
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 정렬 */
  margin-bottom: 20px; /* 폼 그룹 간격 */
}

label {
  font-size: 13px;
  font-weight: bold;
  margin-right: -20px; /* 라벨과 입력 필드 간격 */
  width: 100px; /* 라벨 너비 설정 (조정 가능) */
}

.input-container {
  flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
  display: flex; /* Flexbox 사용 */
}

input,
textarea {
  width: 225px; /* 박스의 너비를 고정 */
  height: 25px; /* 높이를 일관되게 설정 */
  border: 1px solid #ccc; /* 테두리 색상 */
  border-radius: 9px; /* 모서리 둥글게 */
  box-sizing: border-box; /* 패딩과 테두리가 포함된 너비 계산 */
  overflow: hidden; /* 스크롤바 숨기기 */
}

textarea {
  height: 80px; /* 텍스트 영역의 높이를 더 높게 설정 */
  resize: none; /* 크기 조절 불가능하게 설정 */
  overflow: hidden; /* 텍스트 영역에서 스크롤바 숨기기 */
}

.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}

.upload-label {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.upload-box {
  font-size: 15px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 300px;
  border: 1px solid black;
}

.upload-box span {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}

.upload-icon {
  background-color: #7189ff;
  color: white;
  font-size: 45px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-input {
  display: none;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
}
</style>
