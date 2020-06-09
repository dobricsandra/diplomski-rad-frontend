<template>
 <div class="row">
<div class="col " v-if="!editCourseMode"><p>{{faculty.name}}</p></div>
<div class="col " v-if="editCourseMode"><input v-model="name" /></div>
 <div class="col smaller" v-if="!editCourseMode"><p>{{faculty.abbreviation}}</p></div>
 <div class="col smaller" v-if="editCourseMode"><input v-model="abbreviation" /></div>
 <div class="col " v-if="!editCourseMode"><p>{{faculty.city.name}} ({{faculty.city.abbreviation}})</p></div>
 <div class="col " v-if="editCourseMode">
      <select v-model="cityId"><option
          v-for="(city, i) in cities"
          v-bind:key="i"
          :value="city.id"
        >{{city.name}}, {{city.abbreviation}}</option></select>
 </div>

        
          <div class="col smaller"><p>
            <button class="small-button" v-if="!editCourseMode" @click="editCourseMode=true">Uredi</button>
            <button class="small-button" v-if="editCourseMode" @click="saveFaculty()">Spremi</button>
          </p></div>
          <div class="col smaller"><p>
            <button class="small-button" v-if="!editCourseMode" @click="deleteFaculty()">Obriši</button>
            <button class="small-button" v-if="editCourseMode" @click="leave()" >Odustani</button>
          </p></div>
          <div class="col" v-if="!editCourseMode"><p>
              
        <router-link tag="button" :to="route" class="small-button" >Uredi kolegije</router-link>
          </p></div>
 </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['faculty'],
    data() {
        return {
            editCourseMode: false,
            cities: [],
            loaded: false,
            name: "",
            abbreviation: "",
            cityId: "",
            route: "/admin/faculties/" + this.faculty.id + "/add-course"
        }
    },
    created() {
        this.name=this.faculty.name;
        this.abbreviation = this.faculty.abbreviation;
        this.cityId = this.faculty.city.id;
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
    methods: {
        saveFaculty() {
            console.log("usli");
           axios.post('/admin/faculties/' + this.faculty.id, {name: this.name, abbreviation:this.abbreviation, cityId: this.cityId})
            .then(resData => {
                console.log(resData);
                this.faculty.name = this.name;
                this.faculty.abbreviation = this.abbreviation;
                this.faculty.city.id = this.cityId;
                const city = this.cities.find(city => city.id == this.faculty.city.id);
                this.faculty.city.name = city.name;
                this.faculty.city.abbreviation = city.abbreviation;
                this.editCourseMode = false;
                this.loaded = true;
            })
            .catch(err => console.log(err))
      },
      leave(){
          this.editCourseMode = false;
          this.name = this.faculty.name;
          this.abbreviation = this.faculty.abbreviation;
          this.cityId = this.faculty.city.id;
      },
      deleteFaculty() {
        
        if (confirm("Jeste li sigurni?")) {
            axios.delete('/admin/faculties', {data: {id: this.faculty.id}})
            .then(resData => {
                console.log(resData);
                this.$emit('deletedFacultyId', this.faculty.id);
                this.editCourseMode = false;
            })
            .catch(err => console.log(err))
        } 

          
      }
    }
}
</script>

<style scoped>
.col {
  width: 18%;
  text-align: center;
  display:inline-block;
  vertical-align: middle;
}
.smaller{
    width:10%;
}

.small-button {
    width: 70%;
    height:30px;
    margin:auto;

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
    width: 80%;
    vertical-align: middle;
    display:inline-block;
    margin:0px;
}
.name {
    width: 80%;
}
.col:first-child {
    width: 30%;
}
select{
    margin:0px;
}
</style>