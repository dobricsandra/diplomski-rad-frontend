<template>
  <div>
    <div class="instructions_result_item">
      <h4>{{user.name}} {{user.surname}}</h4>
      <p>{{degreeAbbreviation}}, {{user.facultyId}}</p>

      <img
        src="https://cdn3.vectorstock.com/i/1000x1000/08/37/profile-icon-male-user-person-avatar-symbol-vector-20910837.jpg"
      />
      <p>{{averageMark}}</p>
      <a :href="href">Više...</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["instructor"],
  created() {
    console.log(this.instructor.userId);
    axios
      .get("/user/" + this.instructor.userId)
      .then(resData => {
        console.log(resData);
        this.user = resData.data;
        console.log(this.user.name);
      })
      .catch(err => console.log(err));
    axios
      .get("/degree/" + this.instructor.degreeId)
      .then(resData => {
        console.log(resData);
        this.degreeAbbreviation = resData.data.abbreviation;
      })
      .catch(err => console.log(err));

    axios
      .get("/review/" + this.instructor.id)
      .then(resData => {
        let review = 0;
        let counter = 0;

        for (let id in resData.data) {
          review = resData.data[id].reviewMark + review;
          counter++;
        }
        this.averageMark = (review / counter).toFixed(2);
        console.log(this.averageMark);
      })
      .catch(err => {
        console.log(err);
        this.averageMark = "Nema ocjenu!";
      });
  },
  destroyed() {
    this.user = {};
  },
  data() {
    return {
      user: {},
      averageMark: "",
      facultyAbbreviation: "",
      degreeAbbreviation: "",
      href: "instructor_profile/" + this.instructor.id
    };
  }
};
</script>

<style scoped>
.instructions_result_item {
  width: 200px;
  display: inline-block;
  margin-left: 1.5%;
}

p:last-of-type {
  margin-bottom: 10px;
}

.instructions_result_item img {
  max-width: 100px;
  width: 100%;
}
</style>