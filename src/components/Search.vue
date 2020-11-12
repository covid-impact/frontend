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
}

.searchbar--input:focus {
    background: var(--text-menu);
    color: var(--background);
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
        background: var(--text-menu);
        color: var(--background);
    }

    .searchbar--btn:hover {
        background: var(--text-menu);
        color: var(--background);
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
