<template>
  <div class="wrapper">
    <div class="legend"><div class="icon grey"></div>Nedostupni termini</div>
    <div class="legend"><div class="icon white"></div>Slobodni termini</div>
    <div class="legend"><div class="icon green"></div>Vaše rezervacije</div>
    <div class="timetable">
      <table v-if="terms.length || startCalendar==true" id="timetable_table">
        <tr>
          <th
            v-for="(day, i) in next7Days"
            v-bind:key="i"
          >{{day.croatianDayName}} {{day.shortDateString}}</th>
        </tr>
        <tr v-for="i in 16" v-bind:key="i">
          <td v-for="(day, j) in next7Days" v-bind:key="j">
            <app-term 
              :id="calculateId(i+7, day.day, day.month, day.year)"
              :terms="terms"
            >{{i + 7}}:00 h - {{i+8}}:00h</app-term>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Term from "./Term.vue";
export default {
  created() {
    const days = [
      "nedjelja",
      "ponedjeljak",
      "utorak",
      "srijeda",
      "četvrtak",
      "petak",
      "subota"
    ];
    for (let i = 1; i < 8; i++) {
      // show terms from tomorrow!
      let dayObject = {};
      const day = new Date();
      day.setDate(day.getDate() + i);
      var dayInWeek = day.getDay();
      var dd = day.getDate();
      var mm = day.getMonth() + 1; // 0 is January, so we must add 1
      var yyyy = day.getFullYear();

      dayObject.day = dd;
      dayObject.month = mm;
      dayObject.year = yyyy;
      dayObject.shortDateString = dd + "." + mm + ".";
      dayObject.fullDateString = dd + "." + mm + "." + yyyy + ".";
      dayObject.dayInWeek = dayInWeek;
      dayObject.croatianDayName = days[dayInWeek]; //croatia starts counting from monday, not sunday as is default, see how to fix
      this.next7Days.push(dayObject);
    }
    console.log(this.next7Days);
    axios
      .get("/term/" + this.$route.params.id) // wtf is with this.instructordetails id ?
      .then(resData => {
          if(resData.status == 204){
              this.startCalendar = true;
              return;
          }
        this.terms = resData.data;
        this.startCalendar = false;

      })
      .catch(err => {
           console.log(err)
          });
  },
  data() {
    return {
      next7Days: [],
      startTime: "",
      terms: {},
      startCalendar: false
    };
  },
  methods: {
    calculateId(hour, day, month, year) {
      let startTime = "";
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      startTime = year + "" + month + "" + day + "" + hour;
      if (this.terms.length > 0 && this.startCalendar==false) {
        if (this.terms.some(term => term.startTime == startTime)) {
          
          return { id: startTime, status: 1 }; // this means it is a free term
        } 
        else {
            return { id: startTime, status: 3 }
        }
      } 
      else {
        return { id: startTime, status: 3 }; // this means it is an unvailable term
      }
    }
  },
  components: {
    "app-term": Term
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top:1%;
  padding: 0px 10px 10px 10px;
  text-align: center;
}
table {
  width: 100%;
}

.timetable {
  overflow-y: scroll;
  width: 100%;
  height: 300px;
}

td {
  height: 20px;
  border: 1px solid;
  text-align: center;
}
td:hover {
  background-color: green;
}

.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto; /* 15% from the top and centered */
  padding: 50px;
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

textarea {
  width: 100%;
  height: 100px;
  font-size: 20px;
}
.legend {
      display:inline-block;
      width: 20%;
      margin: 2% 0%;
}
.icon {
    width:25px;
    height:25px;
    display:inline-block;
    margin-right: 10px;
    vertical-align: bottom;
}
.green {
    background-color:green;
}
.white {
    background-color:white;
}
.grey {
    background-color:grey;
}
</style>