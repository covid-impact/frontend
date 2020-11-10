import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Finance from "./views/Finance.vue";

import CovidWorld from "./views/CovidWorld.vue";
import CovidCity from "./views/CovidCity.vue";

import FinanceWorld from "./views/FinanceWorld.vue";
import FinanceCity from "./views/FinanceCity.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/",
            name: "covidHome",
            component: Home,
        },
        {
            path: "/world",
            name: "covidWorld",
            component: CovidWorld,
        },
        {
            path: "/city",
            name: "covidCity",
            component: CovidCity,
        },
        {
            path: "/finance",
            name: "finance",
            component: Finance,
        },
        {
            path: "/",
            name: "financeHome",
            component: Finance,
        },
        {
            path: "/finance/world",
            name: "financeWorld",
            component: FinanceWorld,
        },
        {
            path: "/finance/city",
            name: "financeCity",
            component: FinanceCity,
        },
    ],
});
