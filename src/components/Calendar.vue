<template>

  <div class="timetable">
    <table id="timetable_table">
        <tr>  
            <th v-for="(day, i) in next7Days" v-bind:key="i">{{day.croatianDayName}} {{day.shortDateString}}</th> 
        </tr>        
        <tr v-for="i in 16" v-bind:key="i">  
            <td v-for="(day, j) in next7Days" v-bind:key="j" :id="calculateId(i+7, day.day, day.month, day.year)"
            @click="showModal"
            style="backgroundColor: red"
            >
                {{i + 7}}:00 h - {{i+8}}:00h
            </td> 
        </tr>
    </table>
    <div v-if="showReservationMessage" class="modal">
      <div class="modal-content">
        <span @click="showReservationMessage = false" id="close3" class="close">&times;</span>
        <p>
          Potvrdite rezervaciju za instrukcije iz kolegija
                <select v-model="courseId">
        <option
          v-for="(course, i) in instructorDetails.courses"
          v-bind:key="i"
          :value="course.id"
        >{{course.name}}, {{course.abbreviation}}</option>
      </select>
        </p>
        <p>Dodatni komentar:  </p>
        <textarea v-model="comment" maxlength="250"></textarea>
        <button @click="submit" id="confirm_button">Potvrdi</button>
      </div>
    </div>
  
</div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['instructorDetails'],
    data(){
        return {
            next7Days: [],
            showReservationMessage: false,
            courseId: "",
            comment: "",
            startTime: "",
            disable: true
        }
    },
    // {day: {shortDateString:"", fullDateString:"", dayInWeek:"",croatianDayName:""}}
    created() {
        const days = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota']; 
        for(let i=1; i<8; i++){
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
    },
    methods: {
        calculateId(hour, day, month, year){
            let startTime ="";
            if (hour < 10) {
            hour = "0" + hour;
            }
               if (day < 10) {
            day = "0" + day;
            }
             if (month < 10) {
            month = "0" + month;
            }
            startTime= year+""+ month+""+day+""+hour;

            for(let id in this.instructorDetails.terms){
                if (this.instructorDetails.terms[id].reservationId == null){
                    console.log(this.instructorDetails.terms[id].startTime);
                    if(document.getElementById(this.instructorDetails.terms[id].startTime)){
                        document.getElementById(this.instructorDetails.terms[id].startTime).style.backgroundColor = "white";
                    }
                }
            }
            return startTime;
        },
        submit(hour, day, month, year){
             if (hour < 10) {
            hour = "0" + hour;
            }
              if (day < 10) {
            day = "0" + day;
            }
             if (month < 10) {
            hour = "0" + hour;
            }
            const startTime= year + ""+ month + ""+ day +""+hour;
            let reservationId;
            this.showReservationMessage = false;
            axios.post('/reservations', {comment: this.comment, courseId:this.courseId})
            .then(resData => {
                console.log(resData);
                reservationId=resData.data.id;
                console.log(reservationId);
                return axios.post('/reserveTerm/' + this.instructorDetails.id, {reservationId: reservationId, startTime:this.startTime})
                })
            .then(resData => console.log(resData))
            .catch(err => console.log(err))
            this.courseId= "";
            this.comment= "";
        },
        showModal() {
             for(let id in this.instructorDetails.terms){
                if (this.instructorDetails.terms[id].reservationId == null && this.instructorDetails.terms[id].startTime == event.target.id){
                     this.showReservationMessage = true; 
                }
            }
           
            this.startTime =  event.target.id;
            console.log(this.startTime);
        }
    }

    
}
</script>

<style scoped>

table {
    width: 100%;
}

.timetable{
    overflow-y: scroll; 
    height:350px;
}

td {
    height: 40px;
    border: 1px solid;
    text-align: center;
}
td:hover{
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
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content{
  background-color: #fefefe;
  margin: 5% auto; /* 15% from the top and centered */
  padding: 20px;
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
</style>