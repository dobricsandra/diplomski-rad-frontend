<template>
<div>
     <div v-if="!editMode" class="user_data show">
      <div class="info">
        <p><strong>Ime i prezime:</strong> {{userDetails.name}} {{userDetails.surname}}</p>
        <p><strong>E-mail adresa:</strong> {{userDetails.email}}</p>
        <p><strong>Prebivalište:</strong> {{userDetails.city.name}}, {{userDetails.city.country.name}}</p>
        <p><strong>Fakultet:</strong> {{userDetails.faculty.name}}</p>
        <p><strong>Broj telefona:</strong> {{userDetails.phoneNumber}}</p>
      </div>
      <div class="profile_picture">
        <img :src="userDetails.picture" />
      </div>
      <button @click="editMode = true">Uredi</button>
    </div>

    <div v-if="editMode" class="user_data">
      <div class="info form">
        <div>
        <p>Ime:</p>
        <input v-model="userDetails.name" />
        </div>
        <div>
        <p>Prezime:</p>
        <input v-model="userDetails.surname" />
        </div>
        <div>
        <p>E-mail:</p>
        <input v-model="userDetails.email" />
        </div>
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
      .get("/faculties")
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
          axios.post('users/'+this.$store.state.userId, user)
          .then(resData => console.log(resData))
          .catch(err => console.log(err))
          
          this.editMode=false;
      }
  }
    
}
</script>

<style scoped>

.user_data {
  width: 100%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top: 2%;
  padding-bottom:50px;
}
.user_data.show {
  padding: 50px 0px;
}
.info,
.profile_picture {
  display: inline-block;
  width: 42%;
  vertical-align: top;
  padding: 30px;
}
img {
  max-width: 300px;
  width: 100%;
}
.show .info {
  margin-top:3%;
}
.show .info p {
  font-size:25px;
  margin-bottom:15px;
}
p,
input {
  display: inline-block;
  margin: 5px;
}
input{
}
select {
    margin: 5px;
}
button {
    background-color:rgba(198, 56, 63, 0.8);
    margin: 5px;
    width: 70%;
    height:80px;
    margin:auto;
}
.profile_picture {
  float:right;
  text-align:center;
}
.form div input {
  height: 40px;
  width:400px;
  float:right;
}
.form div input:last-of-type {
  height: 40px;
  width:400px;
  float:right;
  margin-bottom:2%;
}
.form div p {
  float:left;
  line-height: 45px;;
}
</style>