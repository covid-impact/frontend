<template>
    <div class="default">
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
                    <img src="../assets/CF.svg" alt="Covid Finance Logo" />
                </a>
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
                <slot />
            </transition>
        </section>
    </div>
</template>

<script>
import Search from "../components/Search";
import Menu from "../components/Menu";

export default {
    components: {
        Search,
        Menu,
    },
    methods: {
        /**
         * @vuese
         * for switching themes
         * @arg theme to switch to
         */
        themeChange: function (theme) {
            this.$emit("themeChange", localStorage.getItem("theme"));
        },
        countryChange: function (conutry) {
            console.log("here");
            this.$emit("countryChange", conutry);
        },
        stockChange: function (stockName) {
            this.$emit("stockChange", stockName);
        },
    },
};
</script>

<style>
.default {
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

.logo img {
    height: 50px;
    width: 50px;
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
    .default {
        grid-template-columns: 15% 85%;
        grid-template-rows: 100px 1fr;
    }
}

@media (max-width: 1199.98px) {
}

@media (max-width: 991.98px) {
    .default {
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
    .default {
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