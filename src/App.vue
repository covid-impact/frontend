<template>
    <div class="app">
        <component
            @countryChange="countryChange"
            @stockChange="stockChange"
            :is="layout"
        >
            <router-view
                :theme="theme"
                :country="country"
                :stockName="stockName"
                :key="$route.path"
            />
        </component>
    </div>
</template>

<script>
import Default from "./layouts/Default";
import Basic from "./layouts/Basic";

const defaultLayout = "default";

// @vuese
//@group Home
/**
 * The COVID-19 app resides here
 */
export default {
    name: "App",
    components: {
        "default-layout": Default,
        "basic-layout": Basic,
    },
    computed: {
        layout: function () {
            return (this.$route.meta.layout || defaultLayout) + "-layout";
        },
    },
    data: function () {
        return {
            theme: "light",
            country: JSON.parse(localStorage.getItem("country")) || {
                code: "CA",
                code3: "CAN",
                name: "Canada",
                number: "124",
            },
            stockName: JSON.parse(localStorage.getItem("stockSymbol")) || {
                isEnabled: true,
                name: "Apple Inc.",
                cik: "320193",
                type: "cs",
                symbol: "AAPL",
                region: "US",
                currency: "USD",
                exchange: "NAS",
                queryableSymbol: "aapl",
                iexId: "IEX_4D48333344362D52",
                figi: "BBG000B9XRY4",
                date: "2020-11-18",
                queryable: "apple inc.",
            },
        };
    },
    methods: {
        /**
         * @vuese
         * for switching themes
         * @arg theme to switch to
         */
        themeChange: function (theme) {
            this.theme = theme;
        },
        countryChange: function (country) {
            console.log(country);
            this.country = country;
        },
        stockChange: function (stockName) {
            this.stockName = stockName;
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
    --background: #101010;
    --background-secondary: #212121;
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
    --background-secondary: #e3f2fd;
    --background-card: #fff;
    --text: #000;
    --text-menu: #000;
    --deaths: rgb(244, 67, 54);
    --active: rgb(255, 233, 39);
    --recovered: rgb(62, 255, 3);
    --cases: #000;
    --critical: rgb(255, 23, 68);
}

@media (prefers-color-scheme: dark) {
    :root {
        --background: #101010;
        --background-secondary: #212121;
        --background-card: #000;
        --text: #fff;
        --text-menu: #fff;
        --deaths: rgb(244, 67, 54);
        --active: rgb(255, 235, 59);
        --recovered: rgb(118, 255, 3);
        --cases: #dadada;
        --critical: rgb(255, 23, 68);
    }
}

@media (prefers-color-scheme: light) {
    :root {
        --background: #fff;
        --background-secondary: #e3f2fd;
        --background-card: #fff;
        --text: #000;
        --text-menu: #000;
        --deaths: rgb(244, 67, 54);
        --active: rgb(255, 233, 39);
        --recovered: rgb(62, 255, 3);
        --cases: #000;
        --critical: rgb(255, 23, 68);
    }
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
}
</style>
