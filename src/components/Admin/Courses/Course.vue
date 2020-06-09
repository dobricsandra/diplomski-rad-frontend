<template>
 <div class="row">
<div class="col " v-if="!editCourseMode"><p>{{course.name}}</p></div>
<div class="col " v-if="editCourseMode"><input v-model="name" /></div>
 <div class="col smaller" v-if="!editCourseMode"><p>{{course.abbreviation}}</p></div>
 <div class="col smaller" v-if="editCourseMode"><input v-model="abbreviation" /></div>
 <div class="col bigger" v-if="!editCourseMode"><p>{{course.faculty.name}} ({{course.faculty.abbreviation}})</p></div>
 <div class="col bigger" v-if="editCourseMode">
      <select v-model="facultyId"><option
          v-for="(faculty, i) in faculties"
          v-bind:key="i"
          :value="faculty.id"
        >{{faculty.name}}, {{faculty.abbreviation}}</option></select>
 </div>

        
          <div class="col smaller"><p>
            <button class="small-button" v-if="!editCourseMode" @click="editCourseMode=true">Uredi</button>
            <button class="small-button" v-if="editCourseMode" @click="saveCourse()">Spremi</button>
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
            faculties: [],
            loaded: false,
            name: "",
            abbreviation: "",
            facultyId: "",
            route: "/admin/courses/" + this.course.id + "/add-course"
        }
    },
    created() {
        this.name=this.course.name;
        this.abbreviation = this.course.abbreviation;
        this.facultyId = this.course.faculty.id;
        axios
      .get("/faculties")
      .then(resData => {
        for (let id in resData.data) {
          this.faculties.push(resData.data[id]);
        }
        this.loaded = true;
      })
      .catch(err => console.log(err));

    },
    methods: {
        saveCourse() {
            console.log("usli");
           axios.post('/admin/courses/' + this.course.id, {name: this.name, abbreviation:this.abbreviation, facultyId: this.facultyId})
            .then(resData => {
                console.log(resData);
                this.course.name = this.name;
                this.course.abbreviation = this.abbreviation;
                this.course.faculty.id = this.facultyId;
                const faculty = this.faculties.find(faculty => faculty.id === this.course.faculty.id);
                this.course.faculty.name = faculty.name;
                this.course.faculty.abbreviation = faculty.abbreviation;
                this.editCourseMode = false;
                this.loaded = true;
            })
            .catch(err => console.log(err))
      },
      leave(){
          this.editCourseMode = false;
          this.name = this.course.name;
          this.abbreviation = this.course.abbreviation;
          this.countryId = this.course.faculty.id;
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
  width: 20%;
  text-align: center;
  display:inline-block;
  vertical-align: middle;
}
.bigger {
    width: 30%;
}
.smaller{
    width:14%;
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
    width: 60%;
    vertical-align: middle;
    display:inline-block;
    margin: 0px;
}
.name {
    width: 80%;
}
select {width: 100%;
margin:0px;}

</style>