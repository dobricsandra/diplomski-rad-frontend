<template>
  <div class="wrapper">
    <div v-if="!addMode">
      <button class="big" @click="addMode=true">Dodaj novi fakultet</button>
      <div v-for="(faculty,i) in faculties" v-bind:key="i">
        <app-faculty :faculty="faculty"></app-faculty>
      </div>
    </div>
    <div v-if="addMode">
        <label>Naziv:</label><input type="text" maxlength="50" v-model="facultyName" required />
        <label>Kratica: </label><input type="text" maxlength="50" v-model="facultyAbbreviation" required />
        <label>Grad:</label><select v-for="(city, i) in cities" v-bind:key="i" v-model="cityId">
            <option :value="city.id">{{city.name}} ({{city.abbreviation}})</option>
        </select>
        <button @click="addNewFaculty">Spremi novi fakultet</button>
        <button @click="addMode=false">Odustani</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Faculty from "./Faculty.vue";
export default {
  created() {
    axios
      .get("/faculty")
      .then(resData => {
        const faculties = [];
        console.log(resData.data.id);
        for (let id in resData.data) {
          faculties.push(resData.data[id]);
        }
        this.faculties = faculties;
      })
      .catch(err => console.log(err));
        axios
      .get("/city")
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
  components: {
    "app-faculty": Faculty
  },
  data() {
    return {
      faculties: [],
      cities: [],
      addMode: false,
      facultyName: "",
      facultyAbbreviation: "",
      cityId:""
    };
  },
  methods: {
      addNewFaculty() {
          axios.post('/admin/faculty', { name:this.facultyName, abbreviation:this.facultyAbbreviation, cityId:this.cityId })
          .then(resData => {console.log(resData);
            this.addMode=false;
            this.faculties.push({id:resData.data.id, name:this.facultyName, abbreviation:this.abbreviation, cityId:this.cityId});
            this.facultyName="";
            this.abbreviation="";
            this.cityId="";
            })
          .catch(err => console.log(err))
        
      }
  }
};
</script>
<style scoped>
.wrapper {
  width: 70%;
  margin: auto;
  margin-top: 5%;
}
input, select {
    margin: 2%;
    width: 100%;
}
button {
    width: 45%;
    display:inline-block;
    margin: 2%;
}
.big {
    width:100%;
}
</style>
