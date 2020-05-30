<template>
<div>
  <div class="instructor_intro">
    <div class="basic_info">
      <p>{{instructorDetails.user.name}} {{instructorDetails.user.surname}}</p>
      <p>{{instructorDetails.degree.abbreviation}}, {{instructorDetails.user.faculty.abbreviation}}</p>
      <p>Lokacija: {{instructorDetails.address}}</p>
      <p>Ocjena: {{averageMark}} ({{numberOfReviews}} glasova)</p>
      <button id="send_message_to_instructor">Pošalji poruku</button>
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
    <div class="instructor_picture">
      <img src="https://www.dictionary.com/e/wp-content/uploads/2019/09/vscogirl1000x700.jpg" />
    </div>
    <div class="details_info">
      <p>Držim instrukcije iz:</p>
      <div v-for="(course,i) in instructorDetails.courses" v-bind:key="i">
      <p>{{course.name}} ({{course.abbreviation}}) - {{course.faculty.abbreviation}} | {{course.instructor_course.price}} kn/h</p>
        </div>
      <br />
      <p>Kratko o meni: <br /> {{instructorDetails.description}}</p>
    </div>
    
  </div>
   <h3> Slobodni termini: </h3>
      <app-instructor-calendar :instructorDetails="instructorDetails"></app-instructor-calendar>
      </div>
       
    
</template>

<script>
import axios from "axios";
import Calendar from './Calendar.vue';
export default {
  created() {
    axios
      .get("/instructor/" + this.instructorId)
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
div {
  background-color: white;
  width: 85%;
  margin: auto;
}
.instructor_intro {
  width: 85%;
  margin: auto;
  padding: 20px;
  vertical-align: top;
  display: flex;
}
.basic_info,
.details_info,
.instructor_picture {
  display: inline-block;
}

.basic_info {
  width: 20%;
}

.basic_info button {
  margin-top: 4%;
  width: 70%;
}
.instructor_picture {
  width: 30%;
}
.instructor_picture img {
  height: 165px;
}

.details_info {
  width: 50%;
}
h3 {
  margin: 2% 4%;
  font-size: 30px;
}
</style>