<template>
    <section class="finance">
        <section class="search-bar">
            <Search v-on:searchWithInput="search"></Search>
        </section>
        <h1 class="main--heading">COVID-19 Data</h1>
        <section class="country">
            <h2 class="heading">{{ location }}</h2>

        </section>

        <h1 v-if="historyDataStockError">No historical stock data found</h1>
        <Chart
            v-else
            :title="`Stock Data for ${stockName}`"
            :data="dataStock"
            :options="options"
        />
        <h1 v-if="historyDataCovidError">No historical covid data found</h1>
        <Chart
            v-else
            :title="`COVID Data for ${location}`"
            :data="dataCovid"
            :options="options"
        />
        <!-- <Chart title="Stock Data" :data="dataStock" :options="options" /> -->
    </section>
</template>

<script>
import countries from "@/assets/countries";
import Chart from "../components/Chart";
import options from "@/assets/chartOptions.js";
import Search from "../components/Search";

// @group Views
/**
 * finance for the website
 */
export default {
    components: {
        Chart,
        Search,
    },
    props: {
        // The theme for the page
        theme: { type: String, required: false, default: "light" },
    },
    data: function () {
        return {
            countries,
            location :  "US",
            dataCovid: {},
            historyDataCovidError: false,
            historyDataStockError: false,
            dataStock: {},
            dates: {},
            stockName:  "CCL",
            options: options[localStorage.getItem("theme") || "light"],
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
          this.stockName = input;
          this.submitSearchCompany();
        },
        //function for searching stock company
        //trigger by button click
        //first get country of the stock
        //then call getCovidData() of the country
        //call getStockData() as well
        submitSearchCompany: async function () {
            //finance
            var country = await this.getCountryFromCompany();
            this.location = country;

            let dates = await this.getCovidData(country);
            this.getStockData(dates);
        },
        //function getting country from stock company using Stock API(iex)
        //input - this.stockName
        //return - comapny country
        getCountryFromCompany: async function () {
            const responseFinance = await fetch(
                "https://sandbox.iexapis.com/stable/stock/" +
                    this.stockName +
                    "/company/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b"
            );
            const dataFinance = await responseFinance.json();
            return dataFinance.country;
        },
        /**
          * function for using Stock API(iex)
          * input - stockName, string, name of stock
          * input - dates - labels = dates to be used in chart
          * this.stockData = data from Stock api
          * no return
         */
        getStockData: async function (dates) {
            try {
                this.historyDataStockError = false;
                const responseFinance = await fetch(
                    "https://sandbox.iexapis.com/stable/stock/" +
                        this.stockName +
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
            } catch (error) {
                this.historyDataStockError = true;
            }

        },
        //function for using Stock API(iex)
        //input - stockName, string, name of stock
        //input - dates - labels = dates to be used in chart
        //this.stockData = data from Stock api
        //no return
        getCovidData: async function () {
            try {
              this.historyDataCovidError = false;
              const response = await fetch(
                  "https://disease.sh/v3/covid-19/historical/" +
                      this.location +
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
              this.dates = dates;
              return dates;
            } catch (error) {
                this.historyDataCovidError = true;
            }
        },
        /**
         * @vuese
         * setup
         */
        getData: async function () {
            this.search("CCL");
        }
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
