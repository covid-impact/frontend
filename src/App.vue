<template>
    <div class="app">

        <h1 class="heading">Comparing USA covid cases to CCL</h1>
        <Search v-on:searchWithInput="search" ></Search>
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
            //data for creating the covid chart
            dataCovid: {},
            //data for creating the stock chart
            dataStock: {},
            //search input from user
            searchInput: '',
            //dates to be used in both charts
            dates:{},
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
        search(input){
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
        //function getting country from stock company using Stock API(iex)
        //input - companyName, String, name of stock
        //log company country as well
        //return - comapny country
        getCountryFromCompany: async function(companyName){

          const responseFinance = await fetch(
              "https://sandbox.iexapis.com/stable/stock/"+companyName+"/company/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b"
          );
          const dataFinance = await responseFinance.json();
          console.log(companyName+" is located in "+dataFinance.country);
          return dataFinance.country;
        },
        //function for searching location
        //trigger by button click
        //directly call geCovidData()
        //no return
        submitSearchLocation: async function(){
          //covid
          this.getCovidData(this.searchInput)
        },
        //function for searching stock company
        //trigger by button click
        //first get country of the stock
        //then call getCovidData() of the country
        //call getStockData() as well
        submitSearchCompany: async function(){
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
