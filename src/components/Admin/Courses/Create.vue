<template>
  <div class="wrapper">
    <div class="content">
      <label>Naziv:</label>
      <input type="text" v-model="name" />
      <label>Kratica:</label>
      <input type="number" v-model="postalCode" />
      <label>Fakultet:</label>
      <select v-model="facultyId">
        <option
          v-for="(course, i) in courses"
          v-bind:key="i"
          :value="course.id"
        >{{course.name}}, {{course.abbreviation}}</option>
      </select>
     
    </div>
    <button @click="addCourse()">Dodaj</button>
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
      addCity() {
          axios.post('/admin/courses', {name:this.name , abbreviation:this.abbreviation , facultyId: this.facultyId})
            .then(resData => {
                this.$router.push('/admin/courses');
            })
            .catch(err => console.log(err))
      }
  },
  
  data() {
    return {
      name: "",
      abbreviation: "",
      faculties: [],
      facultyId: ""
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
input {
    margin: 10px;
    margin-left:0px;
}
</style>
