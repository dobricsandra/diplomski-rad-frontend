<template>
  <div class="search">
    <div>
      <label>Fakultet:</label>
      <select @change="getCourses()" v-model="facultyId">
        <option
          v-for="(faculty, i) in faculties"
          v-bind:key="i"
          :value="faculty.id"
        >{{faculty.name}}, {{faculty.abbreviation}}</option>
      </select>
      <label>Kolegij:</label>
      <select v-model="courseId" :disabled="isDisabled">
        <option
          v-for="(course, i) in courses"
          v-bind:key="i"
          :value="course.id"
        >{{course.name}}, {{course.abbreviation}}</option>
      </select>
      <label>Grad:</label>
      <select v-model="cityId">
        <option
          v-for="(city, i) in cities"
          v-bind:key="i"
          :value="city.id"
        >{{city.name}}, {{city.abbreviation}}</option>
      </select>
      <button type="submit" @click="search()">Pretraži</button>
    </div>
    <router-view :key="$route.fullPath"></router-view>
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
      this.$router.push({path: "/search/results",  query: { courseId: this.courseId, cityId: this.cityId }});
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

.search {
  background-color: rgba(255, 255, 255, 0.9);
  width: 85%;
  margin: 1% auto;
  padding: 2% 4%;

}
select,
input {
  display:inline-block;
  height: 35px;
  padding-left: 15px;
  font-size: 16px;
  width: 20%;
  margin:15px;
}
label, button {
  display:inline-block;
}
button {
  height: 40px;
  width: 200px;
  margin:0px;
}
</style>