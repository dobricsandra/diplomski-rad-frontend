<template>
<div >
    <button :class="addColor()" @click="updateTerm()"><slot></slot></button>
    <div class="modal" v-if="showReservationDetails">
        <div class="modal-content">
            <app-reservation-details :termStartTime="id.id" v-on:reservationDetails="receiveReservationDetails"></app-reservation-details>
        <button class="small" @click="showReservationDetails=false"> Natrag </button>
        <button class="small" @click="reserveTerm()">Potvrdi</button>
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
        console.log(this.id.status);
        if(this.id.status == 1) {
            axios.get('/isTermReserved/' + this.id.id)
            .then(resData => {
                if(resData.data.isReserved == true && resData.data.userId == this.$store.state.userId){
                    this.id.status = 4;
                    this.color = 4;
                    console.log("hello");
                    console.log(this.id.id + "," + resData.data.userId +"-"+ this.$store.state.userId);
                    return;
                }
                if(resData.data.isReserved == true && resData.data.userId != this.$store.state.userId){
                    this.id.status = 3;
                    this.color = 3;
                    console.log("hello");
                    console.log(this.id.id + "," + resData.data.userId +"-"+ this.$store.state.userId);
                    return;
                }
               
            })
            .catch(err => {
                console.log(err)}
                )
        }
    },
    data(){
        return {
            reserved: false,
            free: false,
            unavailable: true,
            showReservationDetails: false,
            reservationId: "",
            color: this.id.status,
            courseId: "",
            comment:""
        }
    },
    methods: {
        addColor(){
            if(this.color == 1){
                return "white";
            }

            if(this.color == 2 || this.color ==3){
                return "grey";
            }
            if(this.color == 4){
                return "green";
            }
        },
        updateTerm() {
            if(!this.$store.getters.isAuth){
                this.$router.push('/login');
            }
            if (this.color==1) {
                this.showReservationDetails = true; 
            }

        },
        receiveReservationDetails(reservationDetails){
            this.courseId = reservationDetails.courseId;
            this.comment = reservationDetails.comment;
        },
        reserveTerm(){
            console.log("heeeeeeee");
         
            if (confirm("Jeste li sigurni?")) {
                axios.post('/reservations', {comment: this.comment, courseId:this.courseId})
            .then(resData => {
                console.log(resData);
                const reservationId=resData.data.id;
                console.log(reservationId);
                return axios.post('/reserveTerm/' + this.$route.params.id, {reservationId: reservationId, startTime:this.id.id})
                })
            .then(resData => {
                   console.log(resData);
                   this.id.status=4;
                   this.color=4;
                   this.showReservationDetails = false
                   }
                   )
            .catch(err => console.log(err))
            this.courseId= "";
            this.comment= "";
        }
            // axios.post('/cancelReservationByInstructor/' + this.reservationId, {instructorId: this.$store.getters.getInstructorId.instructorId, term: this.id.id})
            // .then(resData => {
            //     this.id.status = 3;
            //     this.color = 3;
            //     this.showReservationDetails = false;
            // })
            // .catch(err => console.log(err))
            // } else {
            // next(false);
            console.log(this.$route.params.id);
                 
        
    }
    },
    components: {
        'app-reservation-details': ReservationDetails
    }
}
</script>
<style scoped>
    .white {
        background-color: white;
    }
    .green {
        background-color: green;;
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
    margin-top: 5%;
    background-color:rgba(198, 56, 63, 0.8);
}
</style>