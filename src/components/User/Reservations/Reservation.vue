<template>
  <div>
    <div class="wrapper">
      <div v-if="!isCancelledByInstructor()" class="active">
        <h3>{{datetime(reservation.term.startTime)}}</h3>
        <div>
          <p>Lokacija: {{reservation.term.instructor.address}}</p>
          <p>Kolegij: {{reservation.course.name}}, {{reservation.course.faculty.abbreviation}}</p>
          <p>Instruktor: {{reservation.term.instructor.user.name}} {{reservation.term.instructor.user.surname}}</p>
          <p>Kontakt: {{reservation.term.instructor.user.phoneNumber}}, {{reservation.term.instructor.user.email}}</p>
        </div>
        <div>
          <button class="cancel-button" v-if="status=='future'">Otkaži</button>
        </div>
        <div class="review" v-if="status=='past'">
          Ocjena:
          <button class="rate" id="1" @click="postReview">1</button>
          <button class="rate" id="2" @click="postReview">2</button>
          <button class="rate" id="3" @click="postReview">3</button>
          <button class="rate" id="4" @click="postReview">4</button>
          <button class="rate" id="5" @click="postReview">5</button>
        </div>
      </div>
      <div v-if="isCancelledByInstructor()" class="cancelled">
        <h3>{{datetime(reservation.cancelledTerm)}}</h3>
        <p>Kolegij: {{reservation.course.name}}, {{reservation.course.faculty.abbreviation}}</p>
        <span>OTKAZANO!</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["reservation", "status"],
  created() {
    axios
      .get("/getReviewFromUser/" + this.reservation.term.instructor.id)
      .then(resData => {
        if (resData.data.status == 0) {
          return true;
        }
        console.log(resData.data);
        if(document.getElementById(resData.data.mark)){
          document.getElementById(resData.data.mark).style.backgroundColor = "red";
        }
        return false;
      })
      .then(err => {
        console.log(err);
      });
  },
  methods: {
    datetime(startTime) {
      console.log(this.status);
      return (
        startTime.slice(6, 8) +
        "." +
        startTime.slice(4, 6) +
        "." +
        startTime.slice(0, 4) +
        " u " +
        startTime.slice(8, 10) +
        ":00h"
      );
    },
    isCancelledByInstructor() {
      if (this.reservation.isCancelledByInstructor != null) {
        return true;
      }
      return false;
    },
    postReview() {
      if(!confirm('Jeste li sigurni da želite ocijeniti instruktora ocjenom ' + event.target.id +'?' )){
        return;
      }
      const mark = event.target.id;
      axios
        .get("/getReviewFromUser/" + this.reservation.term.instructor.id)
        .then(resData => {
          if (resData.data.status === 0) {
            console.log(resData.data);
             axios.post("/reviews/" + this.reservation.term.instructor.id, { mark: mark })
             .then(resData => {
              console.log(resData);
              console.log(mark);
              document.getElementById(mark).style.backgroundColor = "red";
              })
              .catch(err => console.log(err))
              }
          else {
             axios
          .post("/editreview/" + this.reservation.term.instructor.id, {
            mark: mark})
          .then(resData => {
            console.log(resData);
            for (let i = 0; i < 5; i++) {
              document.getElementsByClassName("rate")[i].style.backgroundColor =
                "grey";
            }
            document.getElementById(mark).style.backgroundColor = "red";
          })
          .catch(err => console.log(err));
          }
        })
      
      
    }}
  
};
</script>

<style scoped>
p,
h3 {
  margin: 1%;
}
.cancelled {
  background-color: #c402029e;
  padding: 25px;
}
.cancelled span {
  font-size: 30px;
  font-weight: bold;
  padding: 2.5%;
}
.active {
  margin-top: 2%;
  background-color: rgba(26, 167, 26, 0.59);
  padding: 5px;
}
button {
  margin: 2%;
  width: 60%;
}
.review {
  margin-left: 5%;
}
.rate {
  margin: 2% 0;
  width: 40px;
  height: 40px;
  background-color: gray;
  display: inline-block;
}
.rate:hover {
  background-color: pink;
}
.cancel-button {
  width: 100%;
  height: 80px;
  background-color: #cb4c4c;
}
.active > div {
  display: inline-block;
}
.active > div:first-of-type {
  width: 60%;
}
.active > div:last-of-type {
  width: 30%;
  float: right;
  margin-right: 3%;
}
.wrapper {
  display: inline;
  vertical-align: top;
}
</style>