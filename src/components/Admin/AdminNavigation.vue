<template>
  <nav>
    <ul class="nav_ul">
      <router-link active-class="active" tag="li" to="/admin/cities" exact>Države</router-link>
      <router-link active-class="active" tag="li" to="/admin/cities" exact>Gradovi</router-link>
      <router-link active-class="active" tag="li" to="/admin/faculties" exact>Fakulteti</router-link>
      <router-link active-class="active" tag="li" to="/admin/faculties" exact>Kolegiji</router-link>
      <router-link active-class="active" tag="li" to="/admin/faculties" exact>Stupnjevi obrazovanja</router-link>
      <router-link active-class="active" tag="li" to="/admin/faculties" exact>Fakulteti</router-link>
    </ul>
    <router-view></router-view>
  </nav>
</template>

<script>
export default {
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
  display:flex;
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


nav ul {
  padding-left: 0px;
}
</style>