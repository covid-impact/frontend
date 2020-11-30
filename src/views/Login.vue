<template>
    <form class="form" @submit.prevent="pressed">
        <h1 class="main--heading">Login</h1>
        <div class="form--element">
            <label for="email" class="label">Email</label>
            <input
                id="email"
                type="text"
                placeholder="Email"
                v-model.trim="email"
                class="input"
            />
        </div>
        <div class="form--element">
            <label for="Password" class="label">Password</label>
            <input
                id="password"
                type="password"
                placeholder="Password"
                v-model.trim="password"
                class="input"
            />
        </div>
        <input class="submit--btn" type="submit" value="Login" id="submit" />
    </form>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";

// @group Views
/**
 * Login page for the user
 */
export default {
    data() {
        return {
            email: "",
            password: "",
            error: "",
        };
    },
    methods: {
        /**
         * @vuese
         * Tries to log the user in using the signInWithEmailAndPassword firebase method on auth.
         */
        pressed() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then((data) => {
                    this.$router.replace({ name: "home" });
                })
                .catch((error) => {
                    alert(error);
                });
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
