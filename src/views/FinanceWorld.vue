<template>
    <section class="finance">
        <h1 class="main--heading">COVID-19 Impact</h1>
        <section class="country">
            <h2 class="heading">{{ stockName.name }} v/s World</h2>
        </section>

        <h1 v-if="historyDataStockError">
            No historical stock data found for {{ stockName }}
        </h1>
        <stock-chart
            v-else
            :title="`${stockName.name} |  ${stockName.region} | ${stockName.symbol} | ${stockName.exchange} stock price`"
            :data="dataStock"
        />
        <h1 v-if="historyDataCovidError">No historical covid data found</h1>
        <stock-chart v-else :title="`COVID Data for World`" :data="dataCovid" />
    </section>
</template>

<script>
import StockChart from "../components/StockChart";
import options from "@/assets/chartOptions.js";

// @group Views
/**
 * To analyse impact of COVID-19 on stock market
 */
export default {
    components: {
        StockChart,
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
            dataCovid: {},
            historyDataCovidError: false,
            historyDataStockError: false,
            dataStock: {},
            dates: {},
            options: options[localStorage.getItem("theme") || "light"],
        };
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
         * get the COVID-19 and stock market data
         */
        getData: async function () {
            let datesAll = null;
            try {
                this.historyDataCovidError = false;
                const response = await fetch(
                    `https://disease.sh/v3/covid-19/historical/all?lastdays=365`
                );
                const dataJSON = await response.json();

                let dates = Object.keys(dataJSON.cases);
                let cases = Object.values(dataJSON.cases);
                let deaths = Object.values(dataJSON.deaths);
                let recovered = Object.values(dataJSON.recovered);

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
                console.log(error);
                this.historyDataCovidError = true;
            }

            try {
                const responseFinance = await fetch(
                    `https://sandbox.iexapis.com/stable/stock/${this.stockName.symbol}/chart/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b`
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
                console.log(error);
                this.historyDataStockError = true;
            }
        },
    },
    mounted() {
        this.getData();
    },
    watch: {
        theme: function () {
            this.dataCovid = { ...this.dataCovid };
            this.dataStock = { ...this.dataStock };
        },
    },
};
</script>

<style>
.finance {
    width: 100%;
}
</style>