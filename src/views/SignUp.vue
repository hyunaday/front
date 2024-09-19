<template>
    <div class="main-container d-flex flex-column justify-content-center align-items-center">
        <!-- 로고 이미지 -->
        <img src="../assets/images/logo.png" alt="logo" class="logo mb-3" />
        
        <!-- 타이틀 -->
        <h2 class="text-center mb-4">회원 가입</h2>

        <!-- 회원가입 폼 -->
        <form class="signup-form w-100 px-3">
        <div class="mb-3">
            <label for="name" class="form-label">이름<span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="name" placeholder="이름을 입력하세요" required />
        </div>

        <div class="mb-3">
            <label for="phone" class="form-label">연락처<span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="phone" placeholder="연락처를 입력하세요" required />
        </div>

        <div class="mb-3">
            <label for="idNumber" class="form-label">주민등록번호<span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="idNumber" placeholder="주민등록번호를 입력하세요" required />
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">이메일<span class="text-danger">*</span></label>
            <input type="email" class="form-control" id="email" placeholder="이메일을 입력하세요" required />
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">비밀번호<span class="text-danger">*</span></label>
            <input type="password" class="form-control" id="password" placeholder="비밀번호를 입력하세요" required />
        </div>

        <div class="mb-3">
            <label for="confirmPassword" class="form-label">비밀번호 확인<span class="text-danger">*</span></label>
            <input type="password" class="form-control" id="confirmPassword" placeholder="비밀번호를 확인하세요" required />
        </div>

        <!-- 다음 버튼 -->
        <button type="submit" class="btn btn-primary w-100 py-2">다음</button>
        </form>
    </div>
</template>
  
<script>
export default {
name: 'SignUp',
};
</script>
  
<style scoped>
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

body, h2, label, button, input {
font-family: 'Pretendard', sans-serif;
}

.main-container {
width: 360px;
height: 800px;
background-color: white;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
}

.logo {
width: 300px;
margin-bottom: 20px;
}

h2 {
font-size: 1.8rem;
color: #555555;
}

.signup-form {
width: 100%;
}

label {
font-size: 1rem;
color: #555555;
}

.form-control:focus {
border-color: #42a5f5;
box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
}

button {
background-color: #6981D9;
border: none;
}

button:hover {
background-color: #44548c;
}
</style>
  