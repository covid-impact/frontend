<template>
    <div class="basic">
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
                    <img src="../assets/CF.png" alt="Covid Finance Logo" />
                </a>
            </router-link>
        </section>
        <Menu @themeChange="themeChange" />
        <section class="main">
            <transition name="slide-down" mode="out-in">
                <slot
                    @countryChange="countryChange"
                    @stockChange="stockChange"
                />
            </transition>
        </section>
    </div>
</template>

<script>
import Menu from "../components/Menu";

// @group Layouts
/**
 * Basic layout without searchbar
 */
export default {
    components: {
        Menu,
    },
    methods: {
        /**
         * @vuese
         * for switching themes
         * @arg theme to switch to
         */
        themeChange: function (theme) {
            /**
             * @vuese
             * fired when switching themes
             * @arg theme to switch to
             */
            this.$emit("themeChange", localStorage.getItem("theme"));
        },
        /**
         * @vuese
         * for switching countries
         * @arg country to switch to
         */
        countryChange: function (conutry) {
            /**
             * @vuese
             * fired when switching countries
             * @arg country to switch to
             */
            this.$emit("countryChange", conutry);
        },
        /**
         * @vuese
         * for switching stock companies
         * @arg stock company to switch to
         */
        stockChange: function (stockName) {
            /**
             * @vuese
             * fired when switching stock company
             * @arg stock company to switch to
             */
            this.$emit("stockChange", stockName);
        },
    },
};
</script>

<style>
.basic {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 100px 1fr;
    grid-template-areas:
        "logo main"
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
    .basic {
        grid-template-columns: 15% 85%;
        grid-template-rows: 100px 1fr;
    }
}

@media (max-width: 1199.98px) {
}

@media (max-width: 991.98px) {
    .basic {
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-template-rows: max-content 1fr;
        grid-template-areas:
            "logo menu"
            "main main";
    }

    .logo {
        font-size: 2.3em;
    }
}

@media (max-width: 767.98px) {
}

@media (max-width: 575.98px) {
    .basic {
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-template-rows: max-content 1fr;
        grid-template-areas:
            "logo menu"
            "main main";
    }

    .logo {
        font-size: 2.3em;
        padding: 10px 5px;
    }
}
</style>