<template>
  <div class="wrapper">
    <div class="form">
      <label>Studiram na...:</label>
      <select @change="getCourses()" v-model="facultyId">
        <option
          v-for="(faculty, i) in faculties"
          v-bind:key="i"
          :value="faculty.id"
        >{{faculty.name}}, {{faculty.abbreviation}}</option>
      </select>
      <label>Trebaju mi instrukcije iz...:</label>
      <select v-model="courseId" :disabled="isDisabled">
        <option
          v-for="(course, i) in courses"
          v-bind:key="i"
          :value="course.id"
        >{{course.name}}, {{course.abbreviation}}</option>
      </select>
      <label>Nalazim se u ...:</label>
      <select v-model="cityId">
        <option
          v-for="(city, i) in cities"
          v-bind:key="i"
          :value="city.id"
        >{{city.name}}, {{city.abbreviation}}</option>
      </select>

      <button type="submit" @click="search()">Pretraži</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
      facultyId: "",
      courseId: "",
      cityId: "",
      faculties: [],
      courses: [],
      cities: [],
      isDisabled: true
    };
  },
  methods: {
    // fill course dropdown menu with values
    getCourses() {
      console.log(this.facultyId);
      axios
        .get("/faculties/" + this.facultyId+"/courses")
        .then(resData => {
          this.isDisabled = false;
          const courses = [];
          for (let id in resData.data) {
            courses.push(resData.data[id]);
          }
          this.courses = courses;
        })
        .catch(err => {
          console.log(err);
          this.courses = [];
          this.isDisabled = true;
        });
    },
    search() {
      console.log(this.courseId);
      this.$router.push({path: "/searchResults",  query: { courseId: this.courseId, cityId: this.cityId }});
    }
  },
};
</script>

<style scoped>
.wrapper {
  max-width: 800px;
  width: 100%;
  height: 430px;
  background-color: white;
  margin: auto;
  margin-top: 3%;
  border-radius: 25px;
}

.form {
  width: 400px;
  margin: auto;
  margin-top: 5%;
}

select,
input {
  height: 35px;
  margin-bottom: 5%;
  margin-top: 2%;
  padding-left: 15px;
  font-size: 16px;
}

</style>