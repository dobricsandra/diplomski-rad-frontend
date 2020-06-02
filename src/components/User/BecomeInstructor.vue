<template>
  <div class="start-teaching">
    <div v-if="!creatingInstructorProfile">
      <h4>Ako želiš stvoriti instruktorski profil i oglašavati svoje instrukcije, klikni na tipku "Započni" i ispuni tražene podatke!</h4>
      <h4>Nakon što ispuniš tražene podatke, na desnoj strani ekrana pojavit će ti se novi izbornik.</h4>
      <h4>Bilo koju rezervaciju možeš otkazati u svakom trenutku, a svoj instruktorski profil možeš i deaktivirati!</h4>
      <button @click="creatingInstructorProfile=true">Započni!</button>
    </div>
    <div v-if="creatingInstructorProfile">
      <h4>Podaci koje si unio/la prilikom registracije automatski će se preuzeti. Popuni informacije u nastavku kako bismo mogli dovršiti tvoj profil:</h4>
      <p>
        <strong>Najviši dosad stečeni stupanj obrazovanja:</strong>
        <select v-model="degreeId">
          <option
            v-for="(degree, i) in degrees"
            v-bind:key="i"
            :value="degree.id"
          >{{degree.name}}, {{degree.abbreviation}}</option>
        </select>
      </p>
      <p>(*ako još nemaš nijedan stupanj obrazovanja, označi opciju "student")</p>

      <p>
        <strong>Lokacija na kojoj planiraš držati instrukcije:</strong>
        <br />
        <input v-model="address" maxlength="50" />
      </p>
      <p>(*ako nisi siguran, uvijek možeš napisati "po dogovoru")</p>
      <p>
        <strong>Kratko predstavljanje (max 250 znakova):</strong>
        <br />
        <textarea v-model="description" maxlength="250"></textarea>
      </p>
      <button @click="createNewInstructor">Spremi</button> 
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      creatingInstructorProfile: false,
      degrees: [],
      degreeId: "",
      address: "",
      description: ""
    };
  },
  created() {
    axios
      .get("/degrees")
      .then(resData => {
        const degrees = [];
        for (let id in resData.data) {
          degrees.push(resData.data[id]);
        }
        this.degrees = degrees;
      })
      .catch(err => console.log(err));
  },
  methods: {
      createNewInstructor(){
          axios.post('/instructors', {address:this.address, description: this.description, degreeId: this.degreeId})
          .then(resData => {
              this.$store.dispatch("checkIsInstructor");
              this.$router.push('/home/my-instructor-profile');
          })
          .catch(err => console.log(err))
      }
  }
};
</script>

<style scoped>
.start-teaching {
  width: 100%;
  background-color: rgb(235, 57, 57, 0.2);
  margin: auto;
  margin-top: 2%;
  padding-bottom: 10px;
}

.start-teaching > div {
  padding-top: 2%;
  text-align: center;
  width: 60%;
  margin: auto;
}

h4 {
  font-size: 20px;
}
button {
  background-color: rgba(198, 56, 63, 0.8);
  margin: 5px;
  width: 70%;
  height: 100px;
  margin: auto;
}
select, input {
    margin:5px;
}
textarea {
    width: 100%;
    height: 100px;
    font-size: 20px;
}
</style>