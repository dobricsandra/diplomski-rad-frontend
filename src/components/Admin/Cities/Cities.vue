<template>
  <div class="my-courses">
<div v-if="!cities.length && loaded" class="row">Ne postoji nijedan grad! </div>
    <div v-if="cities.length" class="row">
        <div class="col "><p>Poštanski broj</p></div>
        <div class="col smaller"> <p>Naziv</p></div>
        <div class="col smaller"> <p>Kratica</p></div>
        <div class="col"> <p>Država</p></div>
        <div class="col smaller"></div>
        <div class="col smaller"></div>
        <div class="col "></div>
      </div>

        <div class="courses" v-for="(city,i) in cities" v-bind:key="i">
            <app-city :city="city" v-on:deletedCityId="receivedCityId"></app-city>
        </div>
 
    <router-link tag="button" to="/admin/cities/add-new-city" exact >Dodaj novi grad</router-link>

  </div>
</template>

<script>
import axios from "axios";
import City from './City.vue';
export default {
  created() {
    axios
      .get("/cities")
      .then(resData => {
        for (let id in resData.data) {
          this.cities.push(resData.data[id]);
        }
        this.loaded = true;
      })
      .catch(err => console.log(err));
   
  },

  data() {
    return {
      editCourseMode: false,
      cities: [],
      courseAddMenu: false,
      instructorId: "",
      loaded: false
    };
  },
  methods: {
    receivedCityId(deletedCityId) {
      this.cities.splice(this.cities.findIndex(item => item.id === deletedCityId), 1);
    }
  },

  components: {
      'app-city': City
  }
};
</script>
<style scoped>
.my-courses {
  width: 100%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top: 2%;
  padding-bottom: 50px;
  padding-top:50px;
}

.row {
width: 90%;
padding:0px 2%;
margin:auto;
border-bottom: 3pt solid rgb(235, 57, 57, 0.2);

}
.col {
  width: 18%;
  text-align: center;
  display:inline-block;
}
.smaller{
    width:10%;
}
.row p {
    font-size: 20px;
    font-weight: bold;
}
.small-button {
    width: 70%;
    height:30px;
    margin:auto;

}
button {
    background-color:rgba(198, 56, 63, 0.8);
    width: 70%;
    height:80px;
    margin:auto;
    margin-top:5%;
}
input {
    width: 40%;
    margin:auto;
    display:inline-block;
}
</style>
