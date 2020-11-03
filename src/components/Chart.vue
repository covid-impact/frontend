<template>
    <section class="chart">
        <h2>{{ title }}</h2>
        <line-chart :chart-data="data" :options="options" />
    </section>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
    components: {
        LineChart,
    },
    props: {
        title: String,
        data: Object,
        options: Object,
    },
};
</script>

<style>
.chart {
    width: 100%;
}
</style>