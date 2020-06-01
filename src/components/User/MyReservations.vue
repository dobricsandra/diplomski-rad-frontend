<template>
  <div class="user-page-content">
    <h2>Nadolazeće:</h2>
    <p v-if="!futureReservations.length">Nemate nijednu nadolazeću rezervaciju!</p>
    <div v-for="(reservation, i) in futureReservations" v-bind:key="i" >
      <app-reservation :reservation="reservation" status="future"></app-reservation>
    </div>
    <h2>Arhivirane:</h2>
    <p v-if="!pastReservations.length">Nemate nijednu arhiviranu rezervaciju!</p>
    <div v-for="(reservation, i) in pastReservations" v-bind:key="i" :status="!future">
      <app-reservation :reservation="reservation" status="past"></app-reservation>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Reservation from "./Reservation.vue";
export default {
  created() {
    const now = new Date();
    var hh = now.getHours();
    var dd = now.getDate();
    var mm = now.getMonth() + 1; // 0 is January, so we must add 1
    var yyyy = now.getFullYear();
    let nowTime;
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    nowTime = yyyy + "" + mm + "" + dd + "" + hh;

    axios
      .get("/reservations")
      .then(resData => {
        for (let id in resData.data) {
          if (resData.data[id].term != null) {
            if (nowTime >= resData.data[id].term.startTime) {
              this.pastReservations.push(resData.data[id]);
            } else {
              this.futureReservations.push(resData.data[id]);
            }
          }
          else { 
            if (nowTime >= resData.data[id].cancelledTerm) {
              this.pastReservations.push(resData.data[id]);
            } else {
              this.futureReservations.push(resData.data[id]);
            }
          }
        }
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      pastReservations: [],
      futureReservations: [],
      future:1
    };
  },
  components: {
    "app-reservation": Reservation
  }
};
</script>

<style scoped>
.user-page-content {
  width: 95%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top: 2%;
  padding: 35px;
  overflow-y: scroll;
  height: 500px;
}
.user-page-content > div {
  display:inline-block;
  width:45%;
  margin-left:4%;
}
h2 {
  margin-top:50px;
}
h2:first-of-type {
  margin-top: 0px;
}
</style>