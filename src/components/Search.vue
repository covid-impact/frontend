<template>
    <div class="searchbar">
        <vue-suggestion
            :items="suggestionItems"
            :setLabel="setLabel"
            type="text"
            v-model="searchInput"
            placeholder="Enter location / company name"
            class="searchbar--input"
            aria-label="Search location or company name"
            @changed="inputChange"
            @selected="suggestionItemSelected"
        />
        <button class="searchbar--btn" v-on:click="pressSearchButton">
            Search
        </button>
    </div>
</template>

<script>
import countries from "@/assets/countries";
import {VueSuggestion} from 'vue-suggestion'
// @group Components
/**
 * Search bar for location and stock
 */
export default {
    name: "Search",
    components: {
      VueSuggestion,
    },
    data: function () {
        return {
            searchInput: "",
            dataCovid: {},
            dataStock: {},
            dates: {},
            countries,
            suggestionItems: [],
            suggestionInput: {},
        };
    },

    methods: {
        setLabel(item) {
          this.searchInput = item.name;
        },
        suggestionItemSelected(item) {
          this.searchInput = item.name;
        },
        inputChange(text) {
          if(this.$route.name.includes("finance")){
            //this.suggestionItems = countries.filter(el =>el.name.contains(text));
          }else {
            this.suggestionItems = countries.filter(el => el.name.includes(text));
            console.log(this.suggestionItems);
          }

        },
        searchStock() {
          if (this.searchInput != ""){
            this.setlocalStorageValue("stockName", this.searchInput);
          }
        },
        searchCountry() {
            let input = this.searchInput.toLowerCase();
            let inputCountry = "";
            for (let i in this.countries) {
                if (
                    this.countries[i].code.toLowerCase().match(input) ||
                    this.countries[i].code3.toLowerCase().match(input) ||
                    this.countries[i].name.toLowerCase().match(input) ||
                    this.countries[i].number.toLowerCase().match(input)
                ) {
                    inputCountry = this.countries[i];
                }
            }
            if (inputCountry == ""){
              console.log("country not found");
              return;
            }
            this.setlocalStorageValue("country", inputCountry);
        },
        setlocalStorageValue(key, value) {
          localStorage.setItem(key, value);
        },

        pressSearchButton() {
            if(this.$route.name.includes("finance")){
              this.searchStock();
            } else {
              this.searchCountry();
            }
        },



    },
};
</script>

<style>
.searchbar {
    width: 100%;
    font-size: 1.3em;
    display: flex;
    padding: 10px;
    align-items: center;
}

.searchbar--input {
    background: var(--background-card);
    border: 2px solid var(--text);
    padding: 10px;
    width: 100%;
    color: var(--text);
    border-radius: 10px;
}

.searchbar--input:focus {
    background: var(--text-menu);
    color: var(--background);
}

.searchbar--btn {
    padding: 10px;
    background: var(--background-card);
    border: 2px solid var(--text);
    border-radius: 10px;
    color: var(--text);
    margin-left: 10px;
    cursor: pointer;
}

@media not all and (hover: none) {
    .searchbar--input:hover {
        background: var(--text-menu);
        color: var(--background);
    }

    .searchbar--btn:hover {
        background: var(--text-menu);
        color: var(--background);
    }
}

@media (max-width: 1199.98px) {
}

@media (max-width: 991.98px) {
    .searchbar--input {
        width: 100%;
        margin-right: 10px;
    }

    .searchbar--btn {
        margin-left: auto;
        width: auto;
    }
}

@media (max-width: 767.98px) {
}

@media (max-width: 575.98px) {
    .searchbar--input {
        width: 100%;
        margin-right: 10px;
    }

    .searchbar--btn {
        margin-left: auto;
        width: auto;
    }
}
</style>
