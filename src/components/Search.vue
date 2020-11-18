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
    display: flex;
    padding: 10px;
    align-items: center;
}

.searchbar--input {
    font-size: 1.2em;
    background: var(--background-card);
    border: 2px solid var(--text);
    padding: 10px;
    width: 100%;
    color: var(--text);
    border-radius: 10px;
    transition: 0.2s box-shadow, 0.2s transform;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
}

.searchbar--input:focus {
    box-shadow: none;
}

.searchbar--btn {
    font-size: 1.2em;
    padding: 10px;
    background: var(--background-card);
    border: 2px solid var(--text);
    border-radius: 10px;
    color: var(--text);
    margin-left: 10px;
    cursor: pointer;
    transition: 0.2s box-shadow, 0.2s transform;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
}

@media not all and (hover: none) {
    .searchbar--input:hover {
        box-shadow: none;
        transform: translateY(2px);
    }

    .searchbar--btn:hover {
        box-shadow: none;
        transform: translateY(2px);
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
