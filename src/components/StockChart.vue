<template>
    <section class="chart">
        <h2>{{ title }}</h2>
        <highcharts :constructor-type="'stockChart'" :options="data" />
    </section>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";

stockInit(Highcharts);
// @group Components
/**
 * To show the stock data or better visualised time series.
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
</style>
