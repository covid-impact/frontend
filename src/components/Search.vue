<template>
    <div class="searchbar">
        <input
            type="text"
            v-model="searchInput"
            placeholder="Enter location / company name"
            class="searchbar--input"
            aria-label="Search location or company name"
        />
        <button class="searchbar--btn" v-on:click="pressSearchButton">
            Search
        </button>
    </div>
</template>

<script>
// @group Components
/**
 * Search bar for location and stock
 */
export default {
    name: "Search",
    data: function () {
        return {
            searchInput: "",
        };
    },

    methods: {
        /**
         * @vuese
         * Fires the `searchWithInput` event back to parent component
         */
        pressSearchButton: function () {
            /**
             * Fired when button is pressed
             * @arg the input from user
             */
            this.$emit("searchWithInput", this.searchInput);
        },
    },
};
</script>

<style>
.searchbar {
    width: 100%;
    font-size: 1.3em;
    display: flex;
    padding: 10px;
    align-items: center;
}

.searchbar--input {
    background: var(--background-card);
    border: 2px solid var(--text);
    padding: 10px;
    width: 100%;
    color: var(--text);
    border-radius: 10px;
    transition: 0.2s box-shadow;
}

.searchbar--input:focus {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
}

.searchbar--btn {
    padding: 10px;
    background: var(--background-card);
    border: 2px solid var(--text);
    border-radius: 10px;
    color: var(--text);
    margin-left: 10px;
    cursor: pointer;
}

@media not all and (hover: none) {
    .searchbar--input:hover {
        box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06);
    }

    .searchbar--btn:hover {
        box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06);
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
