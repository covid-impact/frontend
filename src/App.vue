<template>
    <div class="app">
        <section class="logo">
            <router-link
                :to="{ name: 'home' }"
                v-slot="{ href, navigate, isActive, isExactActive }"
            >
                <a
                    :class="[isActive && '', isExactActive && '', 'logo--link']"
                    :href="href"
                    @click="navigate"
                >
                    <h1>CF</h1></a
                >
            </router-link>
        </section>
        <Menu @themeChange="themeChange" />
        <section class="search-bar">
            <Search v-on:searchWithInput="search"></Search>
        </section>
        <section class="main">
            <transition name="slide-down" mode="out-in">
                <router-view :theme="theme" :key="$route.path" />
            </transition>
        </section>
    </div>
</template>

<script>
import Menu from "./components/Menu";
import Search from "./components/Search";
// @vuese
//@group Home
/**
 * The COVID-19 app resides here
 */
export default {
    name: "App",
    components: {
        Menu,
        Search,
    },
    data: function () {
        return {
            //data for creating the covid chart
            dataCovid: {},
            //data for creating the stock chart
            dataStock: {},
            //search input from user
            searchInput: "",
            //dates to be used in both charts
            dates: {},
            theme: "light",
            //options for chart
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
        //function  for using covid API(disease.sh)
        //input - location, string, country
        //this.covidData = data from Covid api
        //return dates(dataCovid.labels)
        /**
         * @vuese
         * for using covid API(disease.sh)
         * @arg location for COVID data
         */
        getCovidData: async function (location) {
            console.log("searching for location " + location);
            const response = await fetch(
                "https://disease.sh/v3/covid-19/historical/" +
                    location +
                    "?lastdays=365"
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
            return dates;
        },
        search(input) {
            //stock
            //this.searchInput = input;
            //this.submitSearchCompany()

            //covid
            //this.searchInput = input;
            //this.submitSearchLocation()

            //log
            console.log(input);
        },
        //function for using Stock API(iex)
        //input - stockName, string, name of stock
        //input - dates - labels = dates to be used in chart
        //this.stockData = data from Stock api
        //no return
        getStockData: async function (stockName, dates) {
            console.log("searching for stock " + stockName);
            const responseFinance = await fetch(
                "https://sandbox.iexapis.com/stable/stock/" +
                    stockName +
                    "/chart/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b"
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
        //function getting country from stock company using Stock API(iex)
        //input - companyName, String, name of stock
        //log company country as well
        //return - comapny country
        getCountryFromCompany: async function (companyName) {
            const responseFinance = await fetch(
                "https://sandbox.iexapis.com/stable/stock/" +
                    companyName +
                    "/company/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b"
            );
            const dataFinance = await responseFinance.json();
            console.log(companyName + " is located in " + dataFinance.country);
            return dataFinance.country;
        },
        //function for searching location
        //trigger by button click
        //directly call geCovidData()
        //no return
        submitSearchLocation: async function () {
            //covid
            this.getCovidData(this.searchInput);
        },
        //function for searching stock company
        //trigger by button click
        //first get country of the stock
        //then call getCovidData() of the country
        //call getStockData() as well
        submitSearchCompany: async function () {
            //finance
            var country = await this.getCountryFromCompany(this.searchInput);
            let dates = await this.getCovidData(country);
            this.getStockData(this.searchInput, dates);
        },
        //function for first load
        //default is 'CCL' stock company and 'US' country
        //call getCovidData() and  getStockData()
        //assign values to this.stockData, this.covidData and this.dates
        getData: async function () {
            let dates = [];
            dates = await this.getCovidData("US");
            this.getStockData("CCL", dates);
            this.dates = dates;
        },
        /**
         * @vuese
         * for switching themes
         * @arg theme to switch to
         */
        themeChange: function (theme) {
            this.theme = theme;
        },
    },
    mounted: function () {
        const html = document.querySelector("html");
        html.setAttribute(
            "data-theme",
            localStorage.getItem("theme") || "light"
        );
    },
};
</script>

<style>
html[data-theme="dark"] {
    --background: #303030;
    --background-secondary: #101010;
    --background-card: #000;
    --text: #fff;
    --text-menu: #fff;
    --deaths: rgb(244, 67, 54);
    --active: rgb(255, 235, 59);
    --recovered: rgb(118, 255, 3);
    --cases: #dadada;
    --critical: rgb(255, 23, 68);
}

html[data-theme="light"] {
    --background: #fff;
    --background-secondary: rgb(220, 226, 255);
    --background-card: #fff;
    --text: #000;
    --text-menu: #000;
    --deaths: rgb(244, 67, 54);
    --active: rgb(255, 235, 59);
    --recovered: rgb(118, 255, 3);
    --cases: #000;
    --critical: rgb(255, 23, 68);
}

* {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;
}

html,
body {
    min-height: 100vh;
    background: var(--background);
    color: var(--text);
    /* overflow-x: hidden; */
}

body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(-30px);
    opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
}
.slide-down-enter, .slide-down-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(-30px);
    opacity: 0;
}

.app {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 100px 1fr;
    grid-template-areas:
        "logo search"
        "menu main";
}

.logo {
    font-size: 3em;
    grid-area: logo;
    padding: 20px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: var(--background-secondary);
}

.logo--link,
.logo--link:active,
.logo--link:visited,
.logo--link:hover {
    color: var(--text-menu);
    text-decoration: none;
}

.main {
    grid-area: main;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
}

@media (max-width: 1199.98px) {
}

@media (max-width: 991.98px) {
    .app {
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-template-rows: max-content max-content 1fr;
        grid-template-areas:
            "logo menu"
            "search search"
            "main main";
    }

    .logo {
        font-size: 2.3em;
    }
}

@media (max-width: 767.98px) {
}

@media (max-width: 575.98px) {
    .app {
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-template-rows: max-content max-content 1fr;
        grid-template-areas:
            "logo menu"
            "search search"
            "main main";
    }

    .logo {
        font-size: 2.3em;
        padding: 10px 5px;
    }
}
</style>
