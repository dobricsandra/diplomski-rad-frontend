<template>
  <div class="my-courses">
<div v-if="!courses.length && loaded" class="row">Ne postoji nijedan kolegij! </div>
    <div v-if="courses.length" class="row">
        <div class="col "><p>Naziv</p></div>
        <div class="col smaller"> <p>Kratica</p></div>
        <div class="col bigger"> <p>Fakultet</p></div>
        <div class="col smaller"></div>
        <div class="col smaller"></div>
      </div>

        <div class="courses" v-for="(course,i) in courses" v-bind:key="i">
            <app-course :course="course" v-on:deletedCourseId="receivedCourseId"></app-course>
        </div>
 
    <router-link tag="button" to="/admin/courses/add-new-course" exact >Dodaj novi kolegij</router-link>

  </div>
</template>

<script>
import axios from "axios";
import Course from './Course.vue';
export default {
  created() {
    axios
      .get("/courses")
      .then(resData => {
        for (let id in resData.data) {
          this.courses.push(resData.data[id]);
        }
        this.loaded = true;
      })
      .catch(err => console.log(err));
   
  },

  data() {
    return {
      editCourseMode: false,
      courses: [],
      courseAddMenu: false,
      loaded: false
    };
  },

  components: {
      'app-course': Course
  }
};
</script>
<style scoped>
.my-courses {
  width: 100%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top: 2%;
  padding-bottom: 50px;
  padding-top:50px;
}

.row {
width: 90%;
padding:0px 2%;
margin:auto;
border-bottom: 3pt solid rgb(235, 57, 57, 0.2);

}
.col {
  width: 20%;
  text-align: center;
  display:inline-block;
  vertical-align: middle;
}
.bigger {
    width: 30%;
}
.smaller{
    width:14%;
}
.row p {
    font-size: 20px;
    font-weight: bold;
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
    width: 60%;
    margin:auto;
    display:inline-block;
}
</style>
