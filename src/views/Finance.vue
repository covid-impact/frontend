<template>
    <section class="finance">
        <h1 class="main--heading">COVID-19 Impact</h1>
        <section class="country">
            <h2 class="heading">{{ stockName.name }} v/s {{ country.name }}</h2>
            <Loading v-if="loggedIn && loadingFav" />
            <svg
                v-if="loggedIn && !loadingFav"
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
            <Select
                @newSelection="countryChange"
                :default="country"
                :data="countries"
                placeholder="Select some other country"
            />
        </section>

        <h1 v-if="historyDataStockError">
            No historical stock data found for {{ stockName.name }}
        </h1>
        <stock-chart
            v-else
            :title="`${stockName.name} |  ${stockName.region} | ${stockName.symbol} | ${stockName.exchange} stock price`"
            :data="dataStock"
        />
        <Select
            v-if="states != 'mainland' && !historyDataCovidError"
            :data="getStates"
            @newSelection="provinceChange"
            :placeholder="`${
                displaying === 'country'
                    ? 'Select Province'
                    : states[stateSelected]
            }`"
        />
        <h1 v-if="historyDataCovidError">
            No historical covid data found for {{ country.name }}
        </h1>
        <stock-chart
            v-else
            :title="`COVID Data for ${
                displaying === 'country' ? country.name : states[stateSelected]
            }`"
            :data="dataCovid"
        />
        <!-- <Chart title="Stock Data" :data="dataStock" :options="options" /> -->
    </section>
</template>

<script>
import StockChart from "../components/StockChart";
import options from "@/assets/chartOptions.js";
import Select from "../components/Select";
import countries from "@/assets/countries.js";
import Loading from "../components/Loading";
import db from "../main";
import { firebase } from "@firebase/app";
import "@firebase/auth";

// @group Views
/**
 * To analyse the impact of COVID-19 on Stock Market
 */
export default {
    components: {
        StockChart,
        Select,
        Loading,
    },
    props: {
        // The theme for the page
        theme: { type: String, required: false, default: "light" },
        // Stock for which the data is to fetched.
        stockName: {
            type: Object,
            required: false,
            deafult: () => ({
                isEnabled: true,
                name: "Apple Inc.",
                cik: "320193",
                type: "cs",
                symbol: "AAPL",
                region: "US",
                currency: "USD",
                exchange: "NAS",
                queryableSymbol: "aapl",
                iexId: "IEX_4D48333344362D52",
                figi: "BBG000B9XRY4",
                date: "2020-11-18",
                queryable: "apple inc.",
            }),
        },
    },
    data: function () {
        return {
            countries,
            dataCovid: {},
            historyDataCovidError: false,
            historyDataStockError: false,
            dataStock: {},
            dates: {},
            options: options[localStorage.getItem("theme") || "light"],
            country: JSON.parse(localStorage.getItem("country")) || {
                code: "CA",
                code3: "CAN",
                name: "Canada",
                number: "124",
            },
            displaying: "country",
            states: localStorage.getItem("states") || "mainland",
            stateSelected: null,
            isFav: false,
            id: "",
            loadingFav: false,
            loggedIn: false,
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
        /**
         * @vuese
         * Zips two given arrays into a two dimensional array.
         * @arg array to zip
         * @arg array to zip
         */
        zip: (a, b) => a.map((k, i) => [Date.parse(b[i]), k]),
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
         * Add the current country and stock to favorites.
         */
        addToFav: function () {
            const ref = db.collection("users").doc(this.id);
            if (!this.isFav) {
                try {
                    this.loadingFav = true;
                    ref.update({
                        favorites: firebase.firestore.FieldValue.arrayUnion({
                            id: this.id,
                            type: "finance",
                            route: this.$route.name,
                            country: this.country,
                            stockName: this.stockName,
                        }),
                    });

                    this.isFav = true;
                    this.loadingFav = false;
                } catch (error) {
                    this.isFav = false;
                    this.loadingFav = false;
                }
            } else {
                try {
                    this.loadingFav = true;
                    ref.update({
                        favorites: firebase.firestore.FieldValue.arrayRemove({
                            id: this.id,
                            type: "finance",
                            route: this.$route.name,
                            country: this.country,
                            stockName: this.stockName,
                        }),
                    });
                    this.isFav = false;
                    this.loadingFav = false;
                } catch (error) {
                    this.isFav = true;
                    this.loadingFav = false;
                }
            }
        },
        /**
         * @vuese
         * Checks if the current country and stock is already in favorites.
         */
        checkFav: async function () {
            const ref = db.collection("users");
            const fav = {
                id: this.id,
                type: "finance",
                route: this.$route.name,
                country: this.country,
                stockName: this.stockName,
            };
            try {
                this.loadingFav = true;
                let favs = await ref
                    .where("favorites", "array-contains", fav)
                    .get();
                let allFavs = [];
                for (const doc of favs.docs) {
                    allFavs.push(doc.data());
                }
                if (allFavs.length === 1) {
                    this.isFav = true;
                } else {
                    this.isFav = false;
                }
                this.loadingFav = false;
            } catch (error) {
                console.log(error);
                this.isFav = false;
                this.loadingFav = false;
            }
        },
        /**
         * @vuese
         * get the COVID-19
         */
        getData: async function (type) {
            try {
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
            } catch (error) {
                console.log(error);
                this.historyDataCovidError = true;
            }
        },
        /**
         * @vuese
         * get the stock data.
         */ getStockData: async function () {
            try {
                const responseFinance = await fetch(
                    `https://sandbox.iexapis.com/stable/stock/${this.stockName.symbol}/chart/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b`
                );
                const dataFinance = await responseFinance.json();

                let dates = [];
                let close = [];
                let open = [];
                let high = [];
                let low = [];

                dataFinance.forEach((element) => {
                    dates.push(element.date);
                    close.push(element.close);
                    open.push(element.open);
                    high.push(element.high);
                    low.push(element.low);
                });

                const series = [
                    {
                        name: "Open",
                        data: this.zip(open, dates),
                        color: "green",
                    },
                    {
                        name: "Close",
                        data: this.zip(close, dates),
                        color: "blue",
                    },
                    {
                        name: "High",
                        data: this.zip(high, dates),
                        color: "yellow",
                    },
                    {
                        name: "Low",
                        data: this.zip(low, dates),
                        color: "red",
                    },
                ];

                this.dataStock = { ...this.options, series };
            } catch (error) {
                console.log(error);
                this.historyDataStockError = true;
            }
        },
        /**
         * @vuese
         * If supported for a country, change the province to get data for it.
         */
        provinceChange: function (country) {
            this.stateSelected = country[1];
            this.getData("province");
        },
        /**
         * @vuese
         * Change the country for which data is to be shown
         */
        countryChange: function (country) {
            this.country = country[0];
            this.countryIndex = country[1];
            localStorage.setItem("country", JSON.stringify(country[0]));
            this.checkFav();
            this.getData("country");
        },
    },
    mounted: async function () {
        let user = await this.checkAuthStatus();
        if (user) {
            this.loggedIn = true;
            this.id = user.uid;
        } else {
            this.loggedIn = false;
            this.id = "";
        }
        this.checkFav();
        await this.getData("country");
        await this.getStockData();
    },
    watch: {
        stockName: async function () {
            this.checkFav();
            await this.getData("country");
            await this.getStockData();
        },
        $route() {
            this.checkFav();
        },
    },
};
</script>

<style>
.finance {
    width: 100%;
}
</style>