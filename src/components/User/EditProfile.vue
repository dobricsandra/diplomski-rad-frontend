<template>
<div>
     <div v-if="!editMode" class="user_data">
      <div class="info">
        <p>Ime i prezime: {{userDetails.name}} {{userDetails.surname}}</p>
        <p>E-mail: {{userDetails.email}}</p>
        <p>Prebivalište: {{userDetails.city.name}}, {{userDetails.city.country.name}}</p>
        <p>Fakultet: {{userDetails.faculty.name}}</p>
        <p>Broj telefona: {{userDetails.phoneNumber}}</p>
      </div>
      <div class="profile_picture">
        <img :src="userDetails.picture" />
      </div>
      <button @click="editMode = true">Uredi</button>
    </div>
    <div v-if="editMode" class="user_data">
      <div class="info">
        <p>Ime:</p>
        <input v-model="userDetails.name" />
        <p>Prezime:</p>
        <input v-model="userDetails.surname" />
        <p>E-mail:</p>
        <input v-model="userDetails.email" />
        <p>Prebivalište:</p>
        <select v-model="userDetails.city.id">
          <option
            v-for="(city, i) in cities"
            v-bind:key="i"
            :value="city.id"
          >{{city.name}}, {{city.abbreviation}}</option>
        </select>
        <p>Fakultet:</p>
        <select v-model="userDetails.faculty.id">
          <option
            v-for="(faculty, i) in faculties"
            v-bind:key="i"
            :value="faculty.id"
          >{{faculty.name}}, {{faculty.abbreviation}}</option>
        </select>
        <p>Broj telefona:</p>
        <input v-model="userDetails.phoneNumber" />
      </div>
      <div class="profile_picture">
        <img :src="userDetails.picture" />
      </div>
      <button @click="editProfile">Spremi</button>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
     created() {
    axios
      .get("/userDetails/" + this.$store.state.userId)
      .then(resData => {
        this.userDetails = resData.data;
      })
      .catch(err => console.log(err));
    // fill faculty dropdown menu with values
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
    // fill city dropdown menu with values
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
  data() {
    return {
      userDetails: {},
      faculties: [],
      cities: [],
      editMode: false
    };
  },
  methods: {
      editProfile() {
          const user = {
              email: this.userDetails.email,
              name: this.userDetails.name,
              surname: this.userDetails.surname,
              phoneNumber: this.userDetails.phoneNumber,
              facultyId: this.userDetails.faculty.id,
              cityId: this.userDetails.city.id
          }
          axios.post('user/'+this.$store.state.userId, user)
          .then(resData => console.log(resData))
          .catch(err => console.log(err))
          
          this.editMode=false;
      }
  }
    
}
</script>

<style scoped>

.user_data {
  width: 70%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top: 2%;
}
.info,
.profile_picture {
  display: inline-block;
  width: 42%;
  vertical-align: top;
  padding: 30px;
}
img {
  max-width: 400px;
  width: 100%;
}

p,
input {
  display: inline-block;
  margin: 5px;
}
input{
  height: 35px;
}
select {
    margin: 5px;
}
button {
    margin: 5px;
}
</style>