<template>
<div class="wrapper">
   <h3>{{instructorDetails.user.name}} {{instructorDetails.user.surname}}</h3>
      <p>{{instructorDetails.degree.abbreviation}}, {{instructorDetails.user.faculty.abbreviation}}</p>
  <div class="instructor_intro">
         
      <div class="col">
      
      <p><strong>Držim instrukcije u: </strong> {{instructorDetails.user.city.name}}, {{instructorDetails.address}}</p>
      <p class="contact"><strong>mail: </strong>{{instructorDetails.user.email}}</p>
      <p class="contact"><strong>tel.: </strong>{{instructorDetails.user.phoneNumber}}</p>
      <p><strong>Ocjena:</strong> {{averageMark}} ({{numberOfReviews}} glasova)</p>
      <!-- <button id="send_message_to_instructor">Pošalji poruku</button> -->
      <!-- <div id="myModal" class="modal">
                        <div class="modal-content">
                            <span id="close" class="close">&times;</span>
                            <p>Some text in the Mo
                                dal..</p>
                            <textarea></textarea>
                            <button>Pošalji</button>
                        </div>
      </div>-->

    </div>
    <div class="col">
      <p>Držim instrukcije iz:</p>
      <div v-for="(course,i) in instructorDetails.courses" v-bind:key="i">
      <p>{{course.name}} ({{course.abbreviation}}) - {{course.faculty.abbreviation}} | {{course.instructor_course.price}} kn/h</p>
        </div>
      <br />
    </div>
    <div class="col">
    <p><strong>O meni: </strong><i>"{{instructorDetails.description}}"</i></p>
    </div>
  </div>


   <h3> Slobodni termini: </h3>
      <app-instructor-calendar :instructorDetails="instructorDetails"></app-instructor-calendar>
      </div>
       
    
</template>

<script>
import axios from "axios";
import Calendar from './InstructorCalendar.vue';
export default {
  created() {
    axios
      .get("/instructors/" + this.instructorId)
      .then(resData => {
        this.instructorDetails = resData.data;
        //very important, elseway it will be NaN (interpreted as string)
        let review = 0;
        let counter = 0;
        if (this.instructorDetails.reviews[0] != null) {
          for (let id in this.instructorDetails.reviews) {
            review = this.instructorDetails.reviews[id].reviewMark + review;
            counter++;
          }

          console.log(review);
          this.averageMark = (review / counter).toFixed(2);
          this.numberOfReviews = counter;
        } else {
          this.averageMark = "Nema ocjenu!";
          this.numberOfReviews = 0;
        }
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      instructorId: this.$route.params.id,
      instructorDetails: { user: {faculty: {}}, degree:{}},
      averageMark: "",
      numberOfReviews: ""
    };
  },
  components: {
      "app-instructor-calendar": Calendar
  }
};
</script>

<style scoped>

.wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  width: 85%;
  margin: 1% auto;
  padding: 2% 4%;
}
.instructor_intro {
  width: 90%;
  padding: 15px 40px;
  vertical-align: top;
  display: flex;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top: 1%;
}
.col
{
  display: inline-block;
  width: 33%;
  text-align:left
}



/* .basic_info button {
  margin-top: 4%;
  width: 70%;
} */


h3 {
  font-size: 25px;
  margin:0px;
  margin-top: 1.5%

}
p {
  margin: 0px;
  margin-bottom: 5px;
}
.contact {
  margin-left: 30px;
}
</style>