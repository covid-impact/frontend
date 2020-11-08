import {Line, mixins} from "vue-chartjs";
const {reactiveProp} = mixins;

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: ["options"],
    methods: {
        renderLineChart() {
            this.renderChart(this.chartData, this.options);
        },
    },
    mounted() {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        this.renderLineChart();
    },
    watch: {
        options: function() {
            this.renderLineChart();
        },
    },
};
