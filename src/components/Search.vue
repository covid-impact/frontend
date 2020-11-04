<template>
    <section class="searchbar">
        <h5>Please enter company name here</h5>
        <input v-model="searchInput" />
        <button v-on:click="submitSearchFinance(searchInput)">Search company {{searchInput}}</button>
        <button v-on:click="submitSearchCompany(searchInput)">Search location {{searchInput}}</button>

    </section>

</template>

<script>

export default {
    name: 'Search',
    data: function (){
      return{
        searchInput:'company name',
      }
    },

    methods:{
      submitSearchCompany: async function(searchInput){
        console.log("search button pressed");
        console.log(searchInput);
        //covid
        const response = await fetch(
            "https://disease.sh/v3/covid-19/historical/"+searchInput+"?lastdays=365"
        );
        const dataJSON = await response.json();
        console.log(dataJSON);

      },
      submitSearchFinance: async function(searchInput){
        console.log("search button pressed");
        console.log(searchInput);

        //finance
        const responseFinance = await fetch(
            "https://sandbox.iexapis.com/stable/stock/"+searchInput+"/chart/1y?token=Tsk_78ffb2c08b1443a98a73f83fd7ae5e3b"
        );
        const dataFinance = await responseFinance.json();
        console.log(dataFinance);
      },
    },
};
</script>
