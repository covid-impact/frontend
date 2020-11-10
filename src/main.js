import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";
import mapInit from "highcharts/modules/map";
import addWorldMap from "@/assets/worldmap";

stockInit(Highcharts);
mapInit(Highcharts);
addWorldMap(Highcharts);

Vue.use(HighchartsVue);
Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
