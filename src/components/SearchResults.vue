<template>
  <div class="instructions_results">
    <h2>Rezultati pretrage:</h2>
    <p v-if="!instructors.length"> Ne postoji nijedan instruktor!
      </p>
    <div v-if="instructors.length" class="result_row">
      <div class="bordered" v-for="(instructor, i) in instructors" v-bind:key="i">
        <app-instructor-thumbnail :instructorId="instructor.id"></app-instructor-thumbnail>
      </div>
    </div>
  </div>
</template>

<script>
import InstructorThumbnail from "./InstructorThumbnail.vue";
import axios from "axios";

export default {
  created() {
    this.searchInstructors();
    console.log("again");
  },

  watch: {
    '$route.params.courseId'(val) {
      this.searchInstructors();
    },
    '$route.params.cityId': function(id) {
      this.searchInstructors();
    }
  },
  methods: {
    searchInstructors() {
      console.log("krenimo!");
      axios
        .post("searchInstructors", {
          cityId: this.$route.query.cityId,
          courseId: this.$route.query.courseId
        })
        .then(resData => {
          console.log(resData);
          const instructors = [];
          for (let id in resData.data) {
            instructors.push(resData.data[id]);
          }
          instructors.splice(
            instructors.findIndex(
              item => item.user.id === this.$store.state.userId
            ),
            1
          );
          console.log(instructors);
          this.instructors = instructors;
          return true;
          
        })
        .catch(err => console.log(err));
    }
  },
  //    updated() {

  // console.log(this.$route.query.cityId);
  // console.log(this.$route.query.courseId);

  //     axios
  //       .post("searchInstructors", {cityId: this.$route.query.cityId, courseId: this.$route.query.courseId})
  //       .then(resData => {
  //         console.log(resData);
  //         const instructors = [];
  //         for (let id in resData.data) {
  //           instructors.push(resData.data[id]);
  //         }
  //         instructors.splice(instructors.findIndex(item => item.user.id === this.$store.state.userId), 1);
  //         console.log(instructors);
  //         this.instructors = instructors;
  //       })
  //       .catch(err => console.log(err));
  //   },

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
      instructors: [],
      cityId: this.$route.query.cityId,
      courseId: this.$route.courseId
    };
  },
  components: {
    "app-instructor-thumbnail": InstructorThumbnail
  }
};
</script>

<style scoped>
.instructions_results {
  /* background-color: rgba(255, 255, 255, 0.9);
  width: 85%;
  margin: 1% auto;
  padding: 2% 4%; */
  margin-top: 20px;
  height: 550px;
  overflow-y: scroll;
}

.result_row {
  text-align: left;
  display: inline-block;
  margin-bottom: 5%;
}

.result_row a {
  height: 20px;
  margin: auto;
  background-color: orange;
  padding: 5px;
}
.bordered {
  text-align: center;
  background-color: rgb(235, 57, 57, 0.2);
  border: 2px solid rgb(235, 57, 57, 0.3);
  border-radius: 30px;
  padding: 0px 20px;
  display: inline-block;
  margin: 4px;
}

.instructions_results h3 {
  margin: 0px 0px 20px 40px;
}
</style>