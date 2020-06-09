<template>
  <div class="wrapper">
    <div class="content">
      <label>Naziv fakulteta:</label>
      <input type="text" v-model="name" />
      <label>Kratica:</label>
      <input type="text" v-model="abbreviation" />
      <label>Grad:</label>
      <select v-model="cityId">
        <option
          v-for="(city, i) in cities"
          v-bind:key="i"
          :value="city.id"
        >{{city.name}}, {{city.abbreviation}}</option>
      </select>
     
    </div>
    <button @click="addFaculty()">Dodaj</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios
      .get("/cities")
      .then(resData => {
        const cities = [];
        console.log(resData.data.id);
        for (let id in resData.data) {
          cities.push(resData.data[id]);
        }
        this.cities = cities;
      })
      .catch(err => console.log(err));
  },
  methods: {
      addFaculty() {
          axios.post('/admin/faculties', {name:this.name , abbreviation:this.abbreviation, cityId: this.cityId})
            .then(resData => {
                this.$router.push('/admin/faculties');
            })
            .catch(err => console.log(err))
      }
  },
  
  data() {
    return {
      name: "",
      abbreviation: "",
      cities: [],
      cityId: ""
    };
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  padding-bottom: 50px;
  margin-top: 2%;
}
.content {
  width: 50%;
  margin: auto;
  padding-top: 50px;
}

button {
  background-color: rgba(198, 56, 63, 0.8);
  width: 70%;
  height: 80px;
  margin: auto;
  margin-top: 5%;
}
input {
    margin: 10px;
    margin-left:0px;
}
</style>
