<template>
    <section class="finance">
        <h1 class="main--heading">COVID-19 Impact</h1>

        <button type="button" @click="addToFav">Favorite</button>
        <section class="country">
            <h2 class="heading">{{ stockName.name }} v/s {{ country.name }}</h2>
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
    },
    props: {
        // The theme for the page
        theme: { type: String, required: false, default: "light" },
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
        addToFav: function () {
            const user = firebase.auth().currentUser;
            console.log(user);
            const ref = db.collection("users").doc(user.uid);

            ref.update({
                favorites: firebase.firestore.FieldValue.arrayUnion({
                    type: "finance",
                    route: this.$route.name,
                    country: this.country,
                    stockName: this.stockName,
                    timeStamp: Date.now()
                }),
            }).then(function() {
                alert("Stock Added to Favorite!");
            }).catch(error => console.log(error));
        },
        /**
         * @vuese
         * get the COVID-19 and stock market data
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
        getStockData: async function () {
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
        provinceChange: function (country) {
            this.stateSelected = country[1];
            this.getData("province");
        },
        countryChange: function (country) {
            this.country = country[0];
            this.countryIndex = country[1];
            localStorage.setItem("country", JSON.stringify(country[0]));
            this.getData("country");
        },
    },
    mounted: async function () {
        await this.getData("country");
        await this.getStockData();
    },
    watch: {
        stockName: async function () {
            await this.getData("country");
            await this.getStockData();
        },
    },
};
</script>

<style>
.finance {
    width: 100%;
}
</style>