<template>
  <div class="my-courses">
       <h3>Fakulteti u gradu {{city.name}}</h3>
     
      <div v-if="!faculties.length && loaded" class="row">Ne postoji nijedan fakultet! </div>
        <div v-if="faculties.length" class="row">
        <table>
         <div v-for="(faculty, i) in faculties" :key="i"> 
             <tr>
                 <td>{{faculty.name}} ({{faculty.abbreviation}})</td>
                 <td><button @click="deleteFaculty(faculty.id)">Obriši</button></td>
             </tr>
         
      </div>
      </table>
      </div>
       <button @click="showAdNewFacultyMenu=true">Dodaj novi fakultet</button>
          <div class="modal" v-if="showAdNewFacultyMenu">
        <div class="modal-content">
            <label>Naziv fakulteta:</label><input v-model="name" />
            <label>Kratica: </label><input v-model="abbreviation" />
        <button class="small" @click="showAdNewFacultyMenu=false;name='', abbreviation=''"> Odustani </button>
        <button class="small" @click="saveFaculty()">Potvrdi</button>
        </div>
    </div>
     
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
    created() {
        axios.get('/cities/' + this.$route.params.id)
        .then(resData => {
            this.city = resData.data;
        })
        .catch(err => console.log(err))
        axios.get('/cities/' + this.$route.params.id + '/faculties')
        .then(resData => {
            if(resData.data && resData.data.length)
            for (let id in resData.data) {
                this.faculties.push(resData.data[id]);
            }
            this.loaded=true;
        })
        .catch()
    },
    data() {
        return {
                faculties: [],
        city: {},
        showAdNewFacultyMenu: false,
        name: "",
        abbreviation: "",
        loaded: false
        }
    },
    methods: {
        saveFaculty() {
            axios.post('/admin/faculties', {name:this.name, abbreviation:this.abbreviation, cityId:this.$route.params.id})
            .then(resData => {
                console.log(resData);
                this.showAdNewFacultyMenu = false;
                this.name="";
                this.abbreviation="";
                this.faculties.push(resData.data);
            })
            .catch(err => console.log(err))
        },
        deleteFaculty(facultyId){
            if(confirm('Jeste li sigurni?')){
            axios.delete('/admin/faculties',  {data: {id:facultyId}})
            .then(resData => {
                console.log(resData);
                this.faculties.splice(this.faculties.findIndex(item => item.id === facultyId), 1)
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