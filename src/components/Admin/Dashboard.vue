<template>
<div>
   <app-admin-navigation></app-admin-navigation>
</div>
</template>

<script>
import AdminNavigation from './AdminNavigation.vue';
export default {
    components: {
        'app-admin-navigation': AdminNavigation
    }
}
</script>

<style scoped>
div{ 
    background-color: rgba(255, 255, 255, 0.9);
  width: 85%;
  margin: 1% auto;
  padding: 2% 4%;
}
 
</style>