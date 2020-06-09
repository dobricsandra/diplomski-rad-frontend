<template>
  <div class="wrapper">
    <div class="content">
      <label>Naziv:</label>
      <input :class="{invalid:$v.name.$error}" type="text" v-model="name" />
      <p class="invalid" v-if="!$v.name.required">Ime grada je obavezno!</p>
      <label>Kratica:</label>
      <input :class="{invalid:$v.abbreviation.$error}" type="text" v-model="abbreviation" />
      <p class="invalid" v-if="!$v.abbreviation.required">Kratica je obavezna!</p>
      <label>Poštanski broj:</label>
      <input :class="{invalid:$v.postalCode.$error}" type="number" v-model="postalCode" />
      <p class="invalid" v-if="!$v.postalCode.minLength || !$v.postalCode.maxLength">Upišite ispravan poštanski broj!</p>
      <label>Država:</label>
      <select :class="{invalid:$v.countryId.$error}" v-model="countryId">
        <option
          v-for="(country, i) in countries"
          v-bind:key="i"
          :value="country.id"
        >{{country.name}}, {{country.abbreviation}}</option>
      </select>
     
    </div>
    <button @click="addCity()">Dodaj</button>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  created() {
    axios
      .get("/countries")
      .then(resData => {
        const countries = [];
        console.log(resData.data.id);
        for (let id in resData.data) {
          countries.push(resData.data[id]);
        }
        this.countries = countries;
      })
      .catch(err => console.log(err));
  },
  methods: {
      addCity() {
          axios.post('/admin/cities', {name:this.name , abbreviation:this.abbreviation , postalCode: this.postalCode, countryId: this.countryId})
            .then(resData => {
                this.$router.push('/admin/cities');
            })
            .catch(err => console.log(err))
      }
  },
  data() {
    return {
      name: "",
      abbreviation: "",
      postalCode: "",
      countries: [],
      countryId: ""
    };
  },
  validations: {
      name: {
          required,
      },
      abbreviation: {
          required
      },
      postalCode: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(5)
      },
      countryId: {
          required
      }
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
input.invalid, select.invalid {
  border: 1px solid red;
}

p.invalid {
  color: red;
  font-size: 12px;
}

</style>
