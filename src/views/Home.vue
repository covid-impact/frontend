<template>
    <section class="home">
        <h1 class="main--heading">COVID-19 Data</h1>
        <section class="country">
            <h2 class="heading">{{ country.name }}</h2>
            <!-- <Select
                :data="countries"
                :default="country"
                @newSelection="countryChange"
                placeholder="Select some other country"
            /> -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="fav--icon ionicon"
                viewBox="0 0 512 512"
                :class="isFav ? 'fav--icon--fav' : 'fav--icon--not--fav'"
                @click="addToFav"
            >
                <title>Favorite</title>
                <path
                    d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="32"
                />
            </svg>
        </section>
        <Loading v-if="loadingCountry" />
        <ul v-else class="info--list">
            <li class="info--list--item cases">
                <h3 class="info--list--item--head">Cases</h3>
                <span class="info--list--item--number">{{
                    countryCOVIDData.cases
                }}</span>
            </li>
            <li class="info--list--item cases">
                <h3 class="info--list--item--head">Cases Today</h3>
                <span class="info--list--item--number">{{
                    countryCOVIDData.todayCases
                }}</span>
            </li>
            <li class="info--list--item cases">
                <h3 class="info--list--item--head">Tests Coducted</h3>
                <span class="info--list--item--number">{{
                    countryCOVIDData.tests
                }}</span>
            </li>
            <li class="info--list--item deaths">
                <h3 class="info--list--item--head">Deaths</h3>
                <span class="info--list--item--number">{{
                    countryCOVIDData.deaths
                }}</span>
            </li>
            <li class="info--list--item deaths">
                <h3 class="info--list--item--head">Deaths Today</h3>
                <span class="info--list--item--number">{{
                    countryCOVIDData.todayDeaths
                }}</span>
            </li>
            <li class="info--list--item active">
                <h3 class="info--list--item--head">Active</h3>
                <span class="info--list--item--number">{{
                    countryCOVIDData.active
                }}</span>
            </li>
            <li class="info--list--item recovered">
                <h3 class="info--list--item--head">Recovered</h3>
                <span class="info--list--item--number">{{
                    countryCOVIDData.recovered
                }}</span>
            </li>
            <li class="info--list--item critical">
                <h3 class="info--list--item--head">Critical</h3>
                <span class="info--list--item--number">{{
                    countryCOVIDData.critical
                }}</span>
            </li>
        </ul>
        <Select
            v-if="
                states != 'mainland' &&
                !loadingHistorical &&
                !historyDataCovidError
            "
            :data="getStates"
            @newSelection="provinceChange"
            :placeholder="`${
                displaying === 'country'
                    ? 'Select Province'
                    : states[stateSelected]
            }`"
        />
        <Loading v-if="loadingHistorical" />
        <h2 v-else-if="historyDataCovidError">No historical data found</h2>
        <Chart
            v-else
            :title="`COVID Data for ${
                displaying === 'country' ? country.name : states[stateSelected]
            }`"
            :data="dataCovid"
            :options="options"
        />
        <!-- <Chart title="Stock Data" :data="dataStock" :options="options" /> -->
    </section>
</template>

<script>
import countries from "@/assets/countries";
import Chart from "../components/Chart";
import Select from "../components/Select";
import Loading from "../components/Loading";
import options from "@/assets/chartOptions.js";
import db from "../main";
import { firebase } from "@firebase/app";
import "@firebase/auth";

// @group Views
/**
 * Home for the website
 */
export default {
    components: {
        Chart,
        Select,
        Loading,
    },
    props: {
        // The theme for the page
        theme: { type: String, required: false, default: "light" },
        country: {
            type: Object,
            required: false,
            default: function () {
                return {
                    code: "CA",
                    code3: "CAN",
                    name: "Canada",
                    number: "124",
                };
            },
        },
    },
    data: function () {
        return {
            loadingCountry: false,
            loadingHistorical: false,
            countries,
            states: localStorage.getItem("states") || "mainland",
            stateSelected: null,
            dataCovid: {},
            historyDataCovidError: false,
            options: options[localStorage.getItem("theme") || "light"],
            displaying: "country",
            countryIndex: null,
            countryCOVIDData: {},
            isFav: false,
            id: "",
        };
    },
    computed: {
        getStates: function () {
            const isArray = Array.isArray(this.states);
            if (isArray) {
                let states = this.states.map((element, index) => {
                    return { name: element, code: index };
                });

                return states;
            } else {
                let states = this.states.split(",");

                let stateToSend = states.map((element, index) => {
                    return { name: element, code: index };
                });
                return stateToSend;
            }
        },
    },
    methods: {
        zip: (a, b) => a.map((k, i) => [Date.parse(b[i]), k]),
        checkAuthStatus: function () {
            return new Promise((resolve, reject) => {
                try {
                    firebase.auth().onAuthStateChanged((user) => resolve(user));
                } catch (err) {
                    reject(err);
                }
            });
        },
        addToFav: function () {
            if (!this.isFav) {
                const user = firebase.auth().currentUser;
                console.log(user);
                const ref = db.collection("users").doc(user.uid);
                try {
                    ref.update({
                        favorites: firebase.firestore.FieldValue.arrayUnion({
                            id: user.uid,
                            type: "country",
                            route: this.$route.name,
                            country: this.country,
                        }),
                    });

                    this.isFav = true;
                } catch (error) {
                    this.isFav = false;
                }
            }
        },
        checkFav: async function () {
            const ref = db.collection("users");
            const fav = {
                id: this.id,
                type: "country",
                route: this.$route.name,
                country: this.country,
            };
            let favs = await ref
                .where("favorites", "array-contains", fav)
                .get();
            let allFavs = [];
            for (const doc of favs.docs) {
                doc.data().keywordsBoth = [];
                doc.data().keywordsSymbol = [];
                doc.data().keywordsName = [];
                allFavs.push(doc.data());
            }
            if (allFavs.length === 1) {
                this.isFav = true;
            } else {
                this.isFav = false;
            }
        },
        /**
         * @vuese
         * Gets the historical covid data for the user selected country.
         */
        getData: async function (type) {
            try {
                this.loadingHistorical = true;
                this.historyDataCovidError = false;
                let response;
                if (type === "country") {
                    response = await fetch(
                        `https://disease.sh/v3/covid-19/historical/${this.country.code}?lastdays=365`
                    );
                    this.displaying = "country";
                }

                if (type === "province") {
                    response = await fetch(
                        `https://disease.sh/v3/covid-19/historical/${
                            this.country.code
                        }/${this.states[this.stateSelected]}?lastdays=365`
                    );
                    this.displaying = "province";
                }
                const dataJSON = await response.json();

                localStorage.setItem("states", dataJSON.province);
                if (type === "country") {
                    this.states = dataJSON.province;
                }

                let dates = Object.keys(dataJSON.timeline.cases);
                let cases = Object.values(dataJSON.timeline.cases);
                let deaths = Object.values(dataJSON.timeline.deaths);
                let recovered = Object.values(dataJSON.timeline.recovered);

                const series = [
                    {
                        name: "Cases",
                        data: this.zip(cases, dates),
                        color: "#708090",
                    },
                    {
                        name: "Deaths",
                        data: this.zip(deaths, dates),
                        color: "rgb(244, 67, 54)",
                    },
                    {
                        name: "Recovered",
                        data: this.zip(recovered, dates),
                        color: "rgb(118, 255, 3)",
                    },
                ];

                this.dataCovid = { ...this.options, series };
                this.loadingHistorical = false;

                // console.log(this.dataCovid);
            } catch (error) {
                console.log(error);
                this.loadingHistorical = false;
                this.historyDataCovidError = true;
            }
        },
        /**
         * @vuese
         * Changes the country to the user selection.
         * @arg an object with name and ISO codes for the country
         */
        countryChange: function (country) {
            [this.country, this.countryIndex] = country;
            localStorage.setItem("country", JSON.stringify(this.country));
            this.getConutryData();
            this.getData("country");
        },
        provinceChange: function (country) {
            this.stateSelected = country[1];
            this.getData("province");
        },
        /**
         * @vuese
         * Gets the current data for selected country
         */
        getConutryData: async function () {
            this.loadingCountry = true;
            const url = `https://disease.sh/v3/covid-19/countries/${this.country.code3}?strict=true`;
            const response = await fetch(url);
            const data = await response.json();
            this.countryCOVIDData = data;

            this.loadingCountry = false;
        },
    },
    async mounted() {
        this.getData("country");
        this.getConutryData();
        let user = await this.checkAuthStatus();
        if (user) {
            this.id = user.uid;
        } else {
            this.id = "";
        }
        this.checkFav();
    },
    watch: {
        theme: function () {
            this.dataCovid = { ...this.dataCovid };
        },
        country: function () {
            this.getData("country");
            this.getConutryData();
        },
    },
};
</script>

<style>
.home {
    width: 100%;
}

.main--heading {
    font-size: 3em;
}

.heading {
    font-size: 2.5em;
    justify-self: flex-start;
}

.country {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info--list {
    display: flex;
    list-style-type: none;
    flex-wrap: wrap;
    width: 100%;
    margin: 20px 0px;
}

.info--list--item {
    padding: 10px;
    width: 22%;
    margin: 5px;
    border-radius: 10px;
    background: var(--background-card);
    transition: 0.2s box-shadow, 0.2s transform;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
    margin: 10px;
}

.cases {
    color: var(--cases);
    border: 2px solid var(--cases);
}

.deaths {
    color: var(--deaths);
    border: 2px solid var(--deaths);
}

.active {
    color: var(--active);
    border: 2px solid var(--active);
}

.recovered {
    color: var(--recovered);
    border: 2px solid var(--recovered);
}

.critical {
    color: var(--critical);
    border: 2px solid var(--critical);
}

.info--list--item--head {
    font-size: 2em;
}

.info--list--item--number {
    font-size: 3em;
}

.fav--icon {
    height: 50px;
    width: 50px;
    cursor: pointer;
}

.fav--icon--fav {
    fill: yellow;
}

.fav--icon--not--fav {
    fill: transparent;
}

@media not all and (hover: none) {
    .info--list--item:hover {
        box-shadow: none;
        transform: translateY(2px) perspective(100em) rotateX(10deg);
        text-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.116);
    }
}

@media (max-width: 1199.98px) {
}

@media (max-width: 991.98px) {
    .country {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .info--list--item {
        width: 45%;
    }

    .heading {
        margin-top: 10px;
    }

    .info--list {
        justify-content: flex-start;
    }
}

@media (max-width: 767.98px) {
}

@media (max-width: 575.98px) {
    .info--list--item {
        width: 100%;
    }

    .country {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: flex-start;
    }

    .heading {
        margin-top: 10px;
    }

    .info--list--item:first-of-type {
        margin-top: 0;
    }

    .info--list--item {
        margin: 0;
        margin-top: 15px;
    }
}
</style>
