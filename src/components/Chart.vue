<template>
    <section class="chart">
        <h2>{{ title }}</h2>
        <line-chart
            :style="{ height: '100%' }"
            :chart-data="data"
            :options="options"
        />
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
    margin: 5px 0;
    width: 100%;
}
</style>