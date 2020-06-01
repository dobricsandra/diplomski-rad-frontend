<template>
<div >
    <button :class="addColor()" @click="updateTerm()"><slot></slot></button>
    <div class="modal" v-if="showReservationDetails">
        <div class="modal-content">
            <app-reservation-details :termStartTime="id.id" v-on:receivedMessage="receiveReservationId"></app-reservation-details>
        <button class="small" @click="showReservationDetails=false"> Natrag </button>
        <button class="small" @click="cancelReservation()">Otkaži</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import ReservationDetails from './ReservationDetails.vue';
export default {
    props: ['id', 'terms'],
    created() {
        if(this.id.status == 1) {
            axios.get('/isTermReserved/' + this.id.id)
            .then(resData => {
                if(resData.data.isReserved == true ){
                    this.id.status = 2;
                    this.color=2;
                    console.log(this.id.id);
                }
            })
            .catch(err => console.log(err))
        }
    },
    data(){
        return {
            reserved: false,
            free: false,
            unavailable: true,
            showReservationDetails: false,
            reservationId: "",
            color: this.id.status
        }
    },
    methods: {
        addColor(){
            if(this.color == 1){
                return "white";
            }
            if(this.color == 2) {
                return "red";
            }
            if(this.color == 3){
                return "grey";
            }
        },
        updateTerm() {
            if(this.color == 3){
                console.log("okidamoupdate");
                axios.post('/term', {instructorId:this.$store.getters.getInstructorId.instructorId, startTime:this.id.id})
                .then(resData => {
                    console.log(resData);
                    this.color=1;
                })
                .catch(err => console.log(err))
             }
            else if(this.color==1){
                  console.log("okidamo else");
                axios.delete('/term', {data: {instructorId:this.$store.getters.getInstructorId.instructorId, startTime:this.id.id}}) // delete method expects special format for body
                .then(resData => {
                    console.log(resData);
                    this.id.status = 3;
                    this.color = 3;
                })
                .catch(err => console.log(err))
            }
            else if (this.color==2) {
                this.showReservationDetails = true;
            }

        },
        receiveReservationId(reservationId){
            console.log("od djeteta" + reservationId);
            this.reservationId = reservationId;
        },
        cancelReservation(){
            if (confirm("Jeste li sigurni?")) {
            axios.post('/cancelReservationByInstructor/' + this.reservationId, {instructorId: this.$store.getters.getInstructorId.instructorId, term: this.id.id})
            .then(resData => {
                this.id.status = 3;
                this.color = 3;
                this.showReservationDetails = false;
            })
            .catch(err => console.log(err))
            } else {
            next(false);
                 
        }
    }},
    components: {
        'app-reservation-details': ReservationDetails
    }
}
</script>
<style scoped>
    .white {
        background-color: white;
    }
    .red {
        background-color: red;;
    }
    .grey {
        background-color: gray;
    }
    button {
        border-radius: 0px;
        margin: 0px;

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
.small {
    width: 30%;
    display: inline-block;
}
</style>