<template>
 <div class="row">
 <div class="col"><p>{{course.name}} ({{course.abbreviation}})</p></div>
<div class="col"><p>{{course.faculty.name}} ({{course.faculty.abbreviation}})</p></div>
          <div v-if="!editCourseMode" class="col smaller"><p>{{course.instructor_course.price}} kn/h</p></div>
          <div v-if="editCourseMode" class="col smaller"><p>
              <input type="number" v-model="price" /> kn/h
          </p></div>
          <div class="col smaller"><p>
            <button class="small-button" v-if="!editCourseMode" @click="editCourseMode=true">Uredi</button>
            <button class="small-button" v-if="editCourseMode" @click="saveNewPrice()">Spremi</button>
          </p></div>
          <div class="col smaller"><p>
            <button class="small-button" v-if="!editCourseMode" @click="deleteCourse()">Obriši</button>
            <button class="small-button" v-if="editCourseMode" @click="leave()" >Odustani</button>
          </p></div>
 </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['course'],
    data() {
        return {
            editCourseMode: false,
            price: ""
        }
    },
    created() {
        this.price = this.course.instructor_course.price;
    },
    methods: {
        saveNewPrice(courseId, price) {
           axios.post('/changePrice', {userId: this.$store.state.userId, courseId: this.course.id, price: this.price})
            .then(resData => {
                console.log(resData);
                this.course.instructor_course.price = this.price;
                this.editCourseMode = false;
            })
            .catch(err => console.log(err))
      },
      leave(){
          this.price = this.course.instructor_course.price;
          this.editCourseMode = false;
      },
      deleteCourse() {
        
        if (confirm("Jeste li sigurni?")) {
            axios.post('/deleteCourse', {userId: this.$store.state.userId, courseId: this.course.id})
            .then(resData => {
                console.log(resData);
                this.$emit('deletedCourseId', this.course.id);
                this.editCourseMode = false;
            })
            .catch(err => console.log(err))
        } 

          
      }
    }
}
</script>

<style scoped>
.col {
  width: 25%;
  text-align: center;
  display:inline-block;
  vertical-align: middle;
}
.smaller{
    width:15%;
}

.small-button {
    width: 70%;
    height:30px;
    margin:auto;

}
.small-button {
    width: 70%;
    height:30px;
    margin:auto;

}
button {
    background-color:rgba(198, 56, 63, 0.8);
    width: 70%;
    height:80px;
    margin:auto;
    margin-top:5%;
}
input {
    width: 40%;
    vertical-align: middle;
    display:inline-block;
}

</style>