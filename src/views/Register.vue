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

// @group Views
/**
 * Register page for the user.
 */
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
        /**
         * @vuese
         * Tries to register the user using the createUserWithEmailAndPassword firebase method on auth.
         */
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
        /**
         * @vuese
         * Validation of the user fields
         */
        checkForm() {
            if (!/^[a-zA-Z]+$/.test(this.name) || this.name.length <= 1) {
                alert("Account not created - please re-check all fields.");
            } else {
                this.pressed();
            }
        },
    },
};
</script>


<style>
.form {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
}

.input {
    font-size: 1.2em;
    background: var(--background-card);
    border: 2px solid var(--text);
    padding: 10px;
    width: 100%;
    color: var(--text);
    border-radius: 10px;
    transition: 0.2s box-shadow, 0.2s transform;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
}

.label {
    display: inline-block;
    font-size: 1.2em;
    margin: 10px 0;
}

.submit--btn {
    font-size: 1.2em;
    padding: 10px;
    background: var(--background-card);
    border: 2px solid var(--text);
    border-radius: 10px;
    color: var(--text);
    margin: 10px 0;
    margin-left: auto;
    cursor: pointer;
    transition: 0.2s box-shadow, 0.2s transform;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
}

.form--element {
    width: 100%;
}

@media not all and (hover: none) {
    .input:hover {
        box-shadow: none;
        transform: translateY(2px);
    }

    .submit--btn:hover {
        box-shadow: none;
        transform: translateY(2px);
    }
}
</style>