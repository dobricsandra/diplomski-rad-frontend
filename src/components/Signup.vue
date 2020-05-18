<template>
  <div>
    <form @submit.prevent="signUp">
      <p>{{userCreatedMessage}}</p>
      <label>E-mail:</label>
      <input placeholder="npr. primjer@primjer.hr" type="text" v-model="email" required />
      <label>Lozinka:</label>
      <input type="password" v-model="password" required />
      <label>Ime:</label>
      <input type="text" v-model="name" required />
      <label>Prezime:</label>
      <input type="text" v-model="surname" required />
      <label>Broj mobitela:</label>
      <input type="text" placeholder="npr. 0912512969" v-model="phoneNumber" required />
      <label>Studiram/studirao sam na...:</label>
      <select v-model="facultyId">
        <option
          v-for="(faculty, i) in faculties"
          v-bind:key="i"
          :value="faculty.id"
        >{{faculty.name}}, {{faculty.abbreviation}}</option>
      </select>
      <label>Nalazim se u ...:</label>
      <select v-model="cityId">
        <option
          v-for="(city, i) in cities"
          v-bind:key="i"
          :value="city.id"
        >{{city.name}}, {{city.abbreviation}}</option>
      </select>

      <button type="submit">Registriraj se</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

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
  data() {
    return {
      email: "",
      password: "",
      name: "",
      surname: "",
      phoneNumber: "",
      facultyId: "",
      cityId: "",
      faculties: [],
      cities: [],
      userCreatedMessage: ""
      
    };
  },
  methods: {
    signUp() {
      const user = {
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname,
        phoneNumber: this.phoneNumber,
        picture: "blabla",
        facultyId: this.facultyId,
        cityId: this.cityId
      };
      console.log(user);
      axios
        .post("/signup", user)
        .then(resData => console.log(resData))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
div {
  max-width: 800px;
  width: 100%;
  height: 700px;
  background-color: white;
  margin: auto;
  margin-top: 3%;
  border-radius: 25px;
}

form {
  width: 400px;
  margin: auto;
  margin-top: 5%;
}

select,
input {
  height: 35px;
  margin-bottom: 2%;
  margin-top: 2%;
  padding-left: 15px;
  font-size: 16px;
}
</style>