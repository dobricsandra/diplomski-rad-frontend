<template>
<div>
  <nav>
    <ul class="nav_ul">
      <div>
      <router-link active-class="active" tag="li" to="/home/my-reservations" exact>Moje rezervacije</router-link>
      <router-link active-class="active" tag="li" to="/home/edit-profile" exact>Uredi korisnički profil</router-link>
      <router-link active-class="active" tag="li" to="/home/start-teaching" exact v-if="!isInstructor()">Postani instruktor!</router-link>
      </div>
      <div class="float-right" v-if="isInstructor()">
      <router-link active-class="active" tag="li" to="/home/my-instructor-profile" exact >Uredi instruktorski profil</router-link>
      <router-link active-class="active" tag="li" to="/home/my-courses" exact >Dodaj kolegije</router-link>
      <router-link active-class="active" tag="li" to="/home/my-calendar" exact >Kalendar i rezervacije</router-link>
      <!-- <router-link active-class="active" tag="li" to="/home/my-instructor-profile" exact v-if="isInstructor()">Instruktorske stranice</router-link> -->
      </div>
   </ul>
  </nav>
  <router-view></router-view>
</div>
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
  background-color: orangered;
  text-decoration: underline;
  color: black;
  font-weight: bold;
}
nav {
  width: 100%;
  vertical-align: bottom;
  margin: 0px;
  padding-bottom: 40px;
}

.nav_ul {
  list-style-type: none;
  text-align: center;
  margin:0px;
}
.nav_ul li {
    background-color: rgba(198, 56, 63, 0.8);
    padding: 15px;
    padding-left: 20px;
    padding-right: 20px;
    border: 1px lightgray solid;
}

.nav_ul li:hover {
    background-color: rgb(255, 69, 0, 0.9);
}

.nav_ul li, button {
  display: inline;
  cursor: pointer;
}
nav ul div {
  display: flex;
}
nav ul div:first-of-type {
  float:left;
}
.float-right {
  float:right;
}
nav ul {
  padding-left: 0px;
}

</style>