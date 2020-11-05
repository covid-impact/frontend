<template>
    <div class="app">

        <h1 class="heading">Comparing USA covid cases to CCL</h1>
        <!--Search/-->
        <input type="text" v-model="searchInput" placeholder="Enter location/ company name" />
        <button v-on:click="submitSearchCompany()">Search company</button>
        <button v-on:click="submitSearchLocation()">Search location</button>
        <Chart title="COVID Data" :data="dataCovid" :options="options" />
        <Chart title="Stock Data" :data="dataStock" :options="options" />
    </div>
</template>

<script>
import Chart from "./components/Chart";
//import Search from "./components/Search";
//import CovidData from "./components/CovidData";
//import StockData from "./components/StockData";

export default {
    name: "App",
    components: {
        Chart,
        //Search,
    },
    data: function () {
        return {
            dataCovid: {},
            dataStock: {},
            searchInput: '',
            dates:{},
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
        getCovidData: async function(location){
          console.log("searching for location "+ location);
          const response = await fetch(
              "https://disease.sh/v3/covid-19/historical/"+location+"?lastdays=365"
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
        getStockData: async function(stockName, dates){
          console.log("searching for stock "+ stockName);
          const responseFinance = await fetch(
              "https://sandbox.iexapis.com/stable/stock/"+stockName+"/chart/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b"
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
        getCountryFromCompany: async function(companyName){

          const responseFinance = await fetch(
              "https://sandbox.iexapis.com/stable/stock/"+companyName+"/company/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b"
          );
          const dataFinance = await responseFinance.json();
          console.log(companyName+" is located in "+dataFinance.country);
          return dataFinance.country;
        },
        submitSearchLocation: async function(){

          //covid

          this.getCovidData(this.searchInput)
          //return dataJSON;
        },
        submitSearchCompany: async function(){
          //finance
          var country = await this.getCountryFromCompany(this.searchInput);
          let dates = await this.getCovidData(country);
          this.getStockData(this.searchInput, dates);
        },
        getData: async function () {
            let dates = [];
            dates = await this.getCovidData('US');
            this.getStockData('CCL', dates);
            this.dates = dates;
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
