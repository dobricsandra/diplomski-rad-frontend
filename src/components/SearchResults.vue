<template>
  <div class="instructions_results">
    <h3>Dostupni danas</h3>
    <div class="result_row">
      <div v-for="(instructor, i) in instructors" v-bind:key="i">
        <app-instructor-thumbnail :instructorId="instructor.id"></app-instructor-thumbnail>
      </div>
      <a>Pogledaj sve ></a>
    </div>
    <h3>Najbolje ocijenjeni</h3>
    <div class="result_row">
      <a>Pogledaj sve ></a>
    </div>
  </div>
</template>

<script>
import InstructorThumbnail from "./InstructorThumbnail.vue";
import axios from "axios";

export default {
  created() {
    axios
      .get("/courses/"+this.$route.params.id+"/instructors")
      .then(resData => {
        console.log(resData);
        const instructors = [];
        for (let id in resData.data[0].instructors) {
          instructors.push(resData.data[0].instructors[id]);
        }
        this.instructors = instructors;
      })
      .catch(err => console.log(err));
  },
//   beforeRouteEnter(to, from, next) {
//       if(1==2) {
//           next();
//       }
//       else {
//           next('/signup');
//       }

//   },

  data() {
    return {
      instructors: []
    };
  },
  components: {
    "app-instructor-thumbnail": InstructorThumbnail
  }
};
</script>

<style scoped>
.instructions_results {
  background-color: white;
  opacity: 0.85;
  width: 85%;
  margin: auto;
}

.result_row {
  text-align: center;
  display: flex;
  margin-bottom: 5%;
}

.result_row a {
  height: 20px;
  margin: auto;
  background-color: orange;
  padding: 5px;
}

.instructions_results h3 {
  margin: 20px 0 20px 40px;
}
</style>