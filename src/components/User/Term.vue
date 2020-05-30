<template>
<div >
    <button :class="addColor()" @click="updateTerm()"><slot></slot></button>
</div>
</template>

<script>
import axios from'axios';
export default {
    props: ['id', 'terms'],
    created() {
        for(let id in this.terms){
            if(this.id == this.terms[id].startTime && this.terms[id].reservationId == null){
                this.free=true;
            }
            else if(this.id == this.terms[id].startTime){
                this.reserved=true;
            }
            else {
                this.unavailable=true;
            }
        }
    },
    data(){
        return {
            reserved: false,
            free: false,
            unavailable: true
        }
    },
    methods: {
        addColor(){
            if(this.reserved == true){
                return "red";
            }
            if(this.free == true) {
                return "white"
            }
            if(this.unavailable == true){
                return "grey";
            }
        },
        updateTerm() {
            if(this.unavailable && !this.reserved){
                axios.post('/term', {instructorId:this.$store.getters.getInstructorId.instructorId, startTime:this.id})
                .then(resData => {
                    console.log(resData);
                    this.unavailable = false;
                    this.free = true;
                })
                .catch(err => console.log(err))
            }
            else if(this.free && !this.reserved){
                axios.delete('/term', {data: {instructorId:this.$store.getters.getInstructorId.instructorId, startTime:this.id}}) // delete method expects special format for body
                .then(resData => {
                    console.log(resData);
                    this.unavailable = true;
                    this.free = false;
                })
                .catch(err => console.log(err))
            }
        }
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
</style>