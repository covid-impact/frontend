<template>
    <div class="app">
        <Menu />
        <section class="main">
            <router-view></router-view>
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
    --text: #fff;
    --deaths: rgb(244, 67, 54);
    --active: rgb(255, 235, 59);
    --recovered: rgb(118, 255, 3);
    --cases: #dadada;
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

.app {
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 15% 85%;
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
