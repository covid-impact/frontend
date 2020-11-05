<template>
    <div class="app">
        <Menu />
        <section class="main">
            <transition name="slide-fade" mode="out-in">
                <router-view :key="$route.path" />
            </transition>
        </section>
    </div>
</template>

<script>
import Menu from "./components/Menu";
export default {
    name: "App",
    components: {
        Menu,
    },
};
</script>

<style>
:root {
    --background: #101010;
    --background-secondary: #000;
    --text: #fff;
    --text-menu: #fff;
    --deaths: rgb(244, 67, 54);
    --active: rgb(255, 235, 59);
    --recovered: rgb(118, 255, 3);
    --cases: #dadada;
    --critical: rgb(255, 23, 68);
}

:root {
    --background: #fff;
    --background-secondary: rgb(220, 226, 255);
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
    transform: translateX(10px);
    opacity: 0;
}

.app {
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 1fr;
    grid-template-areas: "menu main";
}

.main {
    grid-area: main;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

@media (max-width: 575.98px) {
    .app {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 15% 85%;
        grid-template-areas:
            "menu"
            "main";
    }
}

@media (max-width: 767.98px) {
}

@media (max-width: 991.98px) {
}

@media (max-width: 1199.98px) {
}
</style>
