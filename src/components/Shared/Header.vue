<template>
  <header>
    <div class="logo">
      <img src="/src/assets/logo.png" />
    </div>
    <nav class="nav">
      <ul class="nav_ul">
        <router-link active-class="active" tag="li" to="/login" exact v-if="auth!=true">Prijava</router-link>
        <button active-class="active" @click="onLogout" exact v-if="auth==true">Odjava</button>
        <router-link active-class="active" tag="li" to="/search" exact v-if="auth">Pretraži</router-link>
        <router-link active-class="active" tag="li" to="/admin/" exact v-if="admin==true">Administrator</router-link>
        <router-link active-class="active" tag="li" to="/signup" exact v-if="!auth">Registracija</router-link>
        <router-link active-class="active" tag="li" to="/home/my-reservations" exact v-if="auth">Moj profil</router-link>
        <router-link active-class="active" tag="li" to="/help" exact>Pomoć</router-link>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
 
  computed: {
    auth(){
      console.log(this.$store.getters.isAuth);
      return this.$store.getters.isAuth;
      },
    admin() {
      console.log("admin"+ this.$store.getters.isAdministrator)
      return this.$store.getters.isAdministrator;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
    }
  }
};
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

.nav_ul li, button {
  display: inline;
  margin-right: 4%;
  cursor: pointer;
}
button {
  border: none;
  background-color: white;
  font-family: sans-serif;
  font-size: 18px;
}
.nav_ul a {
  text-decoration: none;
  color: black;
}
.nav_ul li:hover, button:hover {
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