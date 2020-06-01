<template>
  <div>
    <form @submit.prevent="login">
      <label>E-mail:</label>
      <input type="text" id="email" v-model="email" />
      <label>Lozinka:</label>
      <input type="password" id="password" v-model="password" />
      <button type="submit">Prijavi se</button>
      <p>Zaboravili ste lozinku?</p>
      <p>
        Nemate korisnički račun?
        <router-link to="/signup" exact>Registrirajte se!</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", {
        email: formData.email,
        password: formData.password
      });
    },

  }
};
</script>

<style scoped>
div {
  max-width: 800px;
  width: 100%;
  height: 450px;
  background-color: white;
  margin: auto;
  margin-top: 6%;
  border-radius: 25px;
}

form {
  width: 400px;
  margin: auto;
  margin-top: 5%;
}
</style>