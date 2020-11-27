<template>
    <section class="user">
        <h1 class="main--heading">{{ name }}</h1>
        <h2 class="heading">User favorites</h2>
        <ul>
            <li
                @click="gotoFav(index)"
                v-for="(fav, index) in favorites"
                :key="index"
            >
                {{ favorite(fav) }}
            </li>
        </ul>
    </section>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";
import db from "../main";
export default {
    data() {
        return {
            name: "",
            id: "",
            favorites: [],
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
        getUserData: async function () {
            const res = await db.collection("users").doc(this.id).get();
            const data = res.data();
            this.name = data.name;
            this.favorites = [...data.favorites];
        },
        favorite: function (fav) {
            if (fav.type === "finance") {
                return `${fav.country.name} | ${fav.stockName.name}`;
            }

            if (fav.type === "country") {
                return `${fav.country.name}`;
            }

            return "";
        },
        gotoFav: function (index) {
            const data = this.favorites[index];
            if (data.type === "finance") {
                localStorage.setItem(
                    "stockSymbol",
                    JSON.stringify(data.stockName)
                );
                localStorage.setItem("country", JSON.stringify(data.country));
                this.$parent.$emit("stockChange", data.stockName);
            }

            if (data.type === "country") {
                localStorage.setItem("country", JSON.stringify(data.country));
                this.$parent.$emit("countryChange", data.country);
            }

            this.$router.replace({ name: data.route });
        },
    },
    async mounted() {
        let user = await this.checkAuthStatus();
        if (user) {
            this.id = user.uid;
        } else {
            this.name = "No user logged in";
        }
        this.getUserData();
    },
};
</script>

<style>
</style>