<template>
  <div>
    <h1>Main Page</h1>
    <nav>
      <ul>
        <li><router-link to="/login">Login Page</router-link></li>
        <li><router-link to="/myassets">My Assets Page</router-link></li>
        <li><router-link to="/accountbook">Account Book Page</router-link></li>
        <li>
          <router-link to="/businesscard">Business Card Page</router-link>
        </li>
        <li><router-link to="/grouppay">Group Pay Page</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "MainPage",
};
</script>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
}

nav li {
  margin: 10px 0;
}

router-link {
  color: blue;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
