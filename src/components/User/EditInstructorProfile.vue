<template>
<div class="wrapper">
  <div v-if="readInfo" class="my-instructor-info">
      <p><strong>Stupanj obrazovanja:</strong> {{instructorDetails.degree.name}} ({{instructorDetails.degree.abbreviation}})</p>
      <p><strong>Držim instrukcije iz:</strong></p>
      <div class="courses" v-for="(course,i) in instructorDetails.courses" v-bind:key="i">
      <p>{{course.name}} ({{course.abbreviation}}) za {{course.faculty.abbreviation}} | {{course.instructor_course.price}} kn/h</p>
        </div>
        <p><strong>Lokacija:</strong> {{instructorDetails.address}}</p>
      <p><strong>Kratko o meni: </strong><br /> {{instructorDetails.description}}</p>
      <button @click="readInfo=false; editInfo=true; showCalendar=false">Izmijeni podatke</button>
      <button @click="readInfo=false; editInfo=false; showCalendar=true">Uredi kalendar</button>
  </div>

    <div v-if="editInfo" class="my-instructor-info">
      <p><strong>Stupanj obrazovanja:</strong> 
      <select v-model="instructorDetails.degree.id">
          <option
            v-for="(degree, i) in degrees"
            v-bind:key="i"
            :value="degree.id"
          >{{degree.name}}, {{degree.abbreviation}}</option>
        </select></p>

      <p><strong>Držim instrukcije iz:</strong></p>

      <div class="courses" v-for="(course,i) in instructorDetails.courses" v-bind:key="i">
          <app-instructor-courses :course="course" :instructorId="instructorDetails.id"></app-instructor-courses>
      </div>
      
      <p><strong>Lokacija:</strong><br /> <input v-model="instructorDetails.address" maxlength="50" /></p>
      <p><strong>Kratko o meni: </strong><br /> <textarea v-model="instructorDetails.description" maxlength="250"></textarea></p>
      <button @click="saveInstructorData">Spremi</button>
  </div>
  <div v-if="showCalendar">
   <h3> Kalendar: </h3>
      <app-instructor-calendar :instructorDetails="instructorDetails"></app-instructor-calendar>
      </div>
</div>
</template>

<script>
import axios from "axios";
import Calendar from './InstructorCalendar.vue';
import InstructorCourses from './InstructorCourses.vue';
export default {
  created() {
     axios
      .get("/instructor/" + this.$store.getters.getInstructorId.instructorId)
      .then(resData => {
        this.instructorDetails = resData.data;
      })
      .catch(err => console.log(err));

      axios
       .get('/degree')
       .then(resData => {
           const degrees = [];
            for (let id in resData.data) {
            degrees.push(resData.data[id]);
            }
        this.degrees = degrees;
       })
       .catch(err => console.log(err))
  },
  data() {
    return {
      instructorDetails: { user: {faculty: {}}, degree:{}},
      showCalendar: false,
      readInfo: true,
      editInfo: false,
      degrees: [],
      editCourseMode: false
    };
  },
  methods: {
      saveInstructorData(){

      axios.post('/instructor/' + this.instructorDetails.id, {address: this.instructorDetails.address, description: this.instructorDetails.description, degreeId: this.instructorDetails.degree.id })
      .then(resData =>
      {
          console.log(resData);
          this.readInfo=true; 
          this.editInfo=false;
      })
      .catch(err=>console.log(err))
      }
  },
  components: {
      "app-instructor-calendar": Calendar,
      "app-instructor-courses": InstructorCourses
  }
};
</script>

<style scoped>
.wrapper {
  background-color: white;
  width: 90%;
  margin: auto;
}
.my-instructor-info {
  display:block;
  width: 80%;
  margin: auto;
  padding: 20px;
  background-color: rgb(235, 57, 57, 0.2);
  margin-top: 5%;
}
.courses{
    margin-left: 3%;
}
button {
    margin-top: 20px;
}
textarea {
    width: 100%;
    height: 100px;
    font-size: 20px;
}
select {
    margin:0px;
}
.small-button{
    width: 120px;
    height: 30px;
    display:inline-block;
    margin: 0px;
}
nav {
    width: 70%;
    margin:auto;
}
nav > button {
    display: inline-block;
    width: 30%;
    margin-top: 20px;
    margin-bottom:0px;
}
h3{
  margin:3% 2%;
  margin-top: 5%;
  font-size: 40px;
}
</style>