<template>
    <form class="form" @submit.prevent="checkForm">
        <h1 class="main--heading">Register</h1>
        <div class="form--element">
            <label class="label" for="email">Email</label>
            <input
                class="input"
                id="email"
                type="text"
                placeholder="Email"
                v-model.trim="email"
            />
        </div>
        <div class="form--element">
            <label class="label" for="Password">Password</label>
            <input
                class="input"
                id="password"
                type="password"
                v-model.trim="password"
                placeholder="Password"
            />
        </div>
        <div class="form--element">
            <label for="Password" class="label">Name</label>
            <input
                id="name"
                type="text"
                placeholder="Full Name"
                v-model.trim="name"
                class="input"
            />
        </div>
        <input class="submit--btn" type="submit" value="Register" id="submit" />
    </form>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";
import db from "../main";
export default {
    data() {
        return {
            email: "",
            password: "",
            name: "",
            error: "",
        };
    },
    methods: {
        pressed() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    console.log(user);
                    var ref = db.collection("users").doc(user.user.uid);
                    ref.set({
                        name: this.name,
                        favorites: [],
                    });
                    this.$router.replace({ name: "home" });
                })
                .catch((error) => {
                    alert(error);
                });
        },
        checkForm() {
            if(!(/^[a-zA-Z]+$/.test(this.name)) || this.name.length <= 1){
                alert("Account not created - please re-check all fields.");
            } else {
                this.pressed();
            }   
        }
    },
};
</script>
