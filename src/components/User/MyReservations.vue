<template>
  <div class="my_reservations">
    <h2>Nadolazeće</h2>
    <div foreach="reservation in reservations">
      <app-reservation></app-reservation>
    </div>
    <h2>Arhivirano</h2>
 
    <div v-for="(reservation, i) in reservations" v-bind:key="i">
      <app-reservation :reservation="reservation"></app-reservation>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Reservation from "./Reservation.vue";
export default {
    data(){
        return {
            reservations: []
        }
    },
  created() {
    axios
      .get("/reservations")
      .then(resData => {
        console.log(resData);
        const reservations = [];
        for (let id in resData.data) {
          reservations.push(resData.data[id]);
        }
        this.reservations = reservations;
      })
      .catch(err => console.log(err));
  },
  components: {
    "app-reservation": Reservation
  }
};
</script>

<style scoped>
.my_reservations {
  width: 60%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top: 2%;
  padding: 35px;
  overflow-y: scroll;
  height: 500px;
}

</style>