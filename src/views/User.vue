<template>
    <section class="user">
        <h1 class="main--heading">{{ name }}</h1>
    </section>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";
export default {
    data() {
        return {
            name: firebase.auth().currentUser,
        };
    },
    methods: {
        checkAuthStatus: function () {
            return new Promise((resolve, reject) => {
                try {
                    firebase.auth().onAuthStateChanged((user) => resolve(user));
                } catch (err) {
                    reject(err);
                }
            });
        },
    },
    async mounted() {
        let user = await this.checkAuthStatus();
        if (user) {
            this.name = user.email;
        } else {
            this.name = "No user logged in";
        }
    },
};
</script>

<style>
</style>