<template>
  <nav>
    <ul class="nav_ul">
      <router-link active-class="active" tag="li" to="/home/edit-profile" exact>Uredi profil</router-link>
      <router-link active-class="active" tag="li" to="/home/my-reservations" exact>Rezervacije</router-link>
      <router-link active-class="active" tag="li" to="/home/my-instructor-profile" exact v-if="isInstructor()">Instruktorske stranice</router-link>
    </ul>
    <router-view></router-view>
  </nav>
</template>

<script>
export default {
  methods: {
      isInstructor(){
          return this.$store.getters.isInstructor;
      }
  }
};
</script>

<style scoped>

.nav_ul li:active,
.active {
  text-decoration: underline;
  color: black;
  font-weight: bold;
}
nav {
  width: 100%;
  vertical-align: bottom;
  margin: auto;
}

.nav_ul {
  list-style-type: none;
  margin: 1.5% 1%;
  text-align: center;
}
.nav_ul li {
    background-color: rgb(247, 117, 66);
    padding: 15px;
    padding-left: 40px;
    padding-right: 40px;
}
.nav_ul li, button {
  display: inline;
  margin-right: 4%;
  cursor: pointer;
}
</style>