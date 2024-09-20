<template>
  <div class="main-container">
    <h1>Main Page</h1>
    <nav>
      <ul>
        <li><router-link to="/login">Login Page</router-link></li>
        <li><router-link to="/myassets">My Assets Page</router-link></li>
        <li><router-link to="/accountbook">Account Book Page</router-link></li>
        <li><router-link to="/businesscard">Business Card Page</router-link></li>
        <li><router-link to="/grouppay">Group Pay Page</router-link></li>
        <li><router-link to="/signup">Signup Page</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
};
</script>

<style scoped>
/* 추가 스타일 필요시 여기에 작성 */
</style>
