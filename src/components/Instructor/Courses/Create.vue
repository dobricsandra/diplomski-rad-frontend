<template>
  <div class="wrapper">
    <div class="content">
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
      <label>Cijena (kn/h):</label>
      <input type="number" v-model="price" />
    </div>
    <button @click="addCourseToInstructor()">Dodaj</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
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
  },
  methods: {
    getCourses() {
      axios
        .get("/faculties/" + this.facultyId + "/courses")
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
    addCourseToInstructor() {
        axios.post('/instructors/courses', {courseId:this.courseId, price:this.price})
        .then(resData => {
            this.$router.push('/home/my-courses/');
        }).catch(err => console.log(err))
    }
  },
  data() {
    return {
      faculties: [],
      courses: [],
      courseId: "",
      facultyId: "",
      price:"",
      isDisabled: true 
    };
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
</style>
