<template>
    <div class="app">

        <h1 class="heading">Comparing USA covid cases to CCL</h1>
        <Search/>
        <Chart title="COVID Data" :data="dataCovid" :options="options" />
        <Chart title="Stock Data" :data="dataStock" :options="options" />
    </div>
</template>

<script>
import Chart from "./components/Chart";
import Search from "./components/Search";

export default {
    name: "App",
    components: {
        Chart,
        Search,
    },
    data: function () {
        return {
            dataCovid: {},
            dataStock: {},
            options: {
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius: 0,
                    },
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        };
    },
    methods: {
        getData: async function () {
            const response = await fetch(
                "https://disease.sh/v3/covid-19/historical/US?lastdays=365"
            );
            const dataJSON = await response.json();

            let dates = Object.keys(dataJSON.timeline.cases);
            let cases = Object.values(dataJSON.timeline.cases);
            let deaths = Object.values(dataJSON.timeline.deaths);
            let recovered = Object.values(dataJSON.timeline.recovered);

            const dataCovid = {
                labels: dates,
                datasets: [
                    {
                        label: "Cases",
                        data: cases,
                        borderWidth: 1,
                        borderColor: "gray",
                        backgroundColor: "transparent",
                    },
                    {
                        label: "Deaths",
                        data: deaths,
                        borderWidth: 1,
                        borderColor: "red",
                        backgroundColor: "transparent",
                    },
                    {
                        label: "Recovered",
                        data: recovered,
                        borderWidth: 1,
                        borderColor: "green",
                        backgroundColor: "transparent",
                    },
                ],
            };

            this.dataCovid = dataCovid;

            const responseFinance = await fetch(
                "https://sandbox.iexapis.com/stable/stock/CCL/chart/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b"
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

            const dataStock = {
                labels: dates,
                datasets: [
                    {
                        label: "Open",
                        data: open,
                        borderWidth: 1,
                        borderColor: "green",
                        backgroundColor: "transparent",
                    },
                    {
                        label: "Close",
                        data: close,
                        borderWidth: 1,
                        borderColor: "blue",
                        backgroundColor: "transparent",
                    },
                    {
                        label: "High",
                        data: high,
                        borderWidth: 1,
                        borderColor: "yellow",
                        backgroundColor: "transparent",
                    },
                    {
                        label: "Low",
                        data: low,
                        borderWidth: 1,
                        borderColor: "red",
                        backgroundColor: "transparent",
                    },
                ],
            };

            this.dataStock = dataStock;
        },
    },
    mounted() {
        this.getData();
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}

html,
body {
    min-height: 100vh;
}

body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.app {
    width: 80vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.heading {
    align-self: flex-start;
}
</style>
