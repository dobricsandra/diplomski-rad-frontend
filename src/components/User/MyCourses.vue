<template>
<div class="my-courses">
     <p><strong>Držim instrukcije iz:</strong></p>
      <!-- <div v-if="courseAddMenu==true">Novi div</div> -->

          <div class="courses" v-for="(course,i) in courses" v-bind:key="i">
           <!-- <p v-if="!editCourseMode"> -->
      <p>{{course.name}} ({{course.abbreviation}}) za  {{course.faculty.name}} ({{course.faculty.abbreviation}}) | {{course.instructor_course.price}} </p>
    </div>
    
      <!-- za  kn/h -->
      <!-- <button
        class="small-button"
        @click="editCourseMode=true"
      >Izmijeni</button>
      <button class="small-button" @click="deleteCourse">Obriši</button>
    </p> -->
    <!-- <p v-if="editCourseMode">
      {{course.name}} ({{course.abbreviation}}) za {{course.faculty.abbreviation}} | Cijena: <input type="number" v-model="course.instructor_course.price" /> kn/h
      <button
        class="small-button"
        @click="saveNewPrice"
      >Spremi</button>
    </p>-->
      </div>
</template>

<script>
import axios from 'axios';
export default {
    created(){
            axios.get('/instructors/courses')
            .then(resData => {
                for(let id in resData.data.courses) {
                    this.courses.push(resData.data.courses[id])
                }
            })
            .catch(err => console.log(err))
        },
      
    data() {
        return {
            editCourseMode: false,
            courses: [],
            courseAddMenu: false,
            instructorId: ""
        }
    }
}
</script>
<style scoped>
.my-courses {
     width: 100%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top: 2%;
  padding-bottom: 10px;
}
</style>
