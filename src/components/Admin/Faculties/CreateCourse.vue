<template>
  <div class="my-courses">
       <h3>Kolegiji na fakultetu {{faculty.name}}</h3>
     
      <div v-if="!courses.length && loaded" class="row">Ne postoji nijedan kolegij! </div>
        <div v-if="courses.length" class="row">
        <table>
         <div v-for="(course, i) in courses" :key="i"> 
             <tr>
                 <td>{{course.name}} ({{course.abbreviation}})</td>
                 <td><button @click="deleteCourse(course.id)">Obriši</button></td>
             </tr>
         
      </div>
      </table>
      </div>
       <button @click="showAdNewFacultyMenu=true">Dodaj novi kolegij</button>
          <div class="modal" v-if="showAdNewFacultyMenu">
        <div class="modal-content">
            <label>Naziv kolegija:</label><input v-model="name" />
            <label>Kratica: </label><input v-model="abbreviation" />
        <button class="small" @click="showAdNewFacultyMenu=false;name='', abbreviation=''"> Odustani </button>
        <button class="small" @click="saveCourse()">Potvrdi</button>
        </div>
    </div>
     
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
    created() {
        axios.get('/faculties/' + this.$route.params.id)
        .then(resData => {
            this.faculty = resData.data;
        })
        .catch(err => console.log(err))
        axios.get('/faculties/' + this.$route.params.id + '/courses')
        .then(resData => {
            if(resData.data && resData.data.length)
            for (let id in resData.data) {
                this.courses.push(resData.data[id]);
            }
            this.loaded=true;
        })
        .catch()
    },
    data() {
        return {
        courses: [],
        faculty: {},
        showAdNewFacultyMenu: false,
        name: "",
        abbreviation: "",
        loaded: false
        }
    },
    methods: {
        saveCourse() {
            axios.post('/admin/courses', {name:this.name, abbreviation:this.abbreviation, facultyId:this.$route.params.id})
            .then(resData => {
                this.courses.push(resData.data);
                console.log(resData);
                this.showAdNewFacultyMenu = false;
                this.name="";
                this.abbreviation="";
                console.log(this.courses);
            })
            .catch(err => console.log(err))
        },
        deleteCourse(courseId){
            if(confirm('Jeste li sigurni? Ako obrišete kolegij, obrisat će se sve rezervacije za navedeni kolegij!')){
            axios.delete('/admin/courses',  {data: {id:courseId}})
            .then(resData => {
                console.log(resData);
                this.courses.splice(this.courses.findIndex(item => item.id === courseId), 1)
            })
            .catch(err => console.log(err))
            }
        }
    }
}
</script>
<style scoped>
.my-courses {
  width: 100%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top: 2%;
  padding-bottom: 50px;
  padding-top: 50px;
}
.row {
width: 90%;
padding:0px 2%;
margin:auto;

}
h3 {
    text-align: center;
}
button {
    background-color:rgba(198, 56, 63, 0.8); 
    width: 70%;
    height:80px;
    margin:auto;
    margin-top:5%;
 
}
td button {
 width: 100px;
 height:30px;
 margin-left:50px;
 margin-top:0px;
}

.faculty, .faculty p {
    display:inline-block;
}
table {
    margin:auto;
}

td {
    width: 100%;
    vertical-align:middle;
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
  padding: 50px;
  border: 1px solid #888;
  width: 40%; /* Could be more or less, depending on screen size */
}
.modal button {
    width: 49%;
    display:inline-block;
}

</style>