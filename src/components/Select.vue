<template>
    <section class="select">
        <div class="selected">
            <span>{{ selection.name }}</span>
            <transition name="menu--animation" mode="out-in">
                <svg
                    v-if="!showList"
                    class="select--toggle"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    key="down"
                    @click="toggleList"
                >
                    <title>Show</title>
                    <path
                        d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"
                    />
                </svg>

                <svg
                    v-if="showList"
                    class="select--toggle"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    key="up"
                    @click="toggleList"
                >
                    <title>Caret Up</title>
                    <path
                        d="M414 321.94L274.22 158.82a24 24 0 00-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"
                    />
                </svg>
            </transition>
        </div>
        <transition name="slide-fade">
            <ul v-if="showList" class="list">
                <li
                    class="select--list--item"
                    @click="selectCountry(index)"
                    v-for="(country, index) in countries"
                    :key="country.code"
                >
                    {{ country.name }}
                </li>
            </ul>
        </transition>
    </section>
</template>

<script>
import countries from "@/assets/countries";
// @group Components
/**
 * Select component for user to select a country
 */
export default {
    data: function () {
        return {
            countries,
            selection: {
                name: "Select some other country",
            },
            showList: false,
        };
    },
    methods: {
        /**
         * @vuese
         * Selects the country the user clicked on.Fires the `countryChange` event .
         * @arg index of the country that is clicked by the user.
         */
        selectCountry: function (index) {
            this.selection = this.countries[index];
            /**
             * Fired when user selects a country
             * @arg an object with name and ISO codes for the country
             */
            this.$emit("conutryChange", this.selection);
            this.showList = false;
        },
        /**
         * @vuese
         * Toggles the lists of options that the user can select.
         */
        toggleList: function () {
            this.showList = !this.showList;
        },
    },
};
</script>

<style>
.menu--animation-enter-active,
.menu--animation-leave-active {
    transition: opacity 0.1s, transform 0.1s;
    transform: rotate(0);
}
.menu--animation-enter, .menu--animation-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: rotate(180deg);
}

.select {
    border-radius: 10px;
    position: relative;
}

.selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20vw;
    padding: 10px;
    height: 100%;
    border: 2px solid var(--text);
    border-radius: 10px;
    z-index: 2;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
}

.select--toggle {
    height: 20px;
    width: 20px;
    fill: var(--text);
    cursor: pointer;
}

.list {
    list-style-type: none;
    position: absolute;
    overflow: auto;
    height: 30vh;
    background: var(--background);
    padding: 10px;
    border-radius: 10px;
    border: 2px solid var(--text);
    margin-top: 10px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
    z-index: 1;
}

.select--list--item {
    font-size: 1.2em;
    cursor: pointer;
    padding: 5px;
    border-bottom: 1px solid var(--text);
}

@media (max-width: 1199.98px) {
}

@media (max-width: 991.98px) {
    .select {
        margin-top: 10px;
        width: 50%;
    }

    .selected {
        width: 100%;
    }
}

@media (max-width: 767.98px) {
}

@media (max-width: 575.98px) {
    .select {
        margin-top: 10px;
        width: 100%;
    }

    .selected {
        width: 100%;
    }
}
</style>