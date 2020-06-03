<template>
<div class="wrapper">
  <div v-if="readInfo" class="my-instructor-info">
    <div class="content">
      <p><strong>Stupanj obrazovanja:</strong> {{instructorDetails.degree.name}} ({{instructorDetails.degree.abbreviation}})</p>
      <p v-if="instructorDetails.courses.length"><strong>Držim instrukcije iz:</strong></p>
      <div class="courses" v-for="(course,i) in instructorDetails.courses" v-bind:key="i">
      <p>{{course.name}} ({{course.abbreviation}}) za {{course.faculty.abbreviation}} | {{course.instructor_course.price}} kn/h</p>
        </div>
        <p><strong>Lokacija:</strong> {{instructorDetails.address}}</p>
      <p><strong>Kratko o meni: </strong><br /> {{instructorDetails.description}}</p>
      </div>
      <button @click="readInfo=false; editInfo=true; showCalendar=false">Izmijeni podatke</button>
  </div>

    <div v-if="editInfo" class="my-instructor-info">
      <div class="content">
      <p><strong>Stupanj obrazovanja:</strong> 
      <select v-model="instructorDetails.degree.id">
          <option
            v-for="(degree, i) in degrees"
            v-bind:key="i"
            :value="degree.id"
          >{{degree.name}}, {{degree.abbreviation}}</option>
        </select></p>
      
      <p><strong>Lokacija:</strong><br /> <input v-model="instructorDetails.address" maxlength="50" /></p>
      <p><strong>Kratko o meni: </strong><br /> <textarea v-model="instructorDetails.description" maxlength="250"></textarea></p>
      </div>
      <button @click="saveInstructorData">Spremi</button>

  </div>

</div>
</template>

<script>
import axios from "axios";
export default {
  created() {
     axios
      .get("/instructors/" + this.$store.getters.getInstructorId.instructorId)
      .then(resData => {
        this.instructorDetails = resData.data;
      })
      .catch(err => console.log(err));

      axios
       .get('/degrees')
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
      editCourseMode: false,
      courseAddMenu: false
    };
  },
  methods: {
      saveInstructorData(){

      axios.post('/instructors/' + this.instructorDetails.id, {address: this.instructorDetails.address, description: this.instructorDetails.description, degreeId: this.instructorDetails.degree.id })
      .then(resData =>
      {
          const degree = this.degrees.find(degree => degree.id == this.instructorDetails.degree.id);
          this.instructorDetails.degree.name = degree.name;
          this.instructorDetails.degree.abbreviation = degree.abbreviation;
          console.log(resData);
          this.readInfo=true; 
          this.editInfo=false;
      })
      .catch(err=>console.log(err))
      },
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  padding-bottom:50px;
  margin-top:2%;
}
.my-instructor-info {
  width:100%;
  margin:auto;
  padding: 20px;
}

.courses{
    margin-left: 3%;
}

textarea {
    width: 100%;
    height: 120px;
    font-size: 20px;
}
select {
    margin:0px;
}

button {
    background-color:rgba(198, 56, 63, 0.8);
    margin:auto;
    margin-top:5%;
    width: 70%;
    height:80px;
    
}
.content {
  width:48%;
  margin:auto;
  margin-top:3%;
}
h3{
  margin:3% 2%;
  margin-top: 5%;
  font-size: 40px;
}
p{
  font-size:20px;
}
</style>