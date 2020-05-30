<template>
  <div class="instructions_results">
    <app-user-navigation></app-user-navigation>
  </div>
</template>
<script>
import axios from "axios";
import UserNavigationVue from "./UserNavigation.vue";
export default {
 
  components: {
    "app-user-navigation": UserNavigationVue
  },
  created() {
      this.$store.dispatch('checkIsInstructor');
      console.log(this.$store.state.instructorId);
  }
  
};
</script>
<style scoped>
.instructions_results {
  background-color: white;
  opacity: 0.90;
  width: 85%;
  margin: 1% auto;
  padding: 3%;
}
</style>