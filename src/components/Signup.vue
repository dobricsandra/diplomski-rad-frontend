<template>
  <div>
    <form @submit.prevent="signUp">
      <label>E-mail:</label>
      <input :class="{invalid:$v.email.$error}" placeholder="npr. primjer@primjer.hr" type="text" v-model="email" @input="$v.email.$touch()" />
      <p class="invalid" v-if="!$v.email.email">E-mail mora biti u ispravnom formatu!</p>
      <label>Lozinka:</label>
      <input :class="{invalid:$v.password.$error}" type="password" v-model="password" required @input="$v.password.$touch()" />
      <p class="invalid" v-if="!$v.password.minLength">Lozinka mora imati najmanje 6 znakova!</p>
      <label>Ime:</label>
      <input :class="{invalid:$v.name.$error}" type="text" v-model="name" required @input="$v.name.$touch()" />
      <label>Prezime:</label>
      <input :class="{invalid:$v.surname.$error}" type="text" v-model="surname" required @input="$v.surname.$touch()" />
      <label>Broj mobitela:</label>
      <input :class="{invalid:$v.phoneNumber.$error}" type="text" placeholder="npr. 0912512969" v-model="phoneNumber" required @input="$v.phoneNumber.$touch()" />
      <p class="invalid" v-if="!$v.phoneNumber.minLength || !$v.phoneNumber.maxLength ">Unesite ispravan broj mobitela!</p>
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
import { required, email, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  created() {
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
      email: "",
      password: "",
      name: "",
      surname: "",
      phoneNumber: "",
      facultyId: "",
      cityId: "",
      faculties: [],
      cities: []
    };
  },
  validations: {
    email: {
      required,
      email,
      minLength: minLength(5)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    name: {
      required,
    },
    surname: {
      required,
    },
    phoneNumber: {
      required,
      minLength: minLength(9),
      maxLength: minLength(10)
    }
  },
  methods: {
    signUp() {
      const user = {
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname,
        phoneNumber: this.phoneNumber,
        picture:
          "https://cdn4.iconfinder.com/data/icons/avatars-circle-2/72/146-512.png", // TODO: change this both here and in API
        facultyId: this.facultyId,
        cityId: this.cityId
      };
      console.log(user);
      axios
        .post("/signup", user)
        .then(resData => {
          console.log(resData);
          this.$router.push('/login');
          })
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

input.invalid {
  border: 1px solid red;
}

p.invalid {
  color: red;
  font-size: 12px;
}

</style>