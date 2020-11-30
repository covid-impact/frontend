<template>
    <section class="city">
        <h1>Currently only supports USA Counties</h1>
        <div
            class="select--margin--top"
            v-if="!loadingCounties && !countiesError"
        >
            <Select
                :data="countyList"
                :placeholder="`${
                    countyList[countySelected].name || 'Choose county'
                }`"
                @newSelection="countyChange"
            />
        </div>
        <!-- <h1 v-if="loadingCounties">Loading...</h1> -->
        <Loading v-if="loadingCounties" />

        <h1 v-if="countiesError">Error ocuured while getting Counties</h1>

        <div v-if="!loadingCounty && !countyError" class="select--margin--top">
            <Select
                :data="countyNameList"
                placeholder="Choose county"
                @newSelection="countyNameChange"
            />
        </div>

        <!-- <h1 v-if="loadingCounty">Loading...</h1> -->
        <Loading v-if="loadingCounty" />
        <h1 v-if="countyError">Error ocuured while getting County</h1>

        <stock-chart
            v-if="
                !loadingCounties &&
                !countiesError &&
                !loadingCounty &&
                !countyError
            "
            :title="`COVID Data in ${currentCountyData[countySelected].county}`"
            :data="getData"
        />
    </section>
</template>

<script>
import Select from "../components/Select";
import Loading from "../components/Loading";

import options from "@/assets/chartOptions.js";
import StockChart from "../components/StockChart.vue";

// @group Views
/**
 * To get the COVID-19 data citywise
 */
export default {
    components: {
        Select,
        Loading,
        StockChart,
    },
    computed: {
        getData: function () {
            const data = this.currentCountyData[this.countySelected];

            let dates = Object.keys(data.timeline.cases);
            let cases = Object.values(data.timeline.cases);
            let deaths = Object.values(data.timeline.deaths);

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
            ];
            // this.options = {
            //     ...this.options,
            //     chart: {
            //         ...this.options.chart,
            //         height: "50%",
            //     },
            // };
            return {
                ...this.options,
                chart: {
                    ...this.options.chart,
                },
                series,
            };
        },
    },
    data: function () {
        return {
            options: options[localStorage.getItem("theme") || "light"],
            loadingCounties: true,
            countiesError: false,
            countyList: [],
            countySelected: 0,
            countyError: false,
            loadingCounty: true,
            currentCountyData: [],
            countyNameList: [],
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
         * Gets a list of the counties for which data can be fetched.
         */
        getCountiesList: async function () {
            try {
                this.countiesError = false;
                this.loadingCounties = true;
                const response = await fetch(
                    "https://disease.sh/v3/covid-19/historical/usacounties"
                );
                const data = await response.json();
                const countyList = data.map((element, index) => {
                    return {
                        name: element,
                        code: index,
                    };
                });

                this.countyList = [...countyList];
                this.loadingCounties = false;
            } catch (error) {
                console.log(error);
                this.loadingCounties = false;
                this.countiesError = true;
            }
        },
        /**
         * @vuese
         * Get the data for the selected county. Default is alphabetically.
         */
        getCountyData: async function () {
            try {
                this.countyError = false;
                this.loadingCounty = true;
                const response = await fetch(
                    `https://disease.sh/v3/covid-19/historical/usacounties/${
                        this.countyList[this.countySelected].name
                    }?lastdays=365`
                );
                const data = await response.json();
                this.currentCountyData = [...data];

                const countyNameList = data.map((element, index) => {
                    return {
                        name: element.county,
                        code: index,
                    };
                });

                this.countyNameList = [...countyNameList];

                this.loadingCounty = false;
            } catch (error) {
                console.log(error);
                this.loadingCounty = true;
                this.countyError = true;
            }
        },
        /**
         * @vuese
         * Change the state for getting new counties/cities.
         */
        countyChange: function (county) {
            this.countySelected = county[1];
            this.getCountyData();
        },
        /**
         * @vuese
         * Get the selected county.
         */
        countyNameChange: function (county) {
            this.countySelected = county[1];
        },
    },
    async mounted() {
        await this.getCountiesList();
        await this.getCountyData();
    },
};
</script>

<style>
.city {
    width: 100%;
    height: 100%;
}

.select--margin--top {
    margin-top: 20px;
}
</style>