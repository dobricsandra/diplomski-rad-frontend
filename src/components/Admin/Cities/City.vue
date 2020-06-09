<template>
 <div class="row">
<div class="col " v-if="!editCourseMode"><p>{{city.postalCode}}</p></div>
<div class="col " v-if="editCourseMode"><input v-model="postalCode" /></div>
 <div class="col smaller" v-if="!editCourseMode"><p>{{city.name}}</p></div>
 <div class="col smaller" v-if="editCourseMode"><input class="name" v-model="name" /></div>
 <div class="col smaller" v-if="!editCourseMode"><p>{{city.abbreviation}}</p></div>
 <div class="col smaller" v-if="editCourseMode"><input v-model="abbreviation" /></div>
 <div class="col " v-if="!editCourseMode"><p>{{city.country.name}} ({{city.country.abbreviation}})</p></div>
 <div class="col " v-if="editCourseMode">
      <select v-model="countryId"><option
          v-for="(country, i) in countries"
          v-bind:key="i"
          :value="country.id"
        >{{country.name}}, {{country.abbreviation}}</option></select>
 </div>

        
          <div class="col smaller"><p>
            <button class="small-button" v-if="!editCourseMode" @click="editCourseMode=true">Uredi</button>
            <button class="small-button" v-if="editCourseMode" @click="saveCity()">Spremi</button>
          </p></div>
          <div class="col smaller"><p>
            <button class="small-button" v-if="!editCourseMode" @click="deleteCity()">Obriši</button>
            <button class="small-button" v-if="editCourseMode" @click="leave()" >Odustani</button>
          </p></div>
          <div class="col" v-if="!editCourseMode"><p>
              
        <router-link tag="button" :to="route" class="small-button" >Uredi fakultete</router-link>
          </p></div>
 </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['city'],
    data() {
        return {
            editCourseMode: false,
            countries: [],
            loaded: false,
            name: "",
            postalCode: "",
            abbreviation: "",
            countryId: "",
            route: "/admin/cities/" + this.city.id + "/add-faculty"
        }
    },
    created() {
        this.name=this.city.name;
        this.postalCode=this.city.postalCode;
        this.abbreviation = this.city.abbreviation;
        this.countryId = this.city.country.id;
        axios
      .get("/countries")
      .then(resData => {
        for (let id in resData.data) {
          this.countries.push(resData.data[id]);
        }
        this.loaded = true;
      })
      .catch(err => console.log(err));

    },
    methods: {
        saveCity() {
            console.log("usli");
           axios.post('/admin/cities/' + this.city.id, {postalCode: this.postalCode, name: this.name, abbreviation:this.abbreviation, countryId: this.countryId})
            .then(resData => {
                console.log(resData);
                this.city.name = this.name;
                this.city.postalCode = this.postalCode;
                this.city.abbreviation = this.abbreviation;
                this.city.country.id = this.countryId;
                const country = this.countries.find(country => country.id == this.city.country.id);
                this.city.country.name = country.name;
                this.city.country.abbreviation = country.abbreviation;
                this.editCourseMode = false;
                this.loaded = true;
            })
            .catch(err => console.log(err))
      },
      leave(){
          this.editCourseMode = false;
          this.name = this.city.name;
          this.postalCode = this.city.postalCode;
          this.abbreviation = this.city.abbreviation;
          this.countryId = this.city.country.id;
      },
      deleteCity() {
        
        if (confirm("Jeste li sigurni? Grad nećete moći obrisati ako postoje fakulteti ili korisnici koji mu pripadaju!")) {
            axios.delete('/admin/cities', {data: {id: this.city.id}})
            .then(resData => {
                console.log(resData);
                this.$emit('deletedCityId', this.city.id);
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
    width: 40%;
    vertical-align: middle;
    display:inline-block;
}
.name {
    width: 80%;
}

</style>