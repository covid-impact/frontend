<template>
    <section class="chart">
        <h2>{{ title }}</h2>
        <line-chart
            :style="{ height: '100%', width: '100%' }"
            :chart-data="data"
            :options="options"
        />
    </section>
</template>

<script>
import LineChart from "./LineChart.js";
// @group Components
/**
 * Makes a chart using Chart.js
 */
export default {
    components: {
        LineChart,
    },
    props: {
        // Title of the chart
        title: { type: String, required: false },
        // Data the chart graphs
        data: { type: Object, required: true },
        // Options for the chart (like for changing colors, axes and legends etc.)
        options: { type: Object, required: true },
    },
};
</script>

<style>
.chart {
    margin: 5px 0;
    width: 100%;
}
</style>