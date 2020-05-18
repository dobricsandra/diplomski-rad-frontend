<template>
  <div id="app">
    <app-header></app-header>
    <main> 
      <!-- <app-signup> </app-signup> -->
      <!-- <app-search> </app-search> -->
      <!-- <app-search-results></app-search-results> -->
      <router-view></router-view>
    </main>
    
  </div>
</template>

<script>
import Header from './components/Shared/Header.vue';
import Signup from './components/Signup.vue';
import Search from './components/Search.vue';
import SearchResults from './components/SearchResults.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    'app-header': Header,
    'app-signup': Signup,
    'app-search': Search,
    'app-search-results': SearchResults
  }
}
</script>

<style>
#app {
  margin: 0px;
  padding: 0px;
  font-family: sans-serif;
  font-size: 18px;
  background-color: white;
}

main {
  height: 750px;
  max-width: 1500px;
  width:100%;
  margin: auto;
  background-image: url('/src/assets/background.webp');
  display: flex;
}

main select, main button, main input { 
    display:block;
    width:100%;
    height: 40px;
    margin-bottom: 7%;
    margin-top: 2%;
}

main select, main input {
    padding-left: 15px;
    font-size: 16px;
}

main button {
    font-size: 18px;
    height: 60px;
    margin-top: 10%;
    background-color: orangered;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

h1, h2 {
 
}

ul {

}

li {

}

a {
  
}
</style>
