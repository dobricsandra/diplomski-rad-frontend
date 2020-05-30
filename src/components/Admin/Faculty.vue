<template>
<div>
<div v-if="!editMode">
  <p>{{faculty.name}}</p> 
  <button @click="editMode=true">Uredi</button>
  <button @click="deleteFaculty">Obriši</button>
  <button>Dodaj/obriši kolegije</button>
</div>
<div v-if="editMode">
  <label>Naziv:</label><input v-model="faculty.name" /> 
  <label>Naziv:</label><input v-model="faculty.abbreviation" /> 
 <label>Grad:</label><select v-for="(city, i) in cities" v-bind:key="i" v-model="faculty.cityId">
            <option :value="city.id">{{city.name}} ({{city.abbreviation}})</option>
 </select>
  <button @click="editFaculty">Spremi</button>
  <button @click="editMode=false">Odustani</button>
</div>

</div>

</template>

<script>
import axios from "axios";
export default {
  props: ['faculty'],
  created() {
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
  data(){
      return {
          cities: [],
          editMode: false
      }
  },
  methods: {
      editFaculty() {
          axios.post('/admin/faculty/' + this.faculty.id, {name:this.faculty.name, abbreviation:this.faculty.abbreviation, cityId:this.faculty.cityId})
          .then(resData =>{
              this.editMode = false;
          })
          .catch(err=>console.log(err)) 
      },
      deleteFaculty() {
          axios.delete('/admin/faculty', { data: { id: this.faculty.id }}) // delete method expects special format for body
          .then(resData => {
              console.log(resData);
              //this.$destroy();
          })
          .catch(err => console.log(err))
      }
  }
};
</script>
<style scoped>
button {
    display: inline-block;
    width: 15%;
    height: 30px;
    margin: 0px;
    margin-left: 1%;
}
button:last-of-type {
    width: 25%;
}
p {
    display:inline-block;
}
input {
    margin: 2%;
}
</style>