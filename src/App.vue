<template>
    <div class="app">
        <nav class="main--menu">
            <h1 class="logo">COVIDF</h1>
            <ul class="menu">
                <li class="menu--item">COVID</li>
                <li class="menu--item">Finance</li>
            </ul>
        </nav>
        <section class="main">
            <h1 class="heading">Canada</h1>
            <ul class="info--list">
                <li class="info--list--item cases">
                    <h3 class="info--list--item--head">Cases</h3>
                    <span class="info--list--item--number">100,000</span>
                </li>
                <li class="info--list--item cases">
                    <h3 class="info--list--item--head">Cases</h3>
                    <span class="info--list--item--number">100,000</span>
                </li>
                <li class="info--list--item cases">
                    <h3 class="info--list--item--head">Cases</h3>
                    <span class="info--list--item--number">100,000</span>
                </li>
                <li class="info--list--item cases">
                    <h3 class="info--list--item--head">Cases</h3>
                    <span class="info--list--item--number">100,000</span>
                </li>
                <li class="info--list--item cases">
                    <h3 class="info--list--item--head">Cases</h3>
                    <span class="info--list--item--number">100,000</span>
                </li>
                <li class="info--list--item cases">
                    <h3 class="info--list--item--head">Cases</h3>
                    <span class="info--list--item--number">100,000</span>
                </li>
                <li class="info--list--item cases">
                    <h3 class="info--list--item--head">Cases</h3>
                    <span class="info--list--item--number">100,000</span>
                </li>
                <li class="info--list--item cases">
                    <h3 class="info--list--item--head">Cases</h3>
                    <span class="info--list--item--number">100,000</span>
                </li>
            </ul>
            <Chart
                title="COVID Data for Canada"
                :data="dataCovid"
                :options="options"
            />
            <!-- <Chart title="Stock Data" :data="dataStock" :options="options" /> -->
        </section>
    </div>
</template>

<script>
import Chart from "./components/Chart";

export default {
    name: "App",
    components: {
        Chart,
    },
    data: function () {
        return {
            dataCovid: {},
            dataStock: {},
            options: {
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius: 1.5,
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
                "https://disease.sh/v3/covid-19/historical/Canada?lastdays=365"
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
    box-sizing: border-box;
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
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 15% 85%;
    grid-template-rows: 1fr;
    grid-template-areas: "menu main";
}

.main--menu {
    width: 100%;
    padding: 20px 15px;
    grid-area: menu;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.logo {
    font-size: 3em;
}

.menu {
    width: 100%;
    list-style-type: none;
}

.menu--item {
    width: 100%;
    border: 2px solid black;
    font-size: 1.5em;
    margin: 5px;
    padding: 5px;
}

.main {
    grid-area: main;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.heading {
    font-size: 2.5em;
    justify-self: flex-start;
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
    border: 2px solid black;
}

.info--list--item--head {
    font-size: 2em;
}

.info--list--item--number {
    font-size: 3em;
}

@media (max-width: 575.98px) {
    .app {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 15% 85%;
        grid-template-areas:
            "menu"
            "main";
    }

    .info--list--item {
        width: 100%;
    }
}

@media (max-width: 767.98px) {
}

@media (max-width: 991.98px) {
}

@media (max-width: 1199.98px) {
}
</style>
