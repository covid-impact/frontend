<template>
    <div>
        <input
            type="text"
            v-model="searchInput"
            placeholder="Enter location / company name"
        />
        <button v-on:click="pressSearchButton">Search</button>
    </div>
</template>

<script>
export default {
    name: "Search",
    data: function () {
        return {
            searchInput: "",
        };
    },
    methods: {
        pressSearchButton: function () {
            this.$emit("searchWithInput", this.searchInput);
        },
    },
};
</script>
