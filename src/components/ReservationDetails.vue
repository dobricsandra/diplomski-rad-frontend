<template>
  <div>
      <p>
          Potvrdite rezervaciju za instrukcije iz kolegija:
                <select v-model="courseId">
        <option
          v-for="(course, i) in courses"
          v-bind:key="i"
          :value="course.id"
        >{{course.name}} ({{course.abbreviation}}) za {{course.faculty.name}} | {{course.instructor_course.price}} kn/h</option>
      </select>
        </p>
        <p>Dodatni komentar:  </p>
        <textarea v-model="comment" maxlength="250"></textarea> 
  </div>
</template>
<script>
import axios from 'axios';
export default {
    props: ['termStartTime'],
    created() {
        console.log(this.$route.params.id);
        let reservationId;
        axios.get('/instructors/'+ this.$route.params.id)
        .then (resData => {
            this.instructorDetails = resData.data;
            for(let id in resData.data.courses){
                this.courses.push(resData.data.courses[id]);
            }
        }
        )

       
        },
        updated() {
            this.$emit('reservationDetails', {courseId: this.courseId, comment:this.comment});
            console.log(this.courseId);
            console.log("eeej");
        },
        data() {
            return {
                reservationDetails: {},
                courses: [],
                instructorDetails: {},
                comment: "",
                courseId: ""
            }
        }
    
};
</script>

<style scoped>
textarea {
    width: 100%;
    height: 100px;
    font-size: 20px;
}
select,
option {
  height: 45px;
  margin-bottom: 5%;
  margin-top: 2%;
  padding-left: 15px;
  font-size: 18px;
}
</style>
