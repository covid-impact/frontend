<template>
    <div class="searchbar">
        <input
            type="text"
            v-model="searchInput"
            :placeholder="placeholder"
            class="searchbar--input"
            aria-label="Search location or company name"
            @input="debounce(inputChange(), 250)"
            @keyup.enter="pressSearchButton"
        />

        <button class="searchbar--btn" v-on:click="pressSearchButton">
            Search
        </button>
        <ul v-if="showSuggestion" class="search--suggestion--list">
            <li v-if="loading"><loading /></li>
            <li
                class="select--list--item"
                v-for="(val, index) in topFiveSuggestions"
                :key="val.code"
                @click="searchClick(index)"
            >
                {{ li(val) }}
            </li>
        </ul>
    </div>
</template>

<script>
import countries from "@/assets/countries";
import Loading from "../components/Loading";
import db from "../main";
// @group Components
/**
 * Search bar for location and stock
 */
export default {
    name: "Search",
    components: {
        Loading,
    },

    data: function () {
        return {
            searchInput: "",
            countries,
            suggestionItems: [],
            showSuggestion: false,
            placeholder: "Search location or company name",
            loading: false,
        };
    },
    computed: {
        topFiveSuggestions: function () {
            return this.suggestionItems.slice(0, 5);
        },
    },
    methods: {
        /**
         * @vuese
         * formatted data to displayed in the suggestions list
         */
        li: function (val) {
            if (this.$route.name.includes("finance")) {
                return `${val.name} | ${val.region} | ${val.exchange}`;
            } else {
                return val.name;
            }
        },
        /**
         * @vuese
         * to get the suggestions when user enters new characters.
         */
        inputChange: async function () {
            this.showSuggestion = true;
            this.suggestionItems = [];
            if (this.searchInput === "") {
                this.showSuggestion = false;
                this.suggestionItems = [
                    {
                        name: "Nothing found",
                        code: "404",
                    },
                ];
                //this.suggestionItems = countries.filter(el =>el.name.contains(text));
            } else if (this.$route.name.includes("finance")) {
                this.loading = true;
                let stockRef = db.collection("stock");
                let allCities = await stockRef
                    .where(
                        "keywordsBoth",
                        "array-contains",
                        this.searchInput.toLowerCase()
                    )
                    .limit(5)
                    .get();
                for (const doc of allCities.docs) {
                    doc.data().keywordsBoth = [];
                    doc.data().keywordsSymbol = [];
                    doc.data().keywordsName = [];
                    this.suggestionItems.push(doc.data());
                }
                this.loading = false;
            } else {
                this.suggestionItems = countries.filter((el) =>
                    el.name
                        .toLowerCase()
                        .includes(this.searchInput.toLowerCase())
                );
                if (this.suggestionItems.length === 0) {
                    this.suggestionItems = [
                        {
                            name: "Nothing found",
                            code: "404",
                        },
                    ];
                }
            }
        },
        /**
         * @vuese
         * sets the stock data from the suggestions
         */
        searchStock(index) {
            delete this.topFiveSuggestions[index].keywordsSymbol;
            delete this.topFiveSuggestions[index].keywordsBoth;
            delete this.topFiveSuggestions[index].keywordsName;
            if (this.searchInput != "") {
                this.setlocalStorageValue(
                    "stockSymbol",
                    JSON.stringify(this.topFiveSuggestions[index])
                );
                /**
                 * Fired when user selects a stock
                 * @arg an object containig stock info
                 */
                this.$emit("stockChange", this.topFiveSuggestions[index]);
                this.showSuggestion = false;
                this.searchInput = "";
            }
        },
        /**
         * @vuese
         * sets the country data from the suggestions
         */
        searchLocation(index) {
            this.setlocalStorageValue(
                "country",
                JSON.stringify(this.topFiveSuggestions[index])
            );
            /**
             * Fired when user selects a country
             * @arg an object with name and ISO codes for the country
             */
            this.$emit("countryChange", this.topFiveSuggestions[index]);
            this.showSuggestion = false;
            this.searchInput = "";
        },
        /**
         * @vuese
         * to store data to local storage
         */
        setlocalStorageValue(key, value) {
            localStorage.setItem(key, value);
        },
        /**
         * @vuese
         * select top suggestions on button click
         */
        pressSearchButton() {
            if (this.$route.name.includes("finance")) {
                this.searchStock(0);
            } else {
                this.searchLocation(0);
            }
        },
        /**
         * @vuese
         * select suggestions that user clicked
         */
        searchClick(index) {
            if (this.$route.name.includes("finance")) {
                this.searchStock(index);
            } else {
                console.log("object");
                this.searchLocation(index);
            }
        },
        /**
         * @vuese
         * when searching wait for user input change for 250ms
         */
        debounce(func, wait, immediate) {
            var timeout;
            return function () {
                var context = this,
                    args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
    },
    mounted() {
        if (this.$route.name !== null && this.$route.name.includes("finance")) {
            this.placeholder = "Search companies for stock";
        } else {
            this.placeholder = "Search countries";
        }
    },
    watch: {
        $route: function () {
            this.searchInput = "";
            (this.showSuggestion = false), (this.suggestionItems = []);
            if (this.$route.name.includes("finance")) {
                this.placeholder = "Search companies for stock";
            } else {
                this.placeholder = "Search countries";
            }
        },
    },
};
</script>

<style>
.searchbar {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
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

.signout--btn {
    font-size: 1.2em;
    position: relative;
    left: 1480px;
    top: 100%;
    width: 100%;
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

.search--suggestion--list {
    list-style-type: none;
    position: absolute;
    top: 100%;
    width: 100%;
    overflow: auto;
    height: max-content;
    max-height: 30vh;
    background: var(--background);
    padding: 10px;
    border-radius: 10px;
    border: 2px solid var(--text);
    margin-top: 10px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
    z-index: 1;
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

    .signout--btn:hover {
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
