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
                    <h1>CF</h1></a
                >
            </router-link>
        </section>
        <Menu @themeChange="themeChange" />
        <section class="search-bar"></section>
        <section class="main">
            <transition name="slide-down" mode="out-in">
                <router-view :theme="theme" :key="$route.path" />
            </transition>
        </section>
    </div>
</template>

<script>
import Menu from "./components/Menu";
// @vuese
//@group Home
/**
 * The COVID-19 app resides here
 */
export default {
    name: "App",
    data: function () {
        return {
            theme: "light",
        };
    },
    components: {
        Menu,
    },
    methods: {
        themeChange: function (theme) {
            this.theme = theme;
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
    --background: #303030;
    --background-secondary: #101010;
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
    --background-secondary: rgb(220, 226, 255);
    --card-bg: #fff;
    --text: #000;
    --text-menu: #000;
    --deaths: rgb(244, 67, 54);
    --active: rgb(255, 235, 59);
    --recovered: rgb(118, 255, 3);
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
    width: 100vw;
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
    grid-area: search;
}

.main {
    grid-area: main;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
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
            "serach search"
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
            "serach search"
            "main main";
    }

    .logo {
        font-size: 2.3em;
    }
}
</style>
