<template>
<div>
    <h3>{{datetime}}</h3>
    <p>Mjesto: {{reservation.term.instructor.address}}</p>
    <p>Kolegij: {{reservation.course.name}}, {{reservation.course.faculty.abbreviation}}</p>
    <p>Instruktor: {{reservation.term.instructor.user.name}} {{reservation.term.instructor.user.surname}}</p>
</div>
</template>

<script>
export default {
    props: ['reservation'],
    data() {
        return {
            datetime: ""
        }
    },
    created() {
        this.datetime = this.reservation.term.startTime.slice(2,4) + "."+this.reservation.term.startTime.slice(4,6)
        + "."+this.reservation.term.startTime.slice(6,10) + " u " +this.reservation.term.startTime.slice(0,2) +":00h";
    }
}
</script>

<style scoped>
p,
h3 {
  margin: 1%;
}
</style>