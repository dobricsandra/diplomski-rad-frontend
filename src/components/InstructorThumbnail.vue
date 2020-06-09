<template>
  <div>
      <div class="instructions_result_item">
      <h4>{{instructor.user.name}} {{instructor.user.surname}} </h4>
      <p>{{instructor.user.city.name}} </p>
      <img
        src="https://cdn3.vectorstock.com/i/1000x1000/08/37/profile-icon-male-user-person-avatar-symbol-vector-20910837.jpg"
      />
      <p>{{instructor.user.faculty.abbreviation}}, {{instructor.degree.abbreviation}} </p>
      <p>{{averageMark}}</p>
      <button @click="$router.push('/instructor-profile/' + instructorId)">Više...</button>
      </div>
   
  </div>
</template>

<script>
import axios from "axios";
import InstructorProfile from './InstructorProfile.vue';
export default {
  props: ["instructorId"],
  created() {
    axios
      .get("/instructors/" + this.instructorId)
      .then(resData => {
        this.instructor = resData.data;
        this.instructorId = this.instructor.id;
        //very important, elseway it will be NaN (interpreted as string)
        let review=0;
        let counter=0;
        if(this.instructor.reviews[0] != null) {
         for (let id in this.instructor.reviews) {
          review = this.instructor.reviews[id].reviewMark + review;
          counter++;
        }
     
          console.log(review);
        this.averageMark = (review / counter).toFixed(2);
        }
        else{
          this.averageMark = "Nema ocjenu!";
        }
      })
      .catch(err => console.log(err));
  },
  destroyed() {
    this.user = {};
  },
  data() {
    return {
      instructor: { 
        user: {
          faculty: {}
        },
        degree: {},
        reviews: []
      },
      averageMark: ""
  
      };
  },
  methods: {
    submit(){
      this.$router.push('/instructor-profile/' + this.instructorId) //TODO: fix this!
    }
  }
};
</script>

<style scoped>
.instructions_result_item {
  width: 200px;
  display: inline-block;
  margin-left: 1.5%;
}

.instructions_result_item img {
  max-width: 100px;
  width: 100%;
  margin: 8px 0px;
}
button {
    background-color:rgba(198, 56, 63, 0.8);
    margin: 5px;
    width: 70%;
    height:40px;
    margin:auto;
    margin-bottom:10px;
    margin-top: 10px;
}
button:hover{
  background-color:orangered;
  text-decoration: underline;
}
h4 {
  margin-bottom:5px;
}
p{
  margin-top:2px;
  margin-bottom: 8px;
}
</style>