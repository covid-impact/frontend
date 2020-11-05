<template>
    <section>
        <h1 class="main--heading">COVID-19 Data</h1>
        <h2 class="heading">Canada</h2>
        <ul class="info--list">
            <li class="info--list--item cases">
                <h3 class="info--list--item--head">Cases</h3>
                <span class="info--list--item--number">100,000</span>
            </li>
            <li class="info--list--item cases">
                <h3 class="info--list--item--head">Cases Today</h3>
                <span class="info--list--item--number">100,000</span>
            </li>
            <li class="info--list--item cases">
                <h3 class="info--list--item--head">Tests Coducted</h3>
                <span class="info--list--item--number">100,000</span>
            </li>
            <li class="info--list--item deaths">
                <h3 class="info--list--item--head">Deaths</h3>
                <span class="info--list--item--number">100,000</span>
            </li>
            <li class="info--list--item deaths">
                <h3 class="info--list--item--head">Deaths Today</h3>
                <span class="info--list--item--number">100,000</span>
            </li>
            <li class="info--list--item active">
                <h3 class="info--list--item--head">Active</h3>
                <span class="info--list--item--number">100,000</span>
            </li>
            <li class="info--list--item recovered">
                <h3 class="info--list--item--head">Recovered</h3>
                <span class="info--list--item--number">100,000</span>
            </li>
            <li class="info--list--item critical">
                <h3 class="info--list--item--head">Critical</h3>
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
</template>

<script>
import Chart from "../components/Chart";
export default {
    components: {
        Chart,
    },
    data: function () {
        return {
            dataCovid: {},
            dataStock: {},
            options: {
                plugins: {
                    colorschemes: {
                        scheme: "brewer.RdYlGn8",
                    },
                },
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius: 1.5,
                    },
                },
                legend: {
                    labels: {
                        fontColor: "black",
                    },
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                fontColor: "black",
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "black",
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
                        borderColor: "rgb(244, 67, 54)",
                        backgroundColor: "transparent",
                    },
                    {
                        label: "Recovered",
                        data: recovered,
                        borderWidth: 1,
                        borderColor: "rgb(118, 255, 3)",
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
.main--heading {
    font-size: 3em;
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
    border-radius: 10px;
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

@media (max-width: 575.98px) {
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