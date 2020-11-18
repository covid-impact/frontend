<template>
    <section class="finance">
        <h1 class="main--heading">COVID-19 Impact</h1>
        <section class="country">
            <h2 class="heading">{{ stockName }} v/s {{ country.name }}</h2>
        </section>

        <h1 v-if="historyDataStockError">
            No historical stock data found for {{ stockName }}
        </h1>
        <stock-chart
            v-else
            :title="`${stockName} stock price`"
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
            type: String,
            required: false,
            deafult: () => "CCL",
        },
    },
    data: function () {
        return {
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
        /**
         * @vuese
         * get the COVID-19 and stock market data
         */
        getData: async function (type) {
            let datesAll = null;
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
                datesAll = dates;
            } catch (error) {
                this.historyDataCovidError = true;
            }

            try {
                const responseFinance = await fetch(
                    `https://sandbox.iexapis.com/stable/stock/${this.stockName}/chart/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b`
                );
                const dataFinance = await responseFinance.json();

                let close = [];
                let open = [];
                let high = [];
                let low = [];

                dataFinance.forEach((element) => {
                    close.push(element.close);
                    open.push(element.open);
                    high.push(element.high);
                    low.push(element.low);
                });

                const series = [
                    {
                        name: "Open",
                        data: this.zip(open, datesAll),
                        color: "green",
                    },
                    {
                        name: "Close",
                        data: this.zip(close, datesAll),
                        color: "blue",
                    },
                    {
                        name: "High",
                        data: this.zip(high, datesAll),
                        color: "yellow",
                    },
                    {
                        name: "Low",
                        data: this.zip(low, datesAll),
                        color: "red",
                    },
                ];

                this.dataStock = { ...this.options, series };
            } catch (error) {
                this.historyDataStockError = true;
            }
        },
        provinceChange: function (country) {
            this.stateSelected = country[1];
            this.getData("province");
        },
    },
    mounted() {
        this.getData("country");
    },
    watch: {
        theme: function () {
            this.getData("country");
        },
        stockName: function () {
            this.getData("country");
        },
    },
};
</script>

<style>
.finance {
    width: 100%;
}
</style>