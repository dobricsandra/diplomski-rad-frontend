<template>
  <div class="my-courses">
<div v-if="!faculties.length && loaded" class="row">Ne postoji nijedan fakultet! </div>
    <div v-if="faculties.length" class="row">
        <div class="col"> <p>Naziv</p></div>
        <div class="col smaller"> <p>Kratica</p></div>
        <div class="col"> <p>Grad</p></div>
        <div class="col smaller"></div>
        <div class="col smaller"></div>
        <div class="col "></div>
      </div>

        <div class="courses" v-for="(faculty,i) in faculties" v-bind:key="i">
            <app-faculty :faculty="faculty" v-on:deletedFacultyId="receivedFacultyId"></app-faculty>
        </div>
 
    <router-link tag="button" to="/admin/faculties/add-new-faculty" exact >Dodaj novi fakultet</router-link>

  </div>
</template>

<script>
import axios from "axios";
import Faculty from './Faculty.vue';
export default {
  created() {
    axios
      .get("/faculties")
      .then(resData => {
        for (let id in resData.data) {
          this.faculties.push(resData.data[id]);
        }
        this.loaded = true;
      })
      .catch(err => console.log(err));
   
  },

  data() {
    return {
      editCourseMode: false,
      faculties: [],
      courseAddMenu: false,
      instructorId: "",
      loaded: false
    };
  },
    methods: {
    receivedFacultyId(deletedFacultyId) {
      this.faculties.splice(this.faculties.findIndex(item => item.id === deletedFacultyId), 1);
    }
  },

  components: {
      'app-faculty': Faculty
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
  width: 18%;
  text-align: center;
  display:inline-block;
}
.smaller{
    width:10%;
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
    width: 40%;
    margin:auto;
    display:inline-block;
}
.col:first-child {
    width: 30%;
}
</style>
