<template>
    <section class="user">
        <h1 class="main--heading">{{ name }}</h1>
        <loading v-if="loadingFavs" />
        <h2 v-if="!loadingFavs" class="heading">User favorites</h2>
        <table v-if="!loadingFavs" class="user--fav">
            <thead>
                <tr class="user--fav--row">
                    <th class="user--fav--head">Conutry</th>
                    <th class="user--fav--head">Stock</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="user--fav--row"
                    v-for="(fav, index) in favorites"
                    :key="index"
                >
                    <td @click="gotoFav(index)" class="user--fav--data">
                        {{ fav.country.name }}
                    </td>
                    <td @click="gotoFav(index)" class="user--fav--data">
                        {{ fav.stockName.name }}
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";
import db from "../main";
import Loading from "../components/Loading.vue";

// @group Views
/**
 * The profile of the user.
 */
export default {
    components: { Loading },
    data() {
        return {
            name: "",
            id: "",
            favorites: [],
            loadingFavs: false,
        };
    },
    methods: {
        /**
         * @vuese
         * Check if the user is logged in.
         */
        checkAuthStatus: function () {
            return new Promise((resolve, reject) => {
                try {
                    firebase.auth().onAuthStateChanged((user) => resolve(user));
                } catch (err) {
                    reject(err);
                }
            });
        },
        /**
         * @vuese
         * Get the data for the logged in user.
         */
        getUserData: async function () {
            this.loadingFavs = true;
            const res = await db.collection("users").doc(this.id).get();
            const data = res.data();
            this.name = data.name;
            this.favorites = [...data.favorites];
            this.loadingFavs = false;
        },
        /**
         * @vuese
         * Data to display based on type of favorite
         * @arg the favorited item
         */
        favorite: function (fav) {
            if (fav.type === "finance") {
                return `${fav.country.name} | ${fav.stockName.name}`;
            }

            if (fav.type === "country") {
                return `${fav.country.name}`;
            }

            return "";
        },
        /**
         * @vuese
         * Redirection to the favorite that user has clicked
         * @arg index if the favorited item that user clicked
         */
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
.user {
    width: 100%;
}

.user--fav {
    text-align: left;
    width: 100%;
    border: 1px solid var(--text);
    border-collapse: collapse;
    margin-top: 20px;
}

.user--fav--data,
.user--fav--head {
    border: 1px solid var(--text);
    padding: 5px;
}

.user--fav--data {
    cursor: pointer;
}
</style>