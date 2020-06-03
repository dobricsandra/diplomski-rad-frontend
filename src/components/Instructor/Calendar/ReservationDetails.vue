<template>
  <div>
    <p><strong>Student:</strong> {{reservationDetails.user.name}} {{reservationDetails.user.surname}}</p>
    <p><strong>Kontakt: </strong>{{reservationDetails.user.phoneNumber}}, {{reservationDetails.user.email}}</p>
    <p><strong>Kolegij: </strong>{{reservationDetails.course.name}} ({{reservationDetails.course.faculty.abbreviation}})</p>
    <p><strong>Poruka: </strong>{{reservationDetails.comment}}</p>
  </div>
</template>
<script>
import axios from 'axios';
export default {
    props: ['termStartTime'],
    created() {
        let reservationId;
        axios.get('/termReservationId/'+ this.termStartTime)
        .then(resData => {
            reservationId = resData.data.reservationId;
            console.log(reservationId);
            this.$emit('receivedMessage', reservationId);
            return axios.get('reservationDetails/'+reservationId)
        })
        .then(resData => {
            this.reservationDetails = resData.data;
            console.log(this.reservationDetails);
        })
        .catch(err=>console.log(err))
        },
        data() {
            return {
                reservationDetails: {}
            }
        }
    
};
</script>

<style scoped>
</style>
