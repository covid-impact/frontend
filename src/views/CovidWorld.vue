<template>
    <section class="covid--world">
        <h1 class="main--heading">World's COVID-19 data at a glance</h1>
        <Select
            @newSelection="selectionChange"
            :data="select"
            placeholder="Select Type"
        />
        <h2 v-if="loading">Loading...</h2>
        <highcharts
            v-else
            :constructor-type="'mapChart'"
            :options="mapOptions"
            class="map"
        ></highcharts>
    </section>
</template>
<script>
import Select from "../components/Select";

export default {
    components: {
        Select,
    },
    data() {
        return {
            select: [
                { name: "Cases", color: "#101010" },
                { name: "Deaths", color: "rgb(244, 67, 54)" },
                { name: "Recovered", color: "rgb(118, 255, 3)" },
                { name: "Active", color: "rgb(255, 235, 59)" },
                { name: "Critical", color: "rgb(255, 23, 68)" },
                { name: "Tests", color: "#101010" },
            ],
            selection: {},
            selectIndex: 0,
            loading: false,
            error: false,
            series: [],
        };
    },
    computed: {
        mapOptions: function () {
            return {
                chart: {
                    map: "myMapName",
                    backgroundColor: "transparent",
                },
                title: {
                    text: this.selection.name,
                },
                subtitle: {
                    text:
                        'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World, Miller projection, medium resolution</a>',
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        alignTo: "spacingBox",
                    },
                },
                colorAxis: {
                    min: 0,
                    maxColor: this.selection.color || "#000",
                    minColor: "#fff",
                },
                series: this.series[this.selectIndex],
                color: this.selection.color,
            };
        },
    },
    methods: {
        getData: async function () {
            this.loading = true;

            try {
                const url = `https://disease.sh/v3/covid-19/countries`;
                const response = await fetch(url);
                const data = await response.json();

                let dataCOVID = [[], [], [], [], [], []];

                const template = {
                    name: "",
                    states: {
                        hover: {
                            color: "#dadada",
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        format: "{point.name}",
                    },
                    allAreas: false,
                };

                let all = [];

                data.forEach((element) => {
                    let country = "";
                    if (element.countryInfo.iso2 != null) {
                        country = element.countryInfo.iso2.toLowerCase();
                    }
                    dataCOVID[0].push([country, element.cases]);
                    dataCOVID[1].push([country, element.deaths]);
                    dataCOVID[2].push([country, element.active]);
                    dataCOVID[3].push([country, element.recovered]);
                    dataCOVID[4].push([country, element.critical]);
                    dataCOVID[5].push([country, element.tests]);
                });

                this.select.forEach((element, index) => {
                    all.push({
                        ...template,
                        name: element.name,
                        color: element.color,
                        states: {
                            hover: {
                                color: element.color,
                            },
                        },
                        data: dataCOVID[index],
                    });
                });

                this.series = all;
            } catch (error) {
                console.log(error);
                this.error = true;
                this.loading = false;
            }

            this.loading = false;
        },
        selectionChange: function (selection) {
            this.loading = true;
            this.selection = selection[0];
            this.selectIndex = selection[1];
            this.loading = false;
        },
    },
    mounted: function () {
        this.getData();
        this.loading = false;
    },
};
</script>
<style scoped>
.covid--world {
    width: 100%;
    height: 100%;
}
.map {
    height: 100%;
}

@media (max-width: 1199.98px) {
}

@media (max-width: 991.98px) {
}

@media (max-width: 767.98px) {
}

@media (max-width: 575.98px) {
    .map {
        height: auto;
    }
}
</style>