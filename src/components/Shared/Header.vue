<template>
  <header>
    <div class="logo">
      <img src="/src/assets/logo.png" />
    </div>
    <nav class="nav">
      <ul class="nav_ul">
        <router-link active-class="active" tag="li" to="/login" exact>Prijava</router-link>
        <router-link
          active-class="active"
          tag="li"
          to="/create-instructor-profile"
          exact
        >Postani instruktor</router-link>
        <router-link active-class="active" tag="li" to="/signup" exact>Registracija</router-link>
        <router-link active-class="active" tag="li" to="/help" exact>Pomoć</router-link>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  margin: 0px;
  padding: 0px;
  text-align: right;
  background-color: white;
}

nav,
.logo {
  display: inline-block;
}

.logo {
  max-width: 150px;
  width: 20%;
  margin: 10px;
  text-align: left;
}
nav {
  width: 75%;
  vertical-align: bottom;
}
.logo img {
  width: 100%;
  vertical-align: middle;
}
.nav_ul {
  list-style-type: none;
  margin: 1.5% 1%;
}

.nav_ul li {
  display: inline;
  margin-right: 4%;
  cursor: pointer;
}

.nav_ul a {
  text-decoration: none;
  color: black;
}
.nav_ul li:hover {
  text-decoration: underline;
  color: black;
}
.nav_ul li:active,
.active {
  text-decoration: underline;
  color: black;
  font-weight: bold;
}
</style>