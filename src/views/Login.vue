<template>
  <div id="parent">
    <form @submit.prevent="pressed">
      <h2>Login</h2>
      <div class="login">
        <p>
        <label for="Email" class="floatLabel">Email</label>
        <input id="Email" type="text" placeholder="Email" v-model="email" />
        </p>
      </div>
      <div class="password">
        <p>
          <label for="Password" class="floatLabel">Password</label>
          <input id="password" type="password" placeholder="Password" v-model="password" />
        </p>
      </div>
        <input type="submit" value="Login" id="submit"/>
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
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          alert("Successful Login");
          this.$router.replace({ name: "home" });
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>

$button: rgba(0, 187, 255,0.6);

#parent {
   display: table;
   width: 100%;
}

body {
  background: #384047;
  font-family: sans-serif;
  font-size: 10px
}

form {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  background: #fff;
  padding: 4em 4em 2em;
  max-width: 400px;
  margin: 50px auto 0;
  box-shadow: 0 0 1em #222;
  border-radius: 2px;
  h2 {
    margin:0 0 50px 0;
    padding:10px;
    text-align:center;
    font-size:30px;
    color:darken(#e5e5e5, 50%);
    border-bottom:solid 1px #e5e5e5;
  }
  p {
    margin: 0 0 3em 0;
    position: relative;
  }
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    margin:0;
  }
  input[type="text"],
  input[type="password"] {
    background: #fff;
    border: 1px solid #dbdbdb;
    font-size: 1.6em;
    padding: .8em .5em;
    border-radius: 2px;
  }
  input[type="text"]:focus,
  input[type="password"]:focus {
    background: #fff
  }
  span {
    display:block;
    background: #F9A5A5;
    padding: 2px 5px;
    color: #666;
  }
  input[type="submit"] {
    background: $button;
    box-shadow: 0 3px 0 0 darken($button, 10%);
    border-radius: 2px;
    border: none;
    color: #fff;
    cursor: pointer;
    display: block;
    font-size: 2em;
    line-height: 1.6em;
    margin: 2em 0 0;
    outline: none;
    padding: .8em 0;
    text-shadow: 0 1px #68B25B;
  }
  input[type="submit"]:hover {
    background: rgba(0,187,255,1);
    text-shadow:0 1px 3px darken($button, 30%);
  }
  input[type="submit"]:hover {
    
  }
  label{
    position: absolute;
    left: 8px;
    top: 12px;
    color: #999;
    font-size: 16px;
    display: inline-block;
    padding: 4px 10px;
    font-weight: 400;
    background-color: rgba(255,255,255,0);
    &.floatLabel{
      top: -11px;
      background-color: rgba(255,255,255,0.8);
      font-size: 14px;
    }
	}
  
}
</style>