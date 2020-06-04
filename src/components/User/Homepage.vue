<template>
  <div class="user-page-wrapper">
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
    // we removed this from here because we put it in app.vue
      // this.$store.dispatch('checkIsInstructor');
      // console.log(this.$store.state.instructorId);
  }
  
};
</script>
<style scoped>
.user-page-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  width: 85%;
  margin: 1% auto;
  padding: 2% 4%;
}
</style>