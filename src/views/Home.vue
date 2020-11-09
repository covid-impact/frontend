<template>
    <section class="home">
        <section class="search-bar">
            <Search v-on:searchWithInput="search"></Search>
        </section>
        <h1 class="main--heading">COVID-19 Data</h1>
        <section class="country">
            <h2 class="heading">{{ country.name }}</h2>
            <Select :countries="countries" @conutryChange="countryChange" />
        </section>

        <ul class="info--list">
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
        <h1 v-if="historyDataCovidError">No historical data found</h1>
        <Chart
            v-else
            :title="`COVID Data for ${country.name}`"
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
import options from "@/assets/chartOptions.js";
import Search from "../components/Search";

// @group Views
/**
 * Home for the website
 */
export default {
    components: {
        Chart,
        Select,
        Search,
    },
    props: {
        // The theme for the page
        theme: { type: String, required: false, default: "light" },
    },
    data: function () {
        return {
            countries,
            dataCovid: {},
            historyDataCovidError: false,
            dataStock: {},
            options: options[localStorage.getItem("theme") || "light"],
            country: JSON.parse(localStorage.getItem("country")) || {
                code: "CA",
                code3: "CAN",
                name: "Canada",
                number: "124",
            },
            countryCOVIDData: {
                updated: 1604676052089,
                country: "Canada",
                countryInfo: {
                    _id: 124,
                    iso2: "CA",
                    iso3: "CAN",
                    lat: 60,
                    long: -95,
                    flag: "https://disease.sh/assets/img/flags/ca.png",
                },
                cases: 251338,
                todayCases: 0,
                deaths: 10381,
                todayDeaths: 0,
                recovered: 207998,
                todayRecovered: 0,
                active: 32959,
                critical: 234,
                casesPerOneMillion: 6639,
                deathsPerOneMillion: 274,
                tests: 9763591,
                testsPerOneMillion: 257906,
                population: 37857209,
                continent: "North America",
                oneCasePerPeople: 151,
                oneDeathPerPeople: 3647,
                oneTestPerPeople: 4,
                activePerOneMillion: 870.61,
                recoveredPerOneMillion: 5494.28,
                criticalPerOneMillion: 6.18,
            },
        };
    },
    methods: {
        /**
         * @vuese
         * trigger when button pressed
         */
        search(input) {
          input = input.toLowerCase();
          let inputCountry = "";
          for (let i in this.countries){
            if (this.countries[i].code.toLowerCase().match(input) ||
                this.countries[i].code3.toLowerCase().match(input) ||
                this.countries[i].name.toLowerCase().match(input) ||
                this.countries[i].number.toLowerCase().match(input)) {
                  inputCountry = this.countries[i];
                }

          }
          console.log(inputCountry);
          this.countryChange(inputCountry);
        },
        /**
         * @vuese
         * Gets the historical covid data for the user selected country.
         */
        getData: async function () {
            try {
                this.historyDataCovidError = false;
                const response = await fetch(
                    `https://disease.sh/v3/covid-19/historical/${this.country.code}?lastdays=365`
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
            } catch (error) {
                this.historyDataCovidError = true;
            }

            // const responseFinance = await fetch(
            //     "https://sandbox.iexapis.com/stable/stock/CCL/chart/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b"
            // );
            // const dataFinance = await responseFinance.json();

            // let close = [];
            // let open = [];
            // let high = [];
            // let low = [];

            // dataFinance.forEach((element) => {
            //     close.push(element.close);
            //     open.push(element.open);
            //     high.push(element.high);
            //     low.push(element.low);
            // });

            // const dataStock = {
            //     labels: dates,
            //     datasets: [
            //         {
            //             label: "Open",
            //             data: open,
            //             borderWidth: 1,
            //             borderColor: "green",
            //             backgroundColor: "transparent",
            //         },
            //         {
            //             label: "Close",
            //             data: close,
            //             borderWidth: 1,
            //             borderColor: "blue",
            //             backgroundColor: "transparent",
            //         },
            //         {
            //             label: "High",
            //             data: high,
            //             borderWidth: 1,
            //             borderColor: "yellow",
            //             backgroundColor: "transparent",
            //         },
            //         {
            //             label: "Low",
            //             data: low,
            //             borderWidth: 1,
            //             borderColor: "red",
            //             backgroundColor: "transparent",
            //         },
            //     ],
            // };

            // this.dataStock = dataStock;
        },
        /**
         * @vuese
         * Changes the country to the user selection.
         * @arg an object with name and ISO codes for the country
         */
        countryChange: function (country) {
            this.country = country;
            localStorage.setItem("country", JSON.stringify(country));
            this.getConutryData();
            this.getData();
        },
        /**
         * @vuese
         * Gets the current data for selected country
         */
        getConutryData: async function () {
            const url = `https://disease.sh/v3/covid-19/countries/${this.country.code3}?strict=true`;
            const response = await fetch(url);
            const data = await response.json();

            this.countryCOVIDData = data;
        },
    },
    mounted() {
        this.getData();
    },
    watch: {
        theme: function (newTheme) {
            this.options = options[newTheme];
        },
    },
};
</script>

<style>
.home {
    width: 100%;
}

.search-bar {
    grid-area: search;
    display: flex;
    align-items: center;
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
