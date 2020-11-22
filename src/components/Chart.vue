<template>
    <section class="chart">
        <h2>{{ title }}</h2>
        <highcharts :options="data" />
    </section>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";

exportingInit(Highcharts);
// @group Components
/**
 * Makes a chart using Chart.js
 */
export default {
    components: {
        // LineChart,
        highcharts: Chart,
    },
    props: {
        // Title of the chart
        title: { type: String, required: false },
        // Data the chart graphs
        data: { type: Object, required: true },
    },
};
</script>

<style>
.chart {
    margin-top: 20px;
    width: 100%;
}
</style>