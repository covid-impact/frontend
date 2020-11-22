<template>
  <div>
    <div class="error" v-if="error">{{error.message}}</div>
    <form @submit.prevent="pressed">
      Register
      <div class="email">
        <input type="email" v-model="email" placeholder="Email" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="Password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";
    export default {
      data() {
        return {
          email: "",
          password: "",
          error: ""
        };
      },
      methods: {
    pressed() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("Succesfully Registered!");
          this.$router.replace({ name: "login" });
        })
        .catch(error => (this.error = error));
    }
  }
    };
</script>

<style>
<style lang="scss" scoped>
.error {
  color: red;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>