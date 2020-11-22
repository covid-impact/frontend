<template>
  <div class="app">
    <section class="logo">
      <router-link
          :to="{ name: 'home' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
            >
        <a
            :class="[isActive && '', isExactActive && '', 'logo--link']"
            :href="href"
            @click="navigate"
                >
          <h1>CF</h1>
        </a
                >
      </router-link>
    </section>
    <Menu @themeChange="themeChange" />
    <section class="search-bar">
      <Search
          @countryChange="countryChange"
          @stockChange="stockChange"
            ></Search>
    </section>
    <section class="main">
      <transition name="slide-down" mode="out-in">
        <router-view
            :theme="theme"
            :country="country"
            :stockName="stockName"
            :key="$route.path"
                />
      </transition>
    </section>
  </div>
</template>

<script>
import Menu from "./components/Menu";
import Search from "./components/Search";

// @vuese
//@group Home
/**
 * The COVID-19 app resides here
 */
export default {
    name: "App",
    components: {
        Menu,
        Search,
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
        countryChange: function (conutry) {
            this.country = conutry;
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
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 100px 1fr;
    grid-template-areas:
        "logo search"
        "menu main";
}

.logo {
    font-size: 3em;
    grid-area: logo;
    padding: 20px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: var(--background-secondary);
}

.logo--link,
.logo--link:active,
.logo--link:visited,
.logo--link:hover {
    color: var(--text-menu);
    text-decoration: none;
}

.search-bar {
    width: 100%;
    grid-area: search;
    display: flex;
    align-items: center;
    padding: 10px;
}

.main {
    grid-area: main;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
}

@media (max-width: 1659.98px) {
    .app {
        grid-template-columns: 15% 85%;
        grid-template-rows: 100px 1fr;
    }
}

@media (max-width: 1199.98px) {
}

@media (max-width: 991.98px) {
    .app {
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-template-rows: max-content max-content 1fr;
        grid-template-areas:
            "logo menu"
            "search search"
            "main main";
    }

    .logo {
        font-size: 2.3em;
    }
}

@media (max-width: 767.98px) {
}

@media (max-width: 575.98px) {
    .app {
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-template-rows: max-content max-content 1fr;
        grid-template-areas:
            "logo menu"
            "search search"
            "main main";
    }

    .logo {
        font-size: 2.3em;
        padding: 10px 5px;
    }
}
</style>
